import { stripSpecialChars } from "./sanitize";

const alphabet = "abcdefghijklmnopqrstuvwxyz-";

function buildCipherAlphabet(keyword: string) {
  const cleaned = stripSpecialChars(keyword.toLowerCase())
    .split("")
    .filter((item, index, array) => array.indexOf(item) === index)
    .join("");

  let remaining = alphabet;
  cleaned.split("").forEach((char) => {
    remaining = remaining.replace(char, "");
  });

  return cleaned + remaining;
}

export function encode(message: string, keyword: string) {
  const cipher = buildCipherAlphabet(keyword);

  const indices = message
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[.,/#!$%?^&*;:{}=_`~()]/g, "")
    .split("")
    .map((letter) => alphabet.indexOf(letter));

  return indices
    .map((num) => cipher[num])
    .join("")
    .replace(/-/g, " ");
}

export function decode(codedMessage: string, keyword: string) {
  const cipher = buildCipherAlphabet(keyword);

  const indices = codedMessage
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[.,/#!$%?^&*;:{}=_`~()]/g, "")
    .split("")
    .map((letter) => cipher.indexOf(letter));

  return indices
    .map((num) => alphabet[num])
    .join("")
    .replace(/-/g, " ");
}
