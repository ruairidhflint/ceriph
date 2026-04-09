import { CipherDefinition } from "./types";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function vigenereProcess(text: string, key: string, direction: 1 | -1) {
  const cleanKey = key.toLowerCase().replace(/[^a-z]/g, "");
  let keyIndex = 0;

  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      const idx = LETTERS.indexOf(char);
      if (idx === -1) return char;
      const shift = LETTERS.indexOf(cleanKey[keyIndex % cleanKey.length]);
      keyIndex++;
      return LETTERS[(idx + direction * shift + 26) % 26];
    })
    .join("");
}

export const vigenereCipher: CipherDefinition = {
  id: "vigenere",
  name: "Vigenère",
  description:
    "A polyalphabetic cipher that uses a keyword to shift each letter by a different amount. For centuries it was considered unbreakable and was known as 'le chiffre indéchiffrable'.",
  needsKey: true,
  keyLabel: "Key phrase",
  keyPlaceholder: "Key phrase",
  keyValidator: (key) => {
    const cleaned = key.replace(/[^a-zA-Z]/g, "");
    if (cleaned.length < 2 || cleaned.length > 20)
      return "Key phrase must be 2-20 letters";
    if (!/^[a-zA-Z]+$/.test(key)) return "Key phrase must contain only letters";
    return null;
  },
  encode: (message, key) => vigenereProcess(message, key, 1),
  decode: (message, key) => vigenereProcess(message, key, -1),
};
