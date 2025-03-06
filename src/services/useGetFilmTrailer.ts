import { API_OPTIONS, BASE_API_URL } from "@/config";
import { FilmTrailer } from "@/types/shares";
import { useEffect, useState } from "react";

const useGetFilmTrailer = (id: number, type: string) => {
  const [filmTrailer, setFilmTrailer] = useState<FilmTrailer>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilmTrailer = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_API_URL}/${type}/${id}/videos`,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch video trailers");
        }
        const data = await response.json();

        setFilmTrailer(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch video trailers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilmTrailer();
  }, [id, type]);

  return {
    filmTrailer,
    isLoading,
    error,
  };
};

export default useGetFilmTrailer;
