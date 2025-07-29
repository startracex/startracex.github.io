"use client";
import { useState, useEffect, useRef } from "react";

interface WordTransitionProps {
  words: string[];
  effectTime?: number;
  holdingTime?: number;
  stepTime?: number;
  characters?: string;
  reverse?: boolean;
}

export default function WordTransition({
  words,
  effectTime = 2000,
  holdingTime = 2700,
  stepTime = 40,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  reverse = false, // 默认正向显示
}: WordTransitionProps) {
  const [displayText, setDisplayText] = useState("");
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (words.length === 0) return;

    const updateDisplay = () => {
      const currentTime = Date.now();
      const cycleTime = effectTime + holdingTime;

      const timeInCycle = currentTime % cycleTime;
      const totalCycles = Math.floor(currentTime / cycleTime);
      const currentWordIndex = totalCycles % words.length;
      const currentWord = words[currentWordIndex];
      const wordLength = currentWord.length;

      // 计算动画进度(0-1)
      const progress = timeInCycle < effectTime ? Math.min(1, timeInCycle / effectTime) : 1;

      // 根据reverse属性计算可见字符范围
      const visibleCount = Math.floor(progress * wordLength);

      const newDisplayText = currentWord
        .split("")
        .map((char, index) => {
          if (reverse) {
            // 反向显示：从后往前稳定字符
            // 对于索引index，其反向位置是wordLength - 1 - index
            // 当可见数量 >= 反向位置+1时，该字符稳定显示
            return visibleCount >= wordLength - index
              ? char
              : characters[Math.floor(Math.random() * characters.length)];
          } else {
            // 正向显示：从前往后稳定字符
            return index < visibleCount ? char : characters[Math.floor(Math.random() * characters.length)];
          }
        })
        .join("");

      setDisplayText(newDisplayText);
    };

    updateDisplay();
    intervalRef.current = window.setInterval(updateDisplay, stepTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [words, effectTime, holdingTime, stepTime, characters, reverse]);

  return displayText;
}
