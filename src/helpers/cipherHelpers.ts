const alphabet = "abcdefghijklmnopqrstuvwxyz-";

function cypherKeyword(word: string) {
  const keyword = word
    .toLowerCase()
    .replace(/[., /#!$%?!^&*;:{}=_-`~()]/g, "")
    .split("")
    .filter((item, index, array) => array.indexOf(item) === Number(index))
    .join("");

  let newString = alphabet;

  keyword.split("").forEach((char) => {
    newString = newString.replace(char, "");
  });

  return keyword + newString;
}

export function messageSubstitution(message: string, keyword: string) {
  const cypher = cypherKeyword(keyword);

  const message_input = message
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[.,/#!$%?!^&*;:{}=_`~()]/g, "")
    .split("")
    .map((letter) => {
      return alphabet.indexOf(letter);
    });

  const codedMessage = message_input
    .map((num) => {
      return cypher[num];
    })
    .join("")
    .replace(/-/g, " ");

  return codedMessage;
}

export function messageDecoder(codedMessage: string, keyword: string) {
  const cypher = cypherKeyword(keyword);

  const message_input = codedMessage
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[.,/#!$%?!^&*;:{}=_`~()]/g, "")
    .split("")
    .map((letter) => {
      return cypher.indexOf(letter);
    });

  const decodedMessage = message_input
    .map((num) => {
      return alphabet[num];
    })
    .join("")
    .replace(/-/g, " ");

  return decodedMessage;
}
