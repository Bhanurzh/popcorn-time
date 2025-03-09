import Autoplay from "embla-carousel-autoplay";
import { Film } from "@/types/shares";
import FilmCard from "@/components/film/FilmCard";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface FilmCarouselProps {
  films?: Film[];
  carouselBasisItem: string;
  isUsingCard: boolean;
  cardNoRedirect?: boolean;
  activeItem?: number;
  setActiveItem?: React.Dispatch<React.SetStateAction<number>>;
}

const FilmCarousel: React.FC<FilmCarouselProps> = ({
  films,
  carouselBasisItem,
  isUsingCard,
  cardNoRedirect,
  activeItem,
  setActiveItem,
}) => {
  return (
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
        {films?.map((film, index) =>
          isUsingCard ? (
            <CarouselItem key={index} className={carouselBasisItem}>
              <FilmCard film={film} />
            </CarouselItem>
          ) : cardNoRedirect ? (
            <CarouselItem
              key={index}
              className={carouselBasisItem}
              onClick={() => setActiveItem && setActiveItem(index)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                srcSet={`
                    https://image.tmdb.org/t/p/w300/${film.poster_path} 300w,
                    https://image.tmdb.org/t/p/w500/${film.poster_path} 500w,
                    https://image.tmdb.org/t/p/w780/${film.poster_path} 780w
                  `}
                alt={film.title || film?.name}
                width={160}
                height={250}
                className={`md:w-[160px] w-[120px] md:h-[250px] rounded-lg object-cover ${
                  activeItem === index ? "border-[3px] border-red-primary" : ""
                }`}
                loading="lazy"
              />
            </CarouselItem>
          ) : (
            <CarouselItem key={index} className={carouselBasisItem}>
              <Link
                to={`/detail/${film.id}?type=${film.name ? "tv" : "movie"}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                  srcSet={`
                    https://image.tmdb.org/t/p/w300/${film.poster_path} 300w,
                    https://image.tmdb.org/t/p/w500/${film.poster_path} 500w,
                    https://image.tmdb.org/t/p/w780/${film.poster_path} 780w
                  `}
                  alt={film.title || film?.name}
                  width={160}
                  height={250}
                  className={`md:w-[160px] w-[120px] md:h-[250px] rounded-lg object-cover ${
                    activeItem === index
                      ? "border-[3px] border-red-primary"
                      : ""
                  }`}
                  loading="lazy"
                />
              </Link>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 bg-red-primary hover:text-red-primary hover:bg-white transition duration-200 hover:scale-110 border-none" />
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 bg-red-primary hover:text-red-primary hover:bg-white transition duration-200 hover:scale-110 border-none" />
    </Carousel>
  );
};

export default FilmCarousel;
