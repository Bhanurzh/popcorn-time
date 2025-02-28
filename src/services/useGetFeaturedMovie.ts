import { API_OPTIONS, BASE_API_URL } from "@/config";
import { FilmListResponse } from "@/types/apiResponse";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

const useGetFeaturedMovie = (searchTerm: string) => {
  const [featuredMovie, setFeaturedMovie] = useState<FilmListResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchFeaturedMovie = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = debouncedSearchTerm
          ? await fetch(
              `${BASE_API_URL}/search/movie?query=${encodeURIComponent(
                debouncedSearchTerm
              )}`,
              API_OPTIONS
            )
          : await fetch(
              `${BASE_API_URL}/discover/movie?sort_by=popularity.desc`,
              API_OPTIONS
            );
        if (!response.ok) {
          throw new Error("Failed to fetch featured movies");
        }
        const data = await response.json();
        setFeaturedMovie(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch featured movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedMovie();
  }, [debouncedSearchTerm]);

  return { data: featuredMovie, isLoading, error };
};

export default useGetFeaturedMovie;
