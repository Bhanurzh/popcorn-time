import { Skeleton } from "../ui/skeleton";

interface FilmCardSkeletonProps {
  extraClassName?: string;
  descSkeleton: boolean;
}

const FilmCardSkeleton: React.FC<FilmCardSkeletonProps> = ({
  extraClassName,
  descSkeleton,
}) => {
  return (
    <div className={`flex flex-col space-y-4 rounded-2xl ${extraClassName}`}>
      <Skeleton className="h-[250px]" />
      {descSkeleton && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full md:w-[200px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      )}
    </div>
  );
};

export default FilmCardSkeleton;
