import { Film } from "@/types/shares";
import { Link } from "react-router-dom";

const FilmCard = ({ film }: { film: Film }) => {
  return (
    <div className=" bg-dark-gray border border-red-primary p-3 md:p-5 rounded-2xl transition duration-200 hover:shadow-[0_0_15px_#aa1d1d]">
      <Link to={`/detail/${film.id}?type=${film.name ? "tv" : "movie"}`}>
        <img
          src={
            film.poster_path
              ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
              : "https://placehold.co/150x225"
          }
          alt={film.title || film?.name}
          width={150}
          height={225}
          className="rounded-lg h-auto w-full"
          loading="lazy"
        />
        <div className="mt-4">
          <h3 className="text-white font-bold text-base line-clamp-1">
            {film.title || film?.name}
          </h3>

          <div className="mt-2 flex flex-row items-center flex-wrap gap-1 md:gap-2 text-sm">
            <p className="font-bold text-white">
              ⭐ {film.vote_average.toFixed(1) ?? "N/A"}
            </p>

            <span className="text-sm text-gray-100">•</span>
            <p className="capitalize text-gray-100 font-medium">
              {film.original_language}
            </p>

            <span className="text-sm text-gray-100">•</span>
            <p className="text-gray-100 font-medium">
              {(film?.release_date?.split("-")[0] ||
                film?.first_air_date?.split("-")[0]) ??
                "N/A"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FilmCard;
