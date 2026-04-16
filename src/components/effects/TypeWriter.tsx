"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  words: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export function TypeWriter({
  words,
  className,
  speed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
}: TypeWriterProps) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length === current.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, speed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
