import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { formatDate } from "@/utils";
import { Loader2 } from "lucide-react";
import useTrendingMovie from "@/hooks/useTrendingMovie";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { data, isLoading, error } = useTrendingMovie();
  const [activeIndex, setActiveIndex] = useState(0);

  const movies = data?.results ?? [];
  const currentMovie = movies[activeIndex];

  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <section className="relative w-full h-[90vh] flex flex-col justify-end">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="animate-spin text-red-primary" size={48} />
        </div>
      ) : error ? (
        <div className="w-full h-full flex justify-center items-center text-white">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 w-full h-full">
            <img
              src={`https://image.tmdb.org/t/p/original/${currentMovie?.backdrop_path}`}
              alt={currentMovie?.title}
              className="w-full h-full object-cover brightness-50"
            />
          </div>

          <div className="absolute md:bottom-[300px] bottom-[250px] left-5 text-left text-white max-w-2xl z-10">
            <h1 className="text-3xl md:text-5xl font-bold">
              {currentMovie?.title || currentMovie?.name}
            </h1>
            <p className="text-sm md:text-base mt-2">
              {currentMovie?.overview}
            </p>
            <div className="flex items-center gap-6 mt-4">
              <p className="text-sm md:text-base font-semibold">
                {formatDate(
                  (currentMovie?.release_date ||
                    currentMovie?.first_air_date) ??
                    "N/A"
                )}{" "}
                |
                {currentMovie?.vote_average
                  ? `⭐ ${currentMovie.vote_average.toFixed(1)}`
                  : " Not Rated"}
              </p>
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
          </div>

          <div className="relative w-full py-6 px-4">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnMouseEnter: true,
                  stopOnInteraction: false,
                }),
              ]}
              opts={{
                loop: true,
                align: "center",
                containScroll: "trimSnaps",
                slidesToScroll: 1,
                watchFocus: true,
              }}
              className="w-full mx-auto"
            >
              <CarouselContent>
                {data?.results.map((popularMovie, index) => (
                  <CarouselItem
                    key={popularMovie.id}
                    className="lg:basis-1/8 md:basis-1/5 basis-1/3 px-2 cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${popularMovie.poster_path}`}
                      alt={popularMovie.title}
                      className={`md:w-[160px] w-[120px] md:h-[250px] rounded-lg object-cover ${
                        activeIndex === index
                          ? "border-[3px] border-red-primary"
                          : ""
                      }`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 bg-red-primary hover:text-red-primary hover:bg-white transition duration-200 hover:scale-110 border-none md:block hidden" />
              <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 bg-red-primary hover:text-red-primary hover:bg-white transition duration-200 hover:scale-110 border-none md:block hidden" />
            </Carousel>
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
