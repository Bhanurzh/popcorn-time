import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import ErrorCard from "@/components/ErrorCard";
import useGetFilmTrailer from "@/services/useGetFilmTrailer";
import useGetDetailFilm from "@/services/useGetDetailFilm";
import FilmDetailCardSkeletoon from "@/components/skeleton/FilmDetailCardSkeleton";
import FilmOverview from "./FilmOverview";
import FilmTrailerCarousel from "./FilmTrailerCarousel";

interface FilmDetailSectionProps {
  id: number;
  query: string;
}

const FilmDetailSection: React.FC<FilmDetailSectionProps> = ({ id, query }) => {
  const navigate = useNavigate();
  const { detailMovie, detailTvSeries, isLoading, error } = useGetDetailFilm(
    id,
    query
  );
  const {
    filmTrailer,
    isLoading: isLoadingTrailer,
    error: errorTrailer,
  } = useGetFilmTrailer(id, query);

  return isLoading ? (
    <FilmDetailCardSkeletoon />
  ) : error ? (
    <ErrorCard error={error} customClassName="w-6xl h-[400px]" />
  ) : (
    <div className="relative w-full">
      <img
        src={`https://image.tmdb.org/t/p/w1280/${
          detailMovie?.backdrop_path || detailTvSeries?.backdrop_path
        }`}
        width={1000}
        height={1000}
        alt={detailMovie?.title || detailTvSeries?.name}
        className="absolute object-cover w-full h-full"
      />
      <div className="flex justify-center items-center py-5 px-4">
        <Card className="bg-detail-dark-primary backdrop-blur-sm w-6xl border-none">
          <CardHeader className="flex justify-between items-center flex-row text-white">
            <MoveLeft
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-red-primary hover:scale-110"
            />
            <CardTitle className="flex-1 text-center text-2xl">
              Details
            </CardTitle>
          </CardHeader>
          <CardContent className="flex md:flex-row flex-col gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${
                detailMovie?.poster_path || detailTvSeries?.poster_path
              }`}
              width={300}
              height={450}
              alt={detailMovie?.title || detailTvSeries?.name}
              className="w-full md:w-1/3 rounded-lg"
              loading="lazy"
            />
            <div className="flex flex-col justify-between md:gap-2 gap-2 text-white">
              <div className="flex flex-col gap-2">
                <FilmOverview
                  detailMovie={detailMovie}
                  detailTvSeries={detailTvSeries}
                />
                <FilmTrailerCarousel
                  trailers={filmTrailer?.results?.slice(0, 4)}
                  isLoading={isLoadingTrailer}
                  error={errorTrailer}
                />
              </div>
              <Button
                disabled={!detailMovie?.homepage && !detailTvSeries?.homepage}
                className={`${
                  detailMovie?.homepage || detailTvSeries?.homepage
                    ? "bg-red-primary hover:bg-red-primary/90 transition duration-300 hover:shadow-[0_0_15px_#aa1d1d]"
                    : "bg-gray-500"
                }`}
              >
                <a
                  href={detailMovie?.homepage || detailTvSeries?.homepage}
                  target="_blank"
                  className="w-full h-full flex items-center justify-center"
                >
                  Watch Now!
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FilmDetailSection;
