/** @format */

import { heroContent } from "@/constants/hero";

export default function HeroStats() {
  return (
    <div className="border-border/80 bg-card/80 shadow-card grid grid-cols-3 overflow-hidden rounded-2xl border backdrop-blur-md">
      {heroContent.stats.map((stat, index) => (
        <div
          key={stat.label}
          className="relative flex min-h-24 flex-col items-center justify-center px-2 text-center sm:min-h-28"
        >
          {index !== 0 && (
            <span className="bg-border absolute inset-y-5 right-0 w-px" />
          )}

          <strong className="text-primary text-4xl font-black sm:text-2xl lg:text-3xl">
            {stat.value}
          </strong>

          <span className="text-muted-foreground mt-1 text-xs font-medium sm:text-sm">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
