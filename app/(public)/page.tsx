import HomeCta from "@/components/cta/home-cta";
import ActivitiesSection from "@/components/home/activities/activities-section";
import Hero from "@/components/home/hero/hero";
import FeaturedProducts from "@/components/home/products/featured-products";
import LatestNews from "@/components/news/latest-news";
import WhyUsSection from "@/components/why-us/why-us-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ActivitiesSection />
      <FeaturedProducts />
      <WhyUsSection />
      <LatestNews />
      <HomeCta />
    </>
  );
}
