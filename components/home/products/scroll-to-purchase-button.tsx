"use client";

import { ChevronDown } from "lucide-react";

type ScrollToPurchaseButtonProps = {
  label: string;
};

export default function ScrollToPurchaseButton({
  label,
}: ScrollToPurchaseButtonProps) {
  const handleClick = () => {
    const panel = document.getElementById("purchase-panel");

    if (panel) {
      panel.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 inline-flex min-h-10 items-center justify-center gap-1 rounded-xl px-3 text-xs font-bold transition-colors"
    >
      {label}
      <ChevronDown className="size-4" />
    </button>
  );
}
