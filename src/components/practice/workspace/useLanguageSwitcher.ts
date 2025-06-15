
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
 * - Does NOT save current data before switching (data is lost)
 */
export function useLanguageSwitcher() {
  const { state, dispatch } = usePractice();

  /**
   * Change the language of any file (active or not). Will:
   *   1. Rename extension if needed
   *   2. Replace current content with new language template (data is lost)
   *   3. Update file language/content in all projects
   *   4. Guarantee sidebar, tabs, and editor are synced
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

    // Create the updated file - current data is lost, replaced with template
    const updatedFile = {
      ...foundFile,
      name: newName,
      language: newLanguage,
      content: newContent,
      isUnsaved: false, // Start fresh, not unsaved yet
    };

    // Update the projects array with the modified file
    const updatedProjects = state.projects.map(project => {
      if (project.id === foundProject.id) {
        return {
          ...project,
          files: project.files.map(file => 
            file.id === fileId ? updatedFile : file
          )
        };
      }
      return project;
    });

    // Dispatch the updated projects
    dispatch({
      type: 'UPDATE_PROJECTS',
      payload: { projects: updatedProjects }
    });

    // Update active project if it's the one being modified
    if (state.activeProject?.id === foundProject.id) {
      const updatedActiveProject = updatedProjects.find(p => p.id === foundProject.id);
      dispatch({
        type: 'SET_ACTIVE_PROJECT',
        payload: { project: updatedActiveProject || null }
      });
    }

    // If this is the currently active file, update it too
    if (state.activeFile?.id === fileId) {
      dispatch({
        type: 'SET_ACTIVE_FILE',
        payload: { file: updatedFile }
      });
    }

    console.log('[LanguageSwitcher] Language switched - data lost, new template loaded:', updatedFile.name, 'to language:', newLanguage);
  }

  return { changeFileLanguage };
}
