/** @format */

import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="shadow-soft relative aspect-4/3 overflow-hidden rounded-3xl sm:aspect-16/10 lg:aspect-4/3">
      <Image
        src="/images/hero/hero.webp"
        alt="دام‌های سالم در مجموعه دام فاضلی"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 48vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
    </div>
  );
}
