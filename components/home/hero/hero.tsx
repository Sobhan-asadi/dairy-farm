/** @format */

import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import HeroContent from "./hero-content";
import HeroMedia from "./hero-media";
import HeroStats from "./hero-stats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <HeroContent />
          </Reveal>

          <Reveal delay={0.25}>
            <HeroMedia />
          </Reveal>
        </div>

        <Reveal delay={0.5} className="mt-8 sm:mt-10 lg:mt-14">
          <HeroStats />
        </Reveal>
      </Container>
    </section>
  );
}
