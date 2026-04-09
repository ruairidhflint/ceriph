import { describe, it, expect } from "vitest";
import { keywordCipher } from "./keyword";
import { caesarCipher } from "./caesar";
import { rot13Cipher } from "./rot13";
import { atbashCipher } from "./atbash";
import { vigenereCipher } from "./vigenere";
import { ciphers, getCipher } from "./index";

describe("Keyword cipher", () => {
  it("encode then decode returns original message", () => {
    const message = "hello world";
    const key = "secret";
    const encoded = keywordCipher.encode(message, key);
    const decoded = keywordCipher.decode(encoded, key);
    expect(decoded).toBe(message);
  });

  it("encodes correctly", () => {
    const encoded = keywordCipher.encode("abc", "secret");
    expect(encoded).not.toBe("abc");
    expect(encoded.length).toBe(3);
  });

  it("validates key length", () => {
    expect(keywordCipher.keyValidator!("ab")).toBeTruthy();
    expect(keywordCipher.keyValidator!("abc")).toBeNull();
    expect(keywordCipher.keyValidator!("abcdefghijkl")).toBeNull();
    expect(keywordCipher.keyValidator!("abcdefghijklm")).toBeTruthy();
  });

  it("validates key content", () => {
    expect(keywordCipher.keyValidator!("abc123")).toBeTruthy();
    expect(keywordCipher.keyValidator!("abc")).toBeNull();
  });
});

describe("Caesar cipher", () => {
  it("encode then decode returns original", () => {
    const message = "hello world";
    const key = "3";
    const encoded = caesarCipher.encode(message, key);
    const decoded = caesarCipher.decode(encoded, key);
    expect(decoded).toBe(message);
  });

  it("shifts letters correctly", () => {
    expect(caesarCipher.encode("abc", "1")).toBe("bcd");
    expect(caesarCipher.encode("xyz", "3")).toBe("abc");
  });

  it("preserves spaces", () => {
    expect(caesarCipher.encode("hello world", "1")).toBe("ifmmp xpsme");
  });

  it("validates key range", () => {
    expect(caesarCipher.keyValidator!("0")).toBeTruthy();
    expect(caesarCipher.keyValidator!("1")).toBeNull();
    expect(caesarCipher.keyValidator!("25")).toBeNull();
    expect(caesarCipher.keyValidator!("26")).toBeTruthy();
    expect(caesarCipher.keyValidator!("abc")).toBeTruthy();
  });
});

describe("ROT13 cipher", () => {
  it("applying twice returns original", () => {
    const message = "hello world";
    const encoded = rot13Cipher.encode(message, "");
    const decoded = rot13Cipher.decode(encoded, "");
    expect(decoded).toBe(message);
  });

  it("encode and decode are same operation", () => {
    const message = "test";
    expect(rot13Cipher.encode(message, "")).toBe(rot13Cipher.decode(message, ""));
  });

  it("shifts by 13", () => {
    expect(rot13Cipher.encode("a", "")).toBe("n");
    expect(rot13Cipher.encode("n", "")).toBe("a");
  });
});

describe("Atbash cipher", () => {
  it("applying twice returns original", () => {
    const message = "hello world";
    const encoded = atbashCipher.encode(message, "");
    const decoded = atbashCipher.decode(encoded, "");
    expect(decoded).toBe(message);
  });

  it("reverses the alphabet", () => {
    expect(atbashCipher.encode("a", "")).toBe("z");
    expect(atbashCipher.encode("z", "")).toBe("a");
    expect(atbashCipher.encode("m", "")).toBe("n");
  });
});

describe("Vigenère cipher", () => {
  it("encode then decode returns original", () => {
    const message = "hello world";
    const key = "secret";
    const encoded = vigenereCipher.encode(message, key);
    const decoded = vigenereCipher.decode(encoded, key);
    expect(decoded).toBe(message);
  });

  it("each letter shifts differently", () => {
    const encoded = vigenereCipher.encode("aaa", "abc");
    expect(encoded).toBe("abc");
  });

  it("validates key phrase", () => {
    expect(vigenereCipher.keyValidator!("a")).toBeTruthy();
    expect(vigenereCipher.keyValidator!("ab")).toBeNull();
    expect(vigenereCipher.keyValidator!("abcdefghijklmnopqrst")).toBeNull();
    expect(vigenereCipher.keyValidator!("abcdefghijklmnopqrstu")).toBeTruthy();
  });
});

describe("Cipher registry", () => {
  it("contains all ciphers", () => {
    expect(ciphers).toHaveLength(5);
    const ids = ciphers.map((c) => c.id);
    expect(ids).toContain("keyword");
    expect(ids).toContain("caesar");
    expect(ids).toContain("rot13");
    expect(ids).toContain("atbash");
    expect(ids).toContain("vigenere");
  });

  it("getCipher returns correct cipher", () => {
    expect(getCipher("caesar").id).toBe("caesar");
  });

  it("getCipher defaults to keyword for unknown id", () => {
    expect(getCipher("nonexistent").id).toBe("keyword");
  });
});

describe("Roundtrip property: all ciphers", () => {
  const testMessages = [
    "hello",
    "the quick brown fox",
    "abcdefghijklmnopqrstuvwxyz",
    "a",
  ];

  for (const cipher of ciphers) {
    for (const message of testMessages) {
      const key = cipher.needsKey
        ? cipher.id === "caesar"
          ? "7"
          : "testkey"
        : "";

      it(`${cipher.name}: roundtrip "${message}"`, () => {
        const encoded = cipher.encode(message, key);
        const decoded = cipher.decode(encoded, key);
        expect(decoded).toBe(message);
      });
    }
  }
});
