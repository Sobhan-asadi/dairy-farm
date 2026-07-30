/** @format */

"use client";

import { useEffect, useState } from "react";

type UseScrollOptions = {
  threshold?: number;
};

export function useScroll({ threshold = 20 }: UseScrollOptions = {}): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}
