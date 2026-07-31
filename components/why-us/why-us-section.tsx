import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/common/section-heading";
import { whyUsItems } from "@/constants/why-us";
import Image from "next/image";
import WhyUsItem from "./why-us-item";

export default function WhyUsSection() {
  return (
    <section className="bg-primary text-primary-foreground py-14 sm:py-18 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src="/images/cattle-care.webp"
                alt="مراقبت تخصصی از دام‌ها در مجموعه دام فاضلی"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading
                eyebrow="چرا دام فاضلی؟"
                title="اعتماد، کیفیت و مراقبت در تمام مراحل"
                description="از پرورش و مراقبت دام تا عرضه محصول، تمام مراحل با تمرکز بر سلامت، کیفیت و رضایت مشتری انجام می‌شود."
                className="[&_h2]:text-primary-foreground [&_p]:text-primary-foreground/70 [&_span]:text-accent"
              />
            </Reveal>

            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              {whyUsItems.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.1}>
                  <WhyUsItem item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
