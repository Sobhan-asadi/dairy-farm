import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import { aboutContent } from "@/constants/about";

export default function AboutHero() {
  return (
    <section className="bg-surface-muted py-14 sm:py-18 lg:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-primary text-sm font-semibold">
              {aboutContent.hero.eyebrow}
            </span>

            <h1 className="mt-3 text-4xl leading-tight font-black sm:text-5xl lg:text-6xl">
              {aboutContent.hero.title}
            </h1>

            <p className="text-muted-foreground mt-5 text-sm leading-8 sm:text-base">
              {aboutContent.hero.description}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
