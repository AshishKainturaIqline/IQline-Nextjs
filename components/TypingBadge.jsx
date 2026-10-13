"use client"

import { useEffect, useState } from "react";
const DEFAULT_PHRASES = [
  { prefix: "Elevating ", highlight: "Lives", suffix: " Digitally" },
  { prefix: "Automating ", highlight: "Healthcare", suffix: " Seamlessly" },
  { prefix: "Transforming ", highlight: "Medicine", suffix: " Real-Time" }
];
function TypingTitle({
  phrases = DEFAULT_PHRASES,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseDuration = 2200,
  className = ""
}) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentPhrase = phrases[phraseIndex];
  const fullText = `${currentPhrase.prefix}${currentPhrase.highlight}${currentPhrase.suffix}`;
  useEffect(() => {
    if (!isDeleting && charIndex < fullText.length) {
      const timeout = window.setTimeout(
        () => setCharIndex((prev) => prev + 1),
        typingSpeed
      );
      return () => window.clearTimeout(timeout);
    }
    if (!isDeleting && charIndex === fullText.length) {
      const timeout = window.setTimeout(
        () => setIsDeleting(true),
        pauseDuration
      );
      return () => window.clearTimeout(timeout);
    }
    if (isDeleting && charIndex > 0) {
      const timeout = window.setTimeout(
        () => setCharIndex((prev) => prev - 1),
        deletingSpeed
      );
      return () => window.clearTimeout(timeout);
    }
    setIsDeleting(false);
    setPhraseIndex((prev) => (prev + 1) % phrases.length);
  }, [
    charIndex,
    isDeleting,
    fullText,
    phrases.length,
    typingSpeed,
    deletingSpeed,
    pauseDuration
  ]);
  const prefixLength = currentPhrase.prefix.length;
  const highlightLength = currentPhrase.highlight.length;
  const visiblePrefix = currentPhrase.prefix.slice(
    0,
    Math.min(charIndex, prefixLength)
  );
  const visibleHighlight = charIndex > prefixLength ? currentPhrase.highlight.slice(
    0,
    Math.min(charIndex - prefixLength, highlightLength)
  ) : "";
  const visibleSuffix = charIndex > prefixLength + highlightLength ? currentPhrase.suffix.slice(0, charIndex - (prefixLength + highlightLength)) : "";
  return <h1 className={className}>
      <span>{visiblePrefix}</span>
      {visibleHighlight && <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
          {visibleHighlight}
        </span>}
      <span>{visibleSuffix}</span>
      <span className="ml-1 inline-block w-[3px] animate-pulse rounded-full bg-teal-400 align-baseline text-transparent">
        |
      </span>
    </h1>;
}
export {
  TypingTitle
};
