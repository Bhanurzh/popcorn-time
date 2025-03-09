import ErrorCard from "@/components/ErrorCard";
import FilmCarousel from "@/components/film/FilmCarousel";
import FilmCardSkeleton from "@/components/skeleton/FilmCardSkeleton";
import useGetUpComingFilm from "@/services/useGetUpComingFilm";

const UpComingCarousel = () => {
  const { isLoading, error, data } = useGetUpComingFilm();
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
          <h2 className="md:text-2xl text-lg font-bold text-white">
            Up Coming Movies
          </h2>
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

export default UpComingCarousel;
