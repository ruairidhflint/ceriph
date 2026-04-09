export interface CipherDefinition {
  id: string;
  name: string;
  description: string;
  needsKey: boolean;
  keyLabel?: string;
  keyPlaceholder?: string;
  keyValidator?: (key: string) => string | null;
  messageValidator?: (message: string) => string | null;
  encode: (message: string, key: string) => string;
  decode: (message: string, key: string) => string;
}
