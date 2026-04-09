import { describe, it, expect } from "vitest";
import { validator } from "./errorHelper";
import { toAlphaSpace, toAlphaOnly, stripSpecialChars } from "./sanitize";

describe("validator", () => {
  it("accepts valid input", () => {
    const result = validator({ key: "secret", message: "hello world" });
    expect(result).toEqual({ key: "secret", message: "hello world" });
  });

  it("rejects key too short", () => {
    expect(validator({ key: "ab", message: "hello" })).toBe(false);
  });

  it("rejects key too long", () => {
    expect(validator({ key: "abcdefghijklm", message: "hello" })).toBe(false);
  });

  it("rejects key with numbers", () => {
    expect(validator({ key: "abc123", message: "hello" })).toBe(false);
  });

  it("rejects message too short", () => {
    expect(validator({ key: "secret", message: "hi" })).toBe(false);
  });

  it("rejects message too long", () => {
    const longMessage = "a".repeat(257);
    expect(validator({ key: "secret", message: longMessage })).toBe(false);
  });

  it("rejects message with special chars", () => {
    expect(validator({ key: "secret", message: "hello!" })).toBe(false);
  });
});

describe("sanitize utilities", () => {
  it("toAlphaSpace keeps letters and spaces", () => {
    expect(toAlphaSpace("Hello World!123")).toBe("hello world");
  });

  it("toAlphaOnly keeps only letters", () => {
    expect(toAlphaOnly("Hello World!123")).toBe("HelloWorld");
  });

  it("stripSpecialChars removes punctuation", () => {
    expect(stripSpecialChars("hello, world!")).toBe("hello world");
  });
});
