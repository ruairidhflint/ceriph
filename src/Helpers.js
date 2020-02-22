const alphabet = 'abcdefghijklmnopqrstuvwxyz-';

function cypherKeyword(word) {
  const keyword = word
    .toLowerCase()
    .replace(/[., \/#!$%\?!^&\*;:{}=\_-`~()]/g, "")
    .split("")
    .filter((item, index, array) => array.indexOf(item) == index)
    .join("")

  let newString = alphabet

  keyword.split('').forEach(char => {
    newString = newString.replace(char, "")
  })

  return keyword + newString
}

export function messageSubstitution(message, keyword) {

  const cypher = cypherKeyword(keyword);

  const message_input = message
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[.,\/#!$%\?!^&\*;:{}=\_`~()]/g, "")
    .split('')
    .map(letter => {
      return alphabet.indexOf(letter)
    });

  const codedMessage = message_input
    .map(num => {
      return cypher[num]
    })
    .join("")
    .replace(/-/g," ");

  return codedMessage
}

export function messageDecoder(codedMessage, keyword) {

  const cypher = cypherKeyword(keyword);

  const message_input = codedMessage
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[.,\/#!$%\?!^&\*;:{}=\_`~()]/g, "")
    .split('')
    .map(letter => {
      return cypher.indexOf(letter)
    });

  const decodedMessage = message_input
    .map(num => {
      return alphabet[num]
    })
    .join("")
    .replace(/-/g," ");

  return decodedMessage
}





