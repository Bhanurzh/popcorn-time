import { API_OPTIONS, BASE_API_URL } from "@/config";
import { FilmListResponse } from "@/types/apiResponse";
import { useEffect, useState } from "react";

const useGetUpComingFilm = () => {
  const [upComingFilm, setUpComingFilm] = useState<FilmListResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpComingFilm = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_API_URL}/movie/upcoming`,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch up coming movies");
        }
        const data = await response.json();
        setUpComingFilm(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch up coming movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpComingFilm();
  }, []);

  return { data: upComingFilm, isLoading, error };
};

export default useGetUpComingFilm;
