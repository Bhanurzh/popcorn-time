import useGetFilmReview from "@/services/useGetFilmReview";
import ReviewCard from "./ReviewCard";
import ErrorCard from "@/components/ErrorCard";
import { Skeleton } from "@/components/ui/skeleton";
import CustomPagination from "@/components/Pagination";
import { useState } from "react";

interface FilmReviewProps {
  id: number;
  query: string;
}

const FilmReview: React.FC<FilmReviewProps> = ({ id, query }) => {
  const [page, setPage] = useState<number>(1);
  const { filmReview, isLoading, error } = useGetFilmReview(id, query);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          {filmReview?.results.slice((page - 1) * 5, page * 5).map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
        <CustomPagination
          currentPage={page}
          totalPages={filmReview?.total_pages || 1}
          onPageChange={handlePageChange}
        />
      </div>
    )
  );
};

export default FilmReview;
