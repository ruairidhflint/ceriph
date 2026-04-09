export const titleText = "CERIPH";

export const cipherText =
  "Choose a cipher, enter a key and a message to encode or decode. Only you and those with the key will be able to decode the message successfully.";

export const errorMessage =
  "Your keyword must be one word between 3 and 12 characters long. Your message cannot exceed 256 characters. Only English alphabet letters are permitted.";

export const aboutText = {
  paragraph1:
    "Ceriph is a collection of classical ciphers built with TypeScript and React. It supports several cipher types including Keyword Substitution, Caesar, ROT13, Atbash, and Vigenère, each with its own method of transforming plaintext into ciphertext.",
  paragraph2:
    "Classical ciphers are a fun way to introduce cryptography and a quick and easy way to obscure messages between friends, however they are easily cracked by a persistent and knowledgeable code breaker. The longer the message, the higher the chance of decoding by frequency analysis.",
};

export const disclaimerText = {
  paragraph1:
    "Ceriph uses a substitution cipher which, by modern standards, is far from a safe method of encryption. It is to be used purely as a learning tool or for fun personal use.",
  paragraph2:
    "Always encrypt any sensitive or confidential information using the latest, approved technology.",
  paragraph3:
    "More information on substitution ciphers and the methods to used to crack them can be found on",
};
