import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import React from "react";

interface Option {
  id: string | number;
  name: string;
}

interface DropdownInputProps {
  value: string;
  onChange: (value: string) => void;
  optionPlaceHoler: string;
  options?: Option[];
  optionLabel: string;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  value,
  onChange,
  optionPlaceHoler,
  options,
  optionLabel,
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        aria-label={optionPlaceHoler}
        className={`px-4 py-6 border-red-primary border-[1.5px] text-white font-semibold focus-visible:border-white rounded-xl md:w-fit w-full`}
      >
        <SelectValue placeholder={optionPlaceHoler} />
      </SelectTrigger>
      <SelectContent className="text-white border-red-primary bg-dark-gray border-1">
        <SelectGroup>
          <SelectLabel>{optionLabel}</SelectLabel>
          {options?.map((item) => (
            <SelectItem
              key={item.id}
              value={`${item.id}`}
              className="cursor-pointer font-semibold"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DropdownInput;
