import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import { activities } from "@/constants/activities";
import ActivityItem from "./activity-item";

export default function ActivitiesGrid() {
  return (
    <section className="py-14 sm:py-18 lg:py-20">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <Reveal key={activity.href} delay={index * 0.1}>
              <ActivityItem activity={activity} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
