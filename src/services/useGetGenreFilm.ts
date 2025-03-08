import { API_OPTIONS, BASE_API_URL } from "@/config";
import { Genre } from "@/types/shares";
import { useEffect, useState } from "react";

const useGetGenreFilm = (type: "movie" | "tv") => {
  const [genres, setGenres] = useState<Genre[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async (): Promise<void> => {
      const cacheKey = `genres_${type}`;
      const cachedGenres = localStorage.getItem(cacheKey);

      if (cachedGenres) {
        setGenres(JSON.parse(cachedGenres));
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_API_URL}/genre/${type}/list`,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch genre film");
        }
        const data = await response.json();
        setGenres(data.genres);
        localStorage.setItem(cacheKey, JSON.stringify(data.genres));
      } catch (error) {
        console.log(error);
        setError("Failed to fetch genre film");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, [type]);

  return { data: genres, isLoading, error };
};

export default useGetGenreFilm;
