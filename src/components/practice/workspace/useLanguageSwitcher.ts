
import { getLanguageTemplate } from "@/services/compilerService";
import { LANG_TO_EXT } from "./languageMaps";
import { usePractice } from "@/contexts/PracticeContext";

/**
 * Hook to provide language-switching logic by creating new files.
 * When user switches language, creates a new file with "untitled" name
 * and the appropriate extension, then sets it as active.
 */
export function useLanguageSwitcher() {
  const { state, dispatch } = usePractice();

  /**
   * Change the language by creating a new file with the selected language.
   * Creates files named "untitled", "untitled2", etc. to avoid conflicts.
   */
  function changeFileLanguage(currentFileId: string, newLanguage: string) {
    if (!state.activeProject) return;

    const newExt = LANG_TO_EXT[newLanguage] || "";
    const newContent = getLanguageTemplate(newLanguage);

    // Generate unique filename
    let fileName = `untitled${newExt ? `.${newExt}` : ""}`;
    let counter = 2;
    
    while (state.activeProject.files.some(f => f.name.toLowerCase() === fileName.toLowerCase())) {
      fileName = `untitled${counter}${newExt ? `.${newExt}` : ""}`;
      counter++;
    }

    // Create new file
    dispatch({
      type: 'CREATE_FILE',
      payload: {
        projectId: state.activeProject.id,
        name: fileName,
        language: newLanguage
      }
    });

    console.log('[LanguageSwitcher] Created new file:', fileName, 'with language:', newLanguage);
  }

  return { changeFileLanguage };
}
