import CustomPagination from "@/components/Pagination";
import SuspenseLoader from "@/components/SuspenseLoader";
import useGetFilms from "@/services/useGetFilms";
import { FilmListResponse } from "@/types/apiResponse";
import { lazy, Suspense, useState } from "react";

const FilmList = lazy(() => import("@/components/FilmList"));

const Movie = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [genreId, setGenreId] = useState<string>("");
  const { data, isLoading, error } = useGetFilms(
    searchTerm,
    "movie",
    page,
    genreId
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <section id="movie-section" aria-labelledby="movie-heading">
        <h2 id="movie-heading" className="sr-only">
          Movie Section
        </h2>
        <FilmList
          data={data as FilmListResponse}
          isLoading={isLoading}
          error={error}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genreId={genreId}
          setGenreId={setGenreId}
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

export default Movie;
