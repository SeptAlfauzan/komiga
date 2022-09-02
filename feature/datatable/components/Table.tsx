import React, { useMemo, useState } from "react";
import DataTable, { TableColumn, TableProps } from "react-data-table-component";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useFilter } from "../hooks/useFilter";

interface Table extends TableProps<any> {
  columns: TableColumn<any>[];
  data: any[];
  title: string;
}
const Table: React.FC<Table> = (props) => {
  const { subHeaderComponent, data, title, ...rest } = props;
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [result] = useFilter(data, filterText);

  const subHeaderComp = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        title={title}
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="w-full border relative overflow-x-scroll">
      <DataTable {...rest} data={result} subHeaderComponent={subHeaderComp} />
    </div>
  );
};

interface SearchProps {
  onFilter: (arg: any) => void;
  onClear: () => void;
  filterText: string;
  title: string;
}

const FilterComponent: React.FC<SearchProps> = ({
  onFilter,
  onClear,
  title,
  filterText,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-end w-full py-5">
      <h3 className="mr-auto font-bold">{title}</h3>
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

export default Table;
