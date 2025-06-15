
import { getLanguageTemplate } from "@/services/compilerService";
import { LANG_TO_EXT } from "./languageMaps";
import { usePractice } from "@/contexts/PracticeContext";

/**
 * Hook to provide reliable code language-switching logic
 * for an active file in any project. Always updates filename,
 * language, and content in ALL projects (not just activeProject).
 * 
 * - Looks up file by unique file.id
 * - Renames with new extension if needed
 * - Sets language and content to template
 */
export function useLanguageSwitcher() {
  const { state, dispatch } = usePractice();

  /**
   * Change the language of any file (active or not). Will:
   *   1. Rename extension if needed
   *   2. Update file language/content in all projects
   *   3. Guarantee sidebar, tabs, and editor are synced
   */
  function changeFileLanguage(fileId: string, newLanguage: string) {
    // Find the file in all projects (not just active)
    let foundProject = null;
    let foundFile = null;
    for (const project of state.projects) {
      const file = project.files.find(f => f.id === fileId);
      if (file) {
        foundProject = project;
        foundFile = file;
        break;
      }
    }
    if (!foundProject || !foundFile) return;

    const currentName = foundFile.name;
    const parts = currentName.split(".");
    const baseName = parts.length > 1 ? parts.slice(0, -1).join(".") : currentName;
    const newExt = LANG_TO_EXT[newLanguage] || "";
    const newName = baseName + (newExt ? `.${newExt}` : "");
    const newContent = getLanguageTemplate(newLanguage);

    // Only rename if extension is changing
    if (currentName !== newName) {
      dispatch({
        type: "RENAME_FILE",
        payload: {
          projectId: foundProject.id,
          fileId: foundFile.id,
          name: newName,
        },
      });
    }

    // No matter what, set activeFile (if open) and update content/language
    setTimeout(() => {
      // Find the file again (could've been renamed)
      const updatedProject = state.projects.find(p => p.id === foundProject.id) || foundProject;
      const updatedFile =
        updatedProject.files.find(f => f.id === foundFile.id) ||
        updatedProject.files.find(
          f => f.name === newName && f.language === newLanguage
        );

      if (updatedFile) {
        dispatch({
          type: "SET_ACTIVE_FILE",
          payload: {
            file: {
              ...updatedFile,
              name: newName,
              language: newLanguage,
              content: newContent,
              isUnsaved: true,
            },
          },
        });
        dispatch({
          type: "UPDATE_FILE_CONTENT",
          payload: { content: newContent },
        });
      }
    }, 0);
  }

  return { changeFileLanguage };
}
