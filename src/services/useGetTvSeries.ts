import { API_OPTIONS, BASE_API_URL } from "@/config";
import { FilmListResponse } from "@/types/apiResponse";
import { useEffect, useState } from "react";

const useGetTvSeries = () => {
  const [tvSeries, setTvSeries] = useState<FilmListResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTvSeries = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_API_URL}/tv/airing_today`,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tv series");
        }
        const data = await response.json();
        setTvSeries(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch tv series");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTvSeries();
  }, []);

  return { data: tvSeries, isLoading, error };
};

export default useGetTvSeries;
