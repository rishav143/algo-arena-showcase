
import { useEffect, RefObject } from "react";

export function useAutoResize(textareaRef: RefObject<HTMLTextAreaElement>, value: string) {
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [textareaRef, value]);
}
