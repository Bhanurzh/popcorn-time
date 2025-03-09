import { lazy, useEffect, useMemo, useState } from "react";
import { formatDate } from "@/utils";
import { Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import ErrorCard from "@/components/ErrorCard";
import useGetTrendingFilm from "@/services/useGetTrendingFilm";

const FilmCarousel = lazy(() => import("@/components/film/FilmCarousel"));

const HeroSection = () => {
  const { data, isLoading, error } = useGetTrendingFilm(1, "all", "day");
  const [activeIndex, setActiveIndex] = useState(0);

  const movies = useMemo(() => data?.results ?? [], [data?.results]);
  const currentMovie = movies[activeIndex];

  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <section
      className={`relative w-full h-[90vh] flex flex-col ${
        isLoading || error ? "justify-normal" : "justify-end"
      }`}
    >
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="animate-spin text-red-primary" size={48} />
        </div>
      ) : error ? (
        <ErrorCard error={error} customClassName="w-6xl h-[400px]" />
      ) : (
        <>
          <figure className="absolute inset-0 w-full h-full">
            <img
              src={`https://image.tmdb.org/t/p/w1280/${currentMovie?.backdrop_path}`}
              alt={currentMovie?.title || currentMovie?.name}
              width={1000}
              height={1000}
              className="w-full h-full object-cover brightness-50"
            />
          </figure>

          <article className="absolute md:bottom-[300px] bottom-[250px] left-5 text-left text-white max-w-2xl z-10">
            <h1 className="text-3xl md:text-5xl font-bold">
              {currentMovie?.title || currentMovie?.name}
            </h1>
            <p className="text-sm md:text-base mt-2 line-clamp-4">
              {currentMovie?.overview}
            </p>
            <div className="flex items-center gap-6 mt-4">
              <time className="text-sm md:text-base font-semibold">
                {formatDate(
                  (currentMovie?.release_date ||
                    currentMovie?.first_air_date) ??
                    "N/A"
                )}{" "}
                |
                {currentMovie?.vote_average
                  ? `⭐ ${currentMovie.vote_average.toFixed(1)}`
                  : " Not Rated"}
              </time>
              <Link
                to={
                  currentMovie?.media_type === "movie"
                    ? `/detail/${currentMovie?.id}?type=movie`
                    : `/detail/${currentMovie?.id}?type=tv`
                }
              >
                <Button className="bg-red-primary hover:bg-white hover:text-red-primary duration-200 transition hover:shadow-[0_0_10px_white] rounded-2xl">
                  Details
                </Button>
              </Link>
            </div>
          </article>

          <div className="relative w-full py-6 px-4">
            <FilmCarousel
              films={data?.results}
              isUsingCard={false}
              cardNoRedirect={true}
              carouselBasisItem="lg:basis-1/7 md:basis-1/5 basis-1/3 px-2 cursor-pointer"
              activeItem={activeIndex}
              setActiveItem={setActiveIndex}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
