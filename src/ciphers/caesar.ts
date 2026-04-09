import { CipherDefinition } from "./types";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function shift(text: string, amount: number) {
  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      const idx = LETTERS.indexOf(char);
      if (idx === -1) return char;
      return LETTERS[(idx + amount + 26) % 26];
    })
    .join("");
}

export const caesarCipher: CipherDefinition = {
  id: "caesar",
  name: "Caesar",
  description:
    "One of the oldest known ciphers. Each letter is shifted by a fixed number of positions in the alphabet. Named after Julius Caesar, who reportedly used a shift of 3.",
  needsKey: true,
  keyLabel: "Shift (1-25)",
  keyPlaceholder: "Shift (1-25)",
  keyValidator: (key) => {
    const num = parseInt(key, 10);
    if (isNaN(num) || num < 1 || num > 25) return "Shift must be a number from 1-25";
    return null;
  },
  encode: (message, key) => shift(message, parseInt(key, 10)),
  decode: (message, key) => shift(message, -parseInt(key, 10)),
};
