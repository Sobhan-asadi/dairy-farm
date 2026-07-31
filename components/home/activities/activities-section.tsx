import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/common/section-heading";
import { activities } from "@/constants/activities";

import ActivityCard from "./activity-card";

export default function ActivitiesSection() {
  return (
    <section className="bg-surface-muted py-14 sm:py-18 lg:py-16">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="فعالیت‌های مجموعه"
            title="خدماتی کامل برای زنجیره دامداری"
            description="دام فاضلی مجموعه‌ای از خدمات و محصولات مرتبط با پرورش، سلامت و تأمین نیازهای دامداری را ارائه می‌دهد."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {activities.map((activity, index) => (
            <Reveal key={activity.title} delay={index * 0.08}>
              <ActivityCard activity={activity} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
