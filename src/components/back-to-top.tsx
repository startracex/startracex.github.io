"use client";
import { ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isTrackingRef = useRef<number>(undefined);

  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollY = window.scrollY;

      setIsVisible(scrollY > 300);

      isTrackingRef.current = requestAnimationFrame(checkScrollPosition);
    };

    isTrackingRef.current = requestAnimationFrame(checkScrollPosition);

    return () => {
      cancelAnimationFrame(isTrackingRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`block fixed p-3 rounded-full bg-transparent transition-all duration-300 ease-in-out z-50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{ bottom: "2rem", right: "2rem" }}
    >
      <ChevronUp
        className="hover:-translate-y-1/5 duration-300 ease-in-out"
        size="2.5em"
      />
    </button>
  );
};

export default BackToTop;
