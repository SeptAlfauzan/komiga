import React, { useMemo, useState, ReactNode } from "react";
import DataTable, { TableColumn, TableProps } from "react-data-table-component";
import { useFilter } from "../hooks/useFilter";
import FilterComponent from "./SearchHeader";

interface Table extends TableProps<any> {
  columns: TableColumn<any>[];
  data: any[];
  title: string;
  subheaderChildren?: ReactNode;
}
const Table: React.FC<Table> = (props) => {
  const { subHeaderComponent, data, title, subheaderChildren, ...rest } = props;
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
      >
        {subheaderChildren}
      </FilterComponent>
    );
  }, [filterText, resetPaginationToggle, title]);

  return (
    <div className="w-full border relative overflow-x-scroll">
      <DataTable {...rest} data={result} subHeaderComponent={subHeaderComp} />
    </div>
  );
};

export default Table;
