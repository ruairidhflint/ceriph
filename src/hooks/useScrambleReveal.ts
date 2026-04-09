import { useState, useEffect, useRef } from "react";

const CHARS = "abcdefghijklmnopqrstuvwxyz";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function useScrambleReveal(text: string, durationMs = 800) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      return;
    }

    const startTime = performance.now();
    const revealPerChar = durationMs / text.length;

    function animate(now: number) {
      const elapsed = now - startTime;
      const revealedCount = Math.min(
        Math.floor(elapsed / revealPerChar),
        text.length
      );

      if (revealedCount >= text.length) {
        setDisplayed(text);
        return;
      }

      const result = text
        .split("")
        .map((char, i) => {
          if (i < revealedCount) return char;
          if (char === " ") return " ";
          return randomChar();
        })
        .join("");

      setDisplayed(result);
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, durationMs]);

  return displayed;
}
