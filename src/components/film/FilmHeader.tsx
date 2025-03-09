import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput";
import { ChevronsRight } from "lucide-react";

interface BaseProps {
  title: string;
  isUseDefaultSearch: boolean;
  children?: React.ReactNode;
}

interface WithSearchProps extends BaseProps {
  isUseDefaultSearch: true;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  redirectLink: string;
}

interface WithoutSearchProps extends BaseProps {
  isUseDefaultSearch: false;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  redirectLink?: string;
}

type FilmHeaderProps = WithSearchProps | WithoutSearchProps;

const FilmHeader: React.FC<FilmHeaderProps> = ({
  title,
  searchTerm,
  setSearchTerm,
  isUseDefaultSearch,
  redirectLink,
  children,
}) => {
  return (
    <div>
      {isUseDefaultSearch && (
        <div className="flex items-center justify-center">
          <SearchInput
            searchTerm={searchTerm ?? ""}
            onSearchChange={setSearchTerm ?? (() => {})}
          />
        </div>
      )}
      <div className="flex md:flex-row flex-col justify-between items-center gap-3">
        <h2 className="text-2xl font-bold text-white sm:text-3xl text-left">
          {title}
        </h2>
        <div className="flex md:flex-row flex-col items-center gap-2 md:w-fit w-full">
          {children ? (
            children
          ) : (
            <Link
              to={redirectLink ?? "/"}
              className="flex items-center gap-1 md:text-lg text-md text-white font-semibold hover:text-red-primary hover:mr-2 transition-all duration-200"
            >
              See All <ChevronsRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmHeader;
