import { TrailerResult } from "@/types/shares";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorCard from "@/components/ErrorCard";

interface FilmTrailerCarouselProps {
  trailers?: TrailerResult[];
  isLoading: boolean;
  error: string | null;
}

const FilmTrailerCarousel: React.FC<FilmTrailerCarouselProps> = ({
  trailers,
  isLoading,
  error,
}) => {
  return isLoading ? (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={`${index >= 1 ? "max-md:hidden" : ""}`}>
          <Skeleton className="h-[150px]" />
        </div>
      ))}
    </div>
  ) : error ? (
    <ErrorCard error={error} customClassName="w-full h-[120px]" />
  ) : trailers && trailers.length === 0 ? (
    <ErrorCard
      error={"Trailers Unavailable"}
      noPadding={true}
      customClassName="w-full h-[100px]"
    />
  ) : (
    <div className="flex flex-col gap-1">
      <p className="text-lg font-semibold">Trailers</p>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
          align: "center",
          containScroll: "trimSnaps",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent>
          {trailers?.map((trailer, index) => (
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="w-full aspect-video rounded-lg">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title={`${trailer.name} Trailer`}
                ></iframe>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 bg-red-primary hover:text-red-primary hover:bg-white transition duration-200 hover:scale-110 border-none block lg:hidden" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 bg-red-primary hover:text-red-primary hover:bg-white transition duration-200 hover:scale-110 border-none block lg:hidden" />
      </Carousel>
    </div>
  );
};

export default FilmTrailerCarousel;
