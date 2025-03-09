import FilmCardSkeleton from "../skeleton/FilmCardSkeleton";
import FilmCard from "./FilmCard";
import { FilmListResponse } from "@/types/apiResponse";
import ErrorCard from "../ErrorCard";

interface FilmListProps {
  data: FilmListResponse;
  isLoading: boolean;
  error: string | null;
}

const FilmList: React.FC<FilmListProps> = ({ data, isLoading, error }) => {
  return isLoading ? (
    <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-4 lg:grid-cols-5 mt-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <FilmCardSkeleton descSkeleton={true} key={index} />
      ))}
    </div>
  ) : error ? (
    <ErrorCard
      error={error}
      customClassName="w-full h-[200px]"
      noPadding={true}
    />
  ) : (
    <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-4 lg:grid-cols-5">
      {data?.results.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
};

export default FilmList;
