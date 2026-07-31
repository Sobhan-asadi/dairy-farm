import { buttonVariants } from "@/components/ui/button";
import { heroContent } from "@/constants/hero";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <div className="bg-secondary text-secondary-foreground mb-5 inline-flex min-h-9 items-center rounded-full px-4 text-xs font-semibold sm:text-sm">
        {heroContent.badge}
      </div>

      <h1 className="text-foreground max-w-4xl text-4xl leading-normal font-black tracking-tight sm:text-5xl lg:text-6xl">
        {heroContent.title}
      </h1>

      <p className="text-muted-foreground mt-5 max-w-xl text-sm leading-7 sm:text-base sm:leading-8">
        {heroContent.description}
      </p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link
          href={heroContent.primaryAction.href}
          className={buttonVariants({
            size: "lg",
            className: "w-full sm:w-auto",
          })}
        >
          {heroContent.primaryAction.label}
          <ArrowLeft />
        </Link>

        <Link
          href={heroContent.secondaryAction.href}
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "lg",
            }),
            "border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full border-2 sm:w-auto",
          )}
        >
          {heroContent.secondaryAction.label}
        </Link>
      </div>
    </div>
  );
}
