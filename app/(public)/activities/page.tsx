import ActivitiesGrid from "@/components/activities/activities-grid";
import ActivitiesHero from "@/components/activities/activities-hero";
import HomeCta from "@/components/cta/home-cta";

export default function ActivitiesPage() {
  return (
    <>
      <ActivitiesHero />
      <ActivitiesGrid />
      <HomeCta />
    </>
  );
}
