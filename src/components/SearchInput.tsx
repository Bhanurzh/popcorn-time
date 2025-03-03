import { Search, X } from "lucide-react";
import { Input } from "./ui/input";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchInput = ({ searchTerm, onSearchChange }: SearchInputProps) => {
  return (
    <div className="relative w-full md:w-[300px]">
      <Input
        type="search"
        placeholder="Search movies..."
        className="md:w-[300px] w-full placeholder:text-white text-white font-semibold px-4 py-6 rounded-xl border-2 border-red-primary focus:shadow-[0_0_15px_#aa1d1d]"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm ? (
        <X
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
          onClick={() => onSearchChange("")}
        />
      ) : (
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
      )}
    </div>
  );
};

export default SearchInput;
