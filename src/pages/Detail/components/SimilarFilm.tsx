import ErrorCard from "@/components/ErrorCard";
import useGetSimilarFilm from "@/services/useGetSimilarFilm";
import FilmCarousel from "../../../components/FilmCarousel";
import FilmCardSkeleton from "@/components/skeleton/FilmCardSkeleton";

interface SimilarFilmProps {
  id: number;
  query: string;
}

const SimilarFilm: React.FC<SimilarFilmProps> = ({ id, query }) => {
  const { similarFilm, isLoading, error } = useGetSimilarFilm(
    Number(id),
    query
  );
  return isLoading ? (
    <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-4 lg:grid-cols-6 py-6 px-4 min-h-[300px]">
      {Array.from({ length: 6 }).map((_, index) => (
        <FilmCardSkeleton
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
    <div className="py-6 px-4 flex flex-col gap-4">
      <p className="text-2xl font-bold text-white">Discover Similar Films</p>
      <FilmCarousel
        films={similarFilm?.results}
        carouselBasisItem="basis-1/2 md:basis-1/4 lg:basis-1/6 py-2"
        isUsingCard={true}
      />
    </div>
  );
};

export default SimilarFilm;
