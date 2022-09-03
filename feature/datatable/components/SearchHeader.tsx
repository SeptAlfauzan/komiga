import React, { ReactNode } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

interface SearchProps {
  onFilter: (arg: any) => void;
  onClear: () => void;
  filterText: string;
  title: string;
  children?: ReactNode;
}

const FilterComponent: React.FC<SearchProps> = ({
  onFilter,
  onClear,
  title,
  children,
  filterText,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-end w-full py-5">
      <div className=" flex justify-between mr-auto gap-3">
        <h3 className="mr-auto font-bold">{title}</h3>
        {children}
      </div>
      <div className="relative w-fit h-fit">
        <input
          placeholder="Cari data"
          type="text"
          className="border rounded-full px-8 py-0.5 w-full"
          onChange={onFilter}
        />
        <button
          className=" text-zinc-400 absolute right-5 h-full hover:text-zinc-900 hover:scale-125 z-10"
          onClick={onClear}
        >
          <IoCloseCircleOutline />
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
