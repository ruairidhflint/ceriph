import { CipherDefinition } from "./types";

const alphabet = "abcdefghijklmnopqrstuvwxyz-";

function buildCipherAlphabet(keyword: string) {
  const cleaned = keyword
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .filter((item, index, array) => array.indexOf(item) === index)
    .join("");

  let remaining = alphabet;
  cleaned.split("").forEach((char) => {
    remaining = remaining.replace(char, "");
  });

  return cleaned + remaining;
}

function prepareMessage(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z-]/g, "")
    .split("");
}

export const keywordCipher: CipherDefinition = {
  id: "keyword",
  name: "Keyword",
  description:
    "A substitution cipher that rearranges the alphabet using a secret keyword. Letters in the keyword come first, followed by the remaining alphabet letters in order.",
  needsKey: true,
  keyLabel: "Keyword",
  keyPlaceholder: "Keyword",
  keyValidator: (key) => {
    if (key.length < 3 || key.length > 12) return "Keyword must be 3-12 letters";
    if (!/^[a-zA-Z]+$/.test(key)) return "Keyword must contain only letters";
    return null;
  },
  encode: (message, keyword) => {
    const cipher = buildCipherAlphabet(keyword);
    return prepareMessage(message)
      .map((letter) => cipher[alphabet.indexOf(letter)])
      .join("")
      .replace(/-/g, " ");
  },
  decode: (message, keyword) => {
    const cipher = buildCipherAlphabet(keyword);
    return prepareMessage(message)
      .map((letter) => alphabet[cipher.indexOf(letter)])
      .join("")
      .replace(/-/g, " ");
  },
};
