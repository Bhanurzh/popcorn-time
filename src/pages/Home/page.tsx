import SuspenseLoader from "@/components/SuspenseLoader";
import { Suspense, lazy } from "react";

const HeroSection = lazy(() => import("@/pages/Home/components/Hero"));
const FeaturedMovie = lazy(
  () => import("@/pages/Home/components/FeaturedMovie")
);
const TvSeriesCarousel = lazy(
  () => import("@/pages/Home/components/TvSeriesCarousel")
);
const UpComingCarousel = lazy(
  () => import("@/pages/Home/components/UpComingCarousel")
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
      <section id="tv-series" aria-labelledby="tv-series-heading">
        <h2 id="tv-series-heading" className="sr-only">
          Tv Series
        </h2>
        <TvSeriesCarousel />
      </section>
      <section id="up-coming-movie" aria-labelledby="up-coming-movie-heading">
        <h2 id="up-coming-movie-heading" className="sr-only">
          Up Coming Movies
        </h2>
        <UpComingCarousel />
      </section>
    </Suspense>
  );
};

export default Home;
