import { MovieAndTvSeries } from "@/types/shares";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }: { movie: MovieAndTvSeries }) => {
  return (
    <Link to={`/detail/${movie?.id}?type=movie`}>
      <div className="bg-dark-gray border border-red-primary p-3 md:p-5 rounded-2xl transition duration-200 hover:shadow-[0_0_15px_#aa1d1d]">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "/no-movie.png"
          }
          alt={movie.title}
          className="rounded-lg h-auto w-full"
        />
        <div className="mt-4">
          <h3 className="text-white font-bold text-base line-clamp-1">
            {movie.title}
          </h3>

          <div className="mt-2 flex flex-row items-center flex-wrap gap-1 md:gap-2">
            <p className="font-bold text-base text-white">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </p>

            <span className="text-sm text-gray-100">•</span>
            <p className="capitalize text-gray-100 font-medium text-base">
              {movie.original_language}
            </p>

            <span className="text-sm text-gray-100">•</span>
            <p className="text-gray-100 font-medium text-base">
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
