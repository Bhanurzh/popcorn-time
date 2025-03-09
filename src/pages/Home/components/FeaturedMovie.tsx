import FilmHeader from "@/components/film/FilmHeader";
import FilmList from "@/components/film/FilmList";
import useGetFilms from "@/services/useGetFilms";
import { FilmListResponse } from "@/types/apiResponse";
import { useState } from "react";

const FeaturedMovie = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, error } = useGetFilms(searchTerm, "movie");

  return (
    <div className="flex flex-col space-y-4 py-10 px-5 w-full">
      <FilmHeader
        title="Featured Movie"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isUseDefaultSearch={true}
        redirectLink="/movie"
      />
      <FilmList
        data={data as FilmListResponse}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default FeaturedMovie;
