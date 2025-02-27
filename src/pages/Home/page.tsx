import SuspenseLoader from "@/components/SuspenseLoader";
import { Suspense, lazy } from "react";

const HeroSection = lazy(() => import("@/pages/Home/components/Hero"));
const FeaturedMovie = lazy(
  () => import("@/pages/Home/components/FeaturedMovie")
);

const Home = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <section id="hero-section" aria-labelledby="hero-heading">
        <h2 id="hero-heading" className="sr-only">
          Hero Section
        </h2>
        <HeroSection />
      </section>
      <section id="featured-movie" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="sr-only">
          Featured Movies
        </h2>
        <FeaturedMovie />
      </section>
    </Suspense>
  );
};

export default Home;
