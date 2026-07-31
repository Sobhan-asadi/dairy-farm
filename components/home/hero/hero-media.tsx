/** @format */

import { HeartPulse, ShieldCheck } from "lucide-react";
import HeroImage from "./hero-image";

export default function HeroMedia() {
  return (
    <div className="relative">
      <div className="bg-primary/15 absolute -inset-6 -z-10 rounded-[2.5rem] blur-3xl" />

      <HeroImage />

      <div className="bg-background/90 shadow-card absolute right-3 bottom-6 flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-md sm:right-5 sm:bottom-5">
        <span className="bg-secondary text-primary flex size-10 items-center justify-center rounded-xl">
          <HeartPulse className="size-5" />
        </span>

        <div>
          <p className="text-sm font-bold">سلامت دام</p>
          <p className="text-muted-foreground text-xs">تحت نظارت تخصصی</p>
        </div>
      </div>

      <div className="bg-background/90 shadow-card absolute top-4 left-3 hidden items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-md sm:flex">
        <span className="bg-secondary text-primary flex size-10 items-center justify-center rounded-xl">
          <ShieldCheck className="size-5" />
        </span>

        <div>
          <p className="text-sm font-bold">کیفیت تضمین‌شده</p>
          <p className="text-muted-foreground text-xs">پرورش اصولی و بهداشتی</p>
        </div>
      </div>
    </div>
  );
}
