import type { WhyUsItem as WhyUsItemType } from "@/types/why-us";

type WhyUsItemProps = {
  item: WhyUsItemType;
};

export default function WhyUsItem({ item }: WhyUsItemProps) {
  const Icon = item.icon;

  return (
    <div className="flex gap-4">
      <span className="bg-secondary text-primary flex size-12 shrink-0 items-center justify-center rounded-xl">
        <Icon className="size-6" />
      </span>

      <div>
        <h3 className="font-bold sm:text-lg">{item.title}</h3>

        <p className="text-muted-foreground mt-2 text-sm leading-7">
          {item.description}
        </p>
      </div>
    </div>
  );
}
