import { CipherDefinition } from "./types";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function atbash(text: string) {
  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      const idx = LETTERS.indexOf(char);
      if (idx === -1) return char;
      return LETTERS[25 - idx];
    })
    .join("");
}

export const atbashCipher: CipherDefinition = {
  id: "atbash",
  name: "Atbash",
  description:
    "An ancient Hebrew cipher that reverses the alphabet — A becomes Z, B becomes Y, and so on. Like ROT13, encoding and decoding are the same operation.",
  needsKey: false,
  encode: (message) => atbash(message),
  decode: (message) => atbash(message),
};
