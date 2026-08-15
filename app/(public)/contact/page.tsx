import Container from "@/components/common/container";
import ContactForm from "@/components/contact/contact-form";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تماس با ما | دامداری",
  description:
    "برای ارتباط با مجموعه، ارسال پیام و دریافت اطلاعات بیشتر با ما در تماس باشید.",
};

export default function ContactPage() {
  return (
    <div className="py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-primary text-sm font-semibold">
              ارتباط با ما
            </span>

            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
              تماس با مجموعه
            </h1>

            <p className="text-muted-foreground mt-4 leading-8">
              برای دریافت اطلاعات بیشتر، مطرح کردن پرسش یا ارتباط با مجموعه،
              می‌توانید از راه‌های زیر با ما در تماس باشید یا فرم را تکمیل کنید.
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <section aria-labelledby="contact-information">
              <h2 id="contact-information" className="text-xl font-bold">
                اطلاعات تماس
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <Phone className="size-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">شماره تماس</h3>
                    <p
                      dir="ltr"
                      className="text-muted-foreground mt-1 text-right text-sm"
                    >
                      021-00000000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-secondary text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <Mail className="size-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">ایمیل</h3>
                    <p
                      dir="ltr"
                      className="text-muted-foreground mt-1 text-right text-sm"
                    >
                      info@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-secondary text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <MapPin className="size-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">آدرس</h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-6">
                      آدرس مجموعه پس از دریافت اطلاعات نهایی جایگزین می‌شود.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-secondary text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <Clock3 className="size-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">ساعات پاسخ‌گویی</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      شنبه تا پنجشنبه، ۸ تا ۱۷
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
