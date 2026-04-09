import { CipherDefinition } from "./types";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function rot13(text: string) {
  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      const idx = LETTERS.indexOf(char);
      if (idx === -1) return char;
      return LETTERS[(idx + 13) % 26];
    })
    .join("");
}

export const rot13Cipher: CipherDefinition = {
  id: "rot13",
  name: "ROT13",
  description:
    "A special case of the Caesar cipher with a fixed shift of 13. Since 13 is half the alphabet, encoding and decoding are the same operation — apply it twice and you get the original text back.",
  needsKey: false,
  encode: (message) => rot13(message),
  decode: (message) => rot13(message),
};
