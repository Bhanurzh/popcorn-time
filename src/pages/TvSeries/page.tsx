import DropdownInput from "@/components/DropdownInput";
import FilmHeader from "@/components/film/FilmHeader";
import CustomPagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import SuspenseLoader from "@/components/SuspenseLoader";
import useGetFilms from "@/services/useGetFilms";
import useGetGenreFilm from "@/services/useGetGenreFilm";
import { FilmListResponse } from "@/types/apiResponse";
import { lazy, Suspense, useState } from "react";

const FilmList = lazy(() => import("@/components/film/FilmList"));

const TvSeries = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [genreId, setGenreId] = useState<string>("");
  const { data, isLoading, error } = useGetFilms(
    searchTerm,
    "tv",
    page,
    genreId
  );
  const { data: genreOptions } = useGetGenreFilm("tv");

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <section
        className="flex flex-col space-y-4 py-6 px-5 w-full"
        id="movie-section"
        aria-labelledby="movie-heading"
      >
        <h2 id="movie-heading" className="sr-only">
          Tv Series Section
        </h2>
        <FilmHeader title="Tv Series" isUseDefaultSearch={false}>
          <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <DropdownInput
            options={genreOptions}
            onChange={setGenreId}
            value={genreId}
            optionPlaceHoler="Genre"
            optionLabel="Select Genre"
          />
        </FilmHeader>
        <FilmList
          data={data as FilmListResponse}
          isLoading={isLoading}
          error={error}
        />
        <CustomPagination
          currentPage={page}
          totalPages={data?.total_pages || 1}
          onPageChange={handlePageChange}
        />
      </section>
    </Suspense>
  );
};

export default TvSeries;
