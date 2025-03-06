import { Skeleton } from "../ui/skeleton";
import { Loader2 } from "lucide-react";

const FilmDetailCardSkeletoon = () => {
  return (
    <div className="flex justify-center items-center py-5 px-4">
      <Skeleton className="w-6xl h-[400px] flex justify-center items-center">
        <Loader2 className="animate-spin text-red-primary" size={48} />
      </Skeleton>
    </div>
  );
};

export default FilmDetailCardSkeletoon;
