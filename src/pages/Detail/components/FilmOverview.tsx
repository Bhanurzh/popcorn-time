import { MovieDetails } from "@/types/movie";
import { TvSeriesDetails } from "@/types/tvSeries";
import { formatDate } from "@/utils";

interface FilmOverviewProps {
  detailMovie?: MovieDetails;
  detailTvSeries?: TvSeriesDetails;
}

const FilmOverview: React.FC<FilmOverviewProps> = ({
  detailMovie,
  detailTvSeries,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl md:text-3xl">
          {detailMovie?.title || detailTvSeries?.name}{" "}
          {detailTvSeries &&
            detailTvSeries?.name !== detailTvSeries?.original_name &&
            `(${detailTvSeries.original_name})`}
        </p>
        <p className="text-sm opacity-80">
          {formatDate(
            (detailMovie?.release_date || detailTvSeries?.first_air_date) ??
              "N/A"
          )}
        </p>
        <p className="text-sm md:text-lg">
          {detailMovie?.overview || detailTvSeries?.overview}
        </p>
      </div>
      <div className="text-sm opacity-80 flex flex-col gap-1">
        <p>
          Rating:{" "}
          {detailMovie?.vote_average || detailTvSeries?.vote_average
            ? `${
                detailMovie?.vote_average.toFixed(1) ||
                detailTvSeries?.vote_average.toFixed(1)
              }⭐`
            : "Not Rated"}
        </p>
        {detailMovie?.runtime && <p>Duration: {detailMovie.runtime} Minute</p>}
        {detailTvSeries && (
          <>
            <p>Episode: {detailTvSeries.number_of_episodes}</p>
            <p>Season: {detailTvSeries.number_of_seasons}</p>
          </>
        )}
        {detailMovie?.genres || detailTvSeries?.genres ? (
          <p>
            Genre:{" "}
            {detailMovie?.genres?.map((g) => g.name).join(", ") ||
              detailTvSeries?.genres?.map((g) => g.name).join(", ")}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col md:flex-row w-full gap-2">
        <p className="text-wrap w-full md:w-1/4">
          Languages: <br />
          <span className="opacity-80 text-sm">
            {detailMovie?.spoken_languages
              ?.map((g) => g.english_name)
              .join(", ") ||
              detailTvSeries?.spoken_languages
                ?.map((g) => g.english_name)
                .join(", ")}
          </span>
        </p>
        {(detailMovie?.production_companies &&
          detailMovie.production_companies.length > 0) ||
        (detailTvSeries?.production_companies &&
          detailTvSeries.production_companies.length > 0) ? (
          <p className="text-wrap w-full md:w-2/4">
            Production Companies: <br />{" "}
            <span className="opacity-80">
              {detailMovie?.production_companies
                ?.map((g) => g.name)
                .join(", ") ||
                detailTvSeries?.production_companies
                  ?.map((g) => g.name)
                  .join(", ")}
            </span>
          </p>
        ) : null}
        <p className="text-wrap w-full md:w-1/4">
          Status: <br />
          <span className="opacity-80">
            {detailMovie?.status || detailTvSeries?.status}
          </span>
        </p>
      </div>
    </>
  );
};

export default FilmOverview;
