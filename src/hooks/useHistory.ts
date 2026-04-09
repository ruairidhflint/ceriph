import { useState, useCallback } from "react";

export interface HistoryEntry {
  id: string;
  timestamp: number;
  cipherId: string;
  cipherName: string;
  type: "encode" | "decode";
  keyHint: string;
  output: string;
}

const STORAGE_KEY = "ceriph-history";
const MAX_ENTRIES = 10;

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function makeKeyHint(key: string): string {
  if (!key) return "";
  if (key.length <= 2) return key[0] + "...";
  return key[0] + "..." + key[key.length - 1];
}

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>(loadHistory);

  const addEntry = useCallback(
    (params: {
      cipherId: string;
      cipherName: string;
      type: "encode" | "decode";
      key: string;
      output: string;
    }) => {
      const entry: HistoryEntry = {
        id: Date.now().toString(36),
        timestamp: Date.now(),
        cipherId: params.cipherId,
        cipherName: params.cipherName,
        type: params.type,
        keyHint: makeKeyHint(params.key),
        output:
          params.output.length > 50
            ? params.output.slice(0, 50) + "..."
            : params.output,
      };

      setEntries((prev) => {
        const next = [entry, ...prev].slice(0, MAX_ENTRIES);
        saveHistory(next);
        return next;
      });
    },
    []
  );

  const clearHistory = useCallback(() => {
    setEntries([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { entries, addEntry, clearHistory };
}
