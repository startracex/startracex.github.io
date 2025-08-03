"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function getRandomHSLColor(isLight: boolean): string {
  const h = Math.floor(Math.random() * 360); // Hue: 0-359
  const s = Math.floor(Math.random() * 50) + 50; // Saturation: 50-100%
  let l; // Lightness
  if (isLight) {
    l = Math.floor(Math.random() * 20) + 70; // Lightness: 70-90% for light gradients
  } else {
    l = Math.floor(Math.random() * 20) + 20; // Lightness: 20-40% for dark gradients
  }
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function generateRandomGradientWithContrast() {
  // Randomly decide if the gradient will be light or dark to ensure contrast
  const isLightGradient = Math.random() > 0.5;
  const colors = Array.from({ length: 4 }, () => getRandomHSLColor(isLightGradient));
  const angle = Math.floor(Math.random() * 360); // Random angle for the gradient

  // Set text color based on the gradient's overall lightness
  const textColor = isLightGradient ? "black" : "white";

  return {
    gradientString: `linear-gradient(${angle}deg, ${colors.join(", ")})`,
    textColor: textColor,
  };
}

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
}

export default function ArticleCard({ title, description, date }: ArticleCardProps) {
  const [gradientData, setGradientData] = useState<{ gradientString: string; textColor: string } | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    // Generate a random gradient and its corresponding text color when the component mounts
    setGradientData(generateRandomGradientWithContrast());
  }, []);

  // Use fallback values if gradientData is not yet available
  const currentGradient = gradientData?.gradientString || "";
  const currentTextColor = gradientData?.textColor || "inherit";

  return (
    <div
      className={cn(
        "h-full w-full relative overflow-hidden p-6 ease-in-out",
        isHovered && (gradientData.textColor === "black" ? "text-zinc-900" : "text-zinc-100"),
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="z-10 relative">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm mb-4">{description}</p>
        <time
          className={cn(
            "text-xs",
            isHovered
              ? gradientData.textColor === "black"
                ? "text-zinc-900"
                : "text-zinc-200"
              : "text-zinc-600 dark:text-zinc-400",
          )}
        >
          {date}
        </time>
      </div>
      <div
        className={cn("absolute inset-0 bg-cover bg-center", isHovered ? "opacity-100" : "opacity-0")}
        style={{
          backgroundImage: currentGradient,
          backgroundSize: "400% 400%",
          color: currentTextColor,
          transition: "background 0.3s ease-in-out",
        }}
      ></div>
    </div>
  );
}
