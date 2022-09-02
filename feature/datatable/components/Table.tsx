import React, { useMemo, useState } from "react";
import DataTable, { TableColumn, TableProps } from "react-data-table-component";
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
    <DataTable {...rest} data={result} subHeaderComponent={subHeaderComp} />
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
    <div className="flex gap-3 items-end w-full">
      <h3 className="mr-auto font-bold">{title}</h3>
      <label className="text-zinc-300">Search Data</label>
      <input
        type="text"
        className="border rounded-full px-8 py-0.5"
        onChange={onFilter}
      />
      <button onClick={onClear}>clear</button>
    </div>
  );
};

export default Table;
