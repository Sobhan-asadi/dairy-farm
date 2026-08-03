import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/common/section-heading";
import { aboutContent } from "@/constants/about";

export default function AboutValues() {
  return (
    <section className="bg-surface-muted py-14 sm:py-18 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="ارزش‌های ما"
            title="اصولی که مسیر ما را مشخص می‌کنند"
            description="تمام تصمیم‌ها و فعالیت‌های مجموعه بر پایه سلامت، کیفیت، اعتماد و توسعه حرفه‌ای انجام می‌شود."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.1}>
              <article className="bg-card min-h-52 rounded-2xl border p-6">
                <span className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl text-sm font-black">
                  {index + 1}
                </span>

                <h3 className="mt-5 text-lg font-bold">{value.title}</h3>

                <p className="text-muted-foreground mt-3 text-sm leading-7">
                  {value.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
