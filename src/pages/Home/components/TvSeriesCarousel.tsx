import ErrorCard from "@/components/ErrorCard";
import FilmCarousel from "@/components/film/FilmCarousel";
import FilmCardSkeleton from "@/components/skeleton/FilmCardSkeleton";
import useGetTvSeries from "@/services/useGetTvSeries";
import { ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";

const TvSeriesCarousel = () => {
  const { isLoading, error, data } = useGetTvSeries();
  return (
    <section className="flex flex-col p-5 w-full gap-4">
      {isLoading ? (
        <div className="grid grid-cols-3 gap-3 md:gap-5 md:grid-cols-5 lg:grid-cols-7 py-6 px-4 min-h-[300px]">
          {Array.from({ length: 7 }).map((_, index) => (
            <FilmCardSkeleton
              descSkeleton={false}
              key={index}
              extraClassName={`${index >= 2 ? "max-md:hidden" : ""} ${
                index >= 4 ? "max-lg:hidden" : ""
              }`}
            />
          ))}
        </div>
      ) : error ? (
        <ErrorCard error={error} customClassName="w-full h-[200px]" />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="md:text-2xl text-lg font-bold text-white">
              TV Series -{" "}
              <span className="md:text-xl text-md">Airing Today</span>
            </h2>
            <Link to={"/tv-series"}>
              <p className="flex items-center gap-1 md:text-lg text-md text-white font-semibold hover:text-red-primary hover:mr-2 transition-all duration-200">
                See All <ChevronsRight size={18} />
              </p>
            </Link>
          </div>
          <FilmCarousel
            films={data?.results}
            isUsingCard={false}
            cardNoRedirect={false}
            carouselBasisItem="lg:basis-1/7 md:basis-1/5 basis-1/3 px-2 cursor-pointer"
          />
        </>
      )}
    </section>
  );
};

export default TvSeriesCarousel;
