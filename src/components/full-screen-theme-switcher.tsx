import { type ReactNode, useEffect, useRef } from "react";
import { useState, useCallback } from "react";
import type { BinaryTheme } from "ternary-theme";

export default function FullScreenThemeSwitcher({
  lightContent,
  darkContent,
  lightTooltip,
  darkTooltip,
  noneTooltip,
  children,
  onChange,
}: {
  lightContent: ReactNode;
  darkContent: ReactNode;
  lightTooltip?: ReactNode;
  darkTooltip?: ReactNode;
  noneTooltip?: ReactNode;
  children?: ReactNode;
  onChange?: (theme: BinaryTheme) => void;
}) {
  const [expandedSide, setExpandedSide] = useState<"none" | BinaryTheme>("none");
  const [mouseSide, setMouseSide] = useState<"none" | BinaryTheme>("none");

  const rootRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const setTooltipPosition = useCallback((x: number, y: number) => {
    if (!tooltipRef.current || !rootRef.current) return;

    const tooltip = tooltipRef.current;
    const rect = tooltip.getBoundingClientRect();
    const rootRect = rootRef.current.getBoundingClientRect();

    let left = x - rect.width / 2;
    let top = y - rect.height;

    if (left < 0) {
      left = 0;
    }
    if (left + rect.width > rootRect.width) {
      left = rootRect.width - rect.width;
    }
    if (top < 0) {
      top = 0;
    }
    if (top + rect.height > rootRect.height) {
      top = rootRect.height - rect.height;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setMousePos({ x, y });
    };

    addEventListener("mousemove", handleMouseMove);
    return () => removeEventListener("mousemove", handleMouseMove);
  }, [setTooltipPosition]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTooltipPosition(mousePos.x, mousePos.y);
    });
  }, [expandedSide, mouseSide, mousePos, setTooltipPosition]);

  const handleClick = useCallback(
    (side: BinaryTheme) => {
      onChange?.(side);
      setExpandedSide((prev) => (prev === "none" ? side : prev === side ? "none" : side));
    },
    [onChange],
  );

  const whiteWidthClass = expandedSide === "light" ? "w-full" : expandedSide === "dark" ? "w-0" : "w-1/2";

  const tooltipText =
    expandedSide === "none"
      ? mouseSide === "light"
        ? lightTooltip
        : darkTooltip
      : noneTooltip;

  const showPopover = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.showPopover();
    }
  }, [tooltipRef]);

  const hidePopover = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.hidePopover();
    }
  }, [tooltipRef]);

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full overflow-hidden scroll-smooth"
    >
      <div
        className="relative h-screen flex items-center justify-center"
        onMouseEnter={showPopover}
        onMouseMove={showPopover}
        onMouseLeave={hidePopover}
      >
        <div
          className={`absolute inset-y-0 left-0 transition-all duration-500 ease-in-out ${whiteWidthClass} z-1 bg-white`}
          style={{
            backgroundClip: "content-box",
            backgroundImage: "radial-gradient(#3c3c3c 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            backgroundPosition: "0.5px 0.5px",
          }}
          onClick={() => handleClick("light")}
          onMouseEnter={() => setMouseSide("light")}
          onMouseLeave={() => setMouseSide("none")}
        />
        <div
          className={`absolute inset-y-0 right-0 transition-all duration-500 ease-in-out w-full bg-black`}
          style={{
            backgroundClip: "content-box",
            backgroundImage:
              "linear-gradient(to right, #242424 1px, transparent 1px), linear-gradient(to bottom, #242424 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            backgroundPosition: "35px 35px",
          }}
          onClick={() => handleClick("dark")}
          onMouseEnter={() => setMouseSide("dark")}
          onMouseLeave={() => setMouseSide("none")}
        />

        <h1 className="relative w-full z-1 text-6xl md:text-8xl font-extrabold select-none mix-blend-difference text-white pointer-events-none">
          <span className="absolute right-1/2 translate-y-[-50%] px-3">{lightContent}</span>
          <span className="absolute left-1/2 translate-y-[-50%] px-3">{darkContent}</span>
        </h1>
      </div>

      <div
        ref={tooltipRef}
        popover="manual"
        className="pointer-events-none select-none mix-blend-difference bg-transparent"
      >
        <div className="px-3 py-1.5 rounded-md whitespace-nowrap bg-white text-black">{tooltipText}</div>
      </div>
      {children}
    </div>
  );
}
