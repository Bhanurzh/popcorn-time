import DropdownInput from "@/components/DropdownInput";
import FilmHeader from "@/components/film/FilmHeader";
import CustomPagination from "@/components/Pagination";
import SuspenseLoader from "@/components/SuspenseLoader";
import useGetTrendingFilm from "@/services/useGetTrendingFilm";
import { FilmListResponse } from "@/types/apiResponse";
import { lazy, Suspense, useState } from "react";

const FilmList = lazy(() => import("@/components/film/FilmList"));

const Trending = () => {
  const [page, setPage] = useState<number>(1);
  const [trendingType, setTrendingType] = useState<string>("all");
  const [trendingPeriod, setTrendingPeriod] = useState<string>("day");
  const { data, isLoading, error } = useGetTrendingFilm(
    page,
    trendingType,
    trendingPeriod
  );

  const trendingOptions: { id: string; name: string }[] = [
    { id: "all", name: "All" },
    { id: "movie", name: "Movie" },
    { id: "tv", name: "Tv Series" },
  ];

  const tredingPeriodOptions: { id: string; name: string }[] = [
    { id: "day", name: "Day" },
    { id: "week", name: "Week" },
  ];

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
          Trending Section
        </h2>
        <FilmHeader title="Trending" isUseDefaultSearch={false}>
          <DropdownInput
            options={trendingOptions}
            optionLabel="Type"
            optionPlaceHoler="Trending Type"
            value={trendingType}
            onChange={setTrendingType}
          />
          <DropdownInput
            options={tredingPeriodOptions}
            optionLabel="Period"
            optionPlaceHoler="Trending Period"
            value={trendingPeriod}
            onChange={setTrendingPeriod}
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

export default Trending;
