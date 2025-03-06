import { API_OPTIONS, BASE_API_URL } from "@/config";
import { FilmListResponse } from "@/types/apiResponse";
import { useEffect, useState } from "react";

const useGetSimilarFilm = (id: number, type: string) => {
  const [similarFilm, setSimilarFilm] = useState<FilmListResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarFilm = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_API_URL}/${type}/${id}/similar`,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch similar movies");
        }
        const data = await response.json();

        setSimilarFilm(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch similar movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarFilm();
  }, [id, type]);

  return {
    similarFilm,
    isLoading,
    error,
  };
};

export default useGetSimilarFilm;
