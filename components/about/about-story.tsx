import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import { aboutContent } from "@/constants/about";
import Image from "next/image";

export default function AboutStory() {
  return (
    <section className="py-14 sm:py-18 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={aboutContent.story.image}
                alt="نمایی از مجموعه دام فاضلی"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <span className="text-primary text-sm font-semibold">
                داستان مجموعه
              </span>

              <h2 className="mt-3 text-3xl leading-tight font-black sm:text-4xl">
                {aboutContent.story.title}
              </h2>

              <div className="text-muted-foreground mt-6 space-y-5 leading-8">
                {aboutContent.story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
