import useGetFilmReview from "@/services/useGetFilmReview";
import ReviewCard from "./ReviewCard";
import ErrorCard from "@/components/ErrorCard";
import { Skeleton } from "@/components/ui/skeleton";

interface FilmReviewProps {
  id: number;
  query: string;
}

const FilmReview: React.FC<FilmReviewProps> = ({ id, query }) => {
  const { filmReview, isLoading, error } = useGetFilmReview(id, query);

  return isLoading ? (
    <div className="m-4 p-4 bg-slate-700/10">
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-[100px] flex flex-col gap-2">
            <Skeleton className="h-[50px] w-[170px]" />
            <Skeleton className="h-[150px]" />
          </div>
        ))}
      </div>
    </div>
  ) : error ? (
    <ErrorCard error={error} customClassName="w-full h-[250px]" />
  ) : (
    filmReview &&
    filmReview?.results.length > 0 && (
      <div className="py-5 px-4 w-full flex flex-col gap-4">
        <p className="text-2xl font-bold text-white">Ratings & Reviews</p>
        <div className="flex flex-col gap-4 bg-slate-700/10 p-4 rounded-xl">
          {filmReview?.results.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
      </div>
    )
  );
};

export default FilmReview;
