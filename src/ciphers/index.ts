import { CipherDefinition } from "./types";
import { keywordCipher } from "./keyword";
import { caesarCipher } from "./caesar";
import { rot13Cipher } from "./rot13";
import { atbashCipher } from "./atbash";
import { vigenereCipher } from "./vigenere";

export const ciphers: CipherDefinition[] = [
  keywordCipher,
  caesarCipher,
  rot13Cipher,
  atbashCipher,
  vigenereCipher,
];

export const getCipher = (id: string): CipherDefinition =>
  ciphers.find((c) => c.id === id) ?? keywordCipher;

export type { CipherDefinition } from "./types";
