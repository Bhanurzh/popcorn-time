import { useState } from "react";
import SearchInput from "../../../components/SearchInput";
import FilmCardSkeleton from "../../../components/skeleton/FilmCardSkeleton";
import useGetFeaturedMovie from "@/services/useGetFeaturedMovie";
import FilmCard from "../../../components/FilmCard";

const FeaturedMovie = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, error } = useGetFeaturedMovie(searchTerm);

  return (
    <section className="flex flex-col space-y-4 py-10 px-5 w-full">
      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-4 lg:grid-cols-5 mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <FilmCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="w-full h-full flex justify-center items-center text-white">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <SearchInput
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl text-left">
            All Movies
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-4 lg:grid-cols-5">
            {data?.results.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default FeaturedMovie;
