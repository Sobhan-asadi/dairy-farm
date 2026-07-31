import type { ProductItem } from "@/types/product";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: ProductItem;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group bg-card overflow-hidden rounded-2xl border">
      <Link href={product.href} className="block">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />

          <span className="bg-background/90 text-primary absolute right-4 bottom-4 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
            {product.category}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-xl font-bold">{product.title}</h3>

          <p className="text-muted-foreground mt-3 text-sm leading-7">
            {product.description}
          </p>

          <span className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-semibold">
            مشاهده محصول
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
