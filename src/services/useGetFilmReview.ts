import { API_OPTIONS, BASE_API_URL } from "@/config";
import { FilmReviewResponse } from "@/types/apiResponse";
import { useEffect, useState } from "react";

const useGetFilmReview = (id: number, type: string) => {
  const [filmReview, setFilmReview] = useState<FilmReviewResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilmReview = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_API_URL}/${type}/${id}/reviews`,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch similar movies");
        }
        const data = await response.json();

        setFilmReview(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch similar movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilmReview();
  }, [id, type]);

  return {
    filmReview,
    isLoading,
    error,
  };
};

export default useGetFilmReview;
