import { useEffect } from "react";

type Shortcuts = {
  onEncode?: () => void;
  onDecode?: () => void;
  onCopy?: () => void;
  onBack?: () => void;
};

export function useKeyboardShortcuts(shortcuts: Shortcuts) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.shiftKey && e.key === "Enter" && shortcuts.onDecode) {
        e.preventDefault();
        shortcuts.onDecode();
      } else if (mod && e.key === "Enter" && shortcuts.onEncode) {
        e.preventDefault();
        shortcuts.onEncode();
      } else if (
        mod &&
        e.shiftKey &&
        (e.key === "c" || e.key === "C") &&
        shortcuts.onCopy
      ) {
        e.preventDefault();
        shortcuts.onCopy();
      } else if (e.key === "Escape" && shortcuts.onBack) {
        shortcuts.onBack();
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}
