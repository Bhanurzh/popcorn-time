import { API_OPTIONS, BASE_API_URL } from "@/config";
import { MovieDetails } from "@/types/movie";
import { TvSeriesDetails } from "@/types/tvSeries";
import { useEffect, useState } from "react";

const useGetDetailFilm = (id: number, type: string) => {
  const [detailMovie, setDetailMovie] = useState<MovieDetails>();
  const [detailTvSeries, setDedetailTvSeries] = useState<TvSeriesDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailFilm = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_API_URL}/${type}/${id}`,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch detail movie or tv series");
        }
        const data = await response.json();

        if (type === "movie") {
          setDetailMovie(data);
        } else if (type === "tv") {
          setDedetailTvSeries(data);
        }
      } catch (error) {
        console.log(error);
        setError("Failed to fetch detail movie or tv series");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailFilm();
  }, [id, type]);

  return {
    detailMovie,
    detailTvSeries,
    isLoading,
    error,
  };
};

export default useGetDetailFilm;
