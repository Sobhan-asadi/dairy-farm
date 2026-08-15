import CareerForm from "@/components/careers/career-form";
import Container from "@/components/common/container";
import { FileText, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "همکاری با ما | دامداری",
  description:
    "برای همکاری با مجموعه، اطلاعات و رزومه خود را برای ما ارسال کنید.",
};

export default function CareersPage() {
  return (
    <div className="py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <section>
            <span className="text-primary text-sm font-semibold">
              همکاری با ما
            </span>

            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              به تیم ما بپیوندید
            </h1>

            <p className="text-muted-foreground mt-4 leading-8">
              اگر علاقه‌مند به همکاری با مجموعه هستید، اطلاعات خود را وارد کرده
              و رزومه‌تان را ارسال کنید. پس از بررسی، در صورت نیاز با شما تماس
              خواهیم گرفت.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex gap-3">
                <div className="bg-secondary text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <FileText className="size-5" />
                </div>

                <div>
                  <h2 className="font-bold">ارسال رزومه</h2>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    رزومه خود را با فرمت PDF، DOC یا DOCX ارسال کنید.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-secondary text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <ShieldCheck className="size-5" />
                </div>

                <div>
                  <h2 className="font-bold">بررسی درخواست</h2>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    اطلاعات ارسالی فقط برای بررسی درخواست همکاری استفاده می‌شود.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <CareerForm />
        </div>
      </Container>
    </div>
  );
}
