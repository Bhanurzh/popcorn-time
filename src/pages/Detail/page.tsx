import { Suspense, lazy } from "react";
import SuspenseLoader from "@/components/SuspenseLoader";
import { useParams, useSearchParams } from "react-router-dom";

const FilmDetailSection = lazy(
  () => import("@/pages/Detail/components/FilmDetail")
);
const FilmReview = lazy(() => import("@/pages/Detail/components/FilmReview"));
const SimilarFilm = lazy(() => import("@/pages/Detail/components/SimilarFilm"));

const Detail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("type") ?? "";

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="bg-dark-primary w-full flex flex-col">
        <section id="movie-detail" aria-labelledby="detail-heading">
          <h2 id="detail-heading" className="sr-only">
            Movie Detail
          </h2>
          <FilmDetailSection id={Number(id)} query={query} />
        </section>

        <section>
          <h2 id="review-heading" className="sr-only">
            Review Section
          </h2>
          <FilmReview id={Number(id)} query={query} />
        </section>

        <section id="similar-movies" aria-labelledby="similar-heading">
          <h2 id="similar-heading" className="sr-only">
            Similar Movies
          </h2>
          <SimilarFilm id={Number(id)} query={query} />
        </section>
      </div>
    </Suspense>
  );
};

export default Detail;
