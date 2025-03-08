import { API_OPTIONS, BASE_API_URL } from "@/config";
import { FilmListResponse } from "@/types/apiResponse";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

const useGetFilms = (
  searchTerm: string,
  type: "movie" | "tv",
  page: number = 1,
  genreId: string = ""
) => {
  const [films, setFilms] = useState<FilmListResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchFilms = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = debouncedSearchTerm
          ? await fetch(
              `${BASE_API_URL}/search/${type}?query=${encodeURIComponent(
                debouncedSearchTerm
              )}`,
              API_OPTIONS
            )
          : await fetch(
              `${BASE_API_URL}/discover/${type}?sort_by=popularity.desc&page=${page}&with_genres=${genreId}`,
              API_OPTIONS
            );
        if (!response.ok) {
          throw new Error("Failed to fetch list film");
        }
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch list film");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, [debouncedSearchTerm, page, type, genreId]);

  return { data: films, isLoading, error };
};

export default useGetFilms;
