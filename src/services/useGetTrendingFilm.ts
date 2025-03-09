import { API_OPTIONS, BASE_API_URL } from "@/config";
import { FilmListResponse } from "@/types/apiResponse";
import { useEffect, useState } from "react";

const useGetTrendingFilm = (
  page: number = 1,
  trendingType: string,
  trendingPeriod: string
) => {
  const [trendingFilm, setTrendingFilm] = useState<FilmListResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingFilm = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_API_URL}/trending/${trendingType}/${trendingPeriod}?page=${page}`,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch trending movies");
        }
        const data = await response.json();
        setTrendingFilm(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch trending movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingFilm();
  }, [page, trendingType, trendingPeriod]);

  return { data: trendingFilm, isLoading, error };
};

export default useGetTrendingFilm;
