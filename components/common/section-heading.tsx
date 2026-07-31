import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <span className="text-primary text-sm font-semibold">{eyebrow}</span>
      )}

      <h2 className="mt-2 text-3xl leading-tight font-black sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="text-muted-foreground mt-4 leading-8">{description}</p>
      )}
    </div>
  );
}
