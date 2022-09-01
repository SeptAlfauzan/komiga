import { NextPage } from "next";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DataTable, { TableColumn } from "react-data-table-component";

interface DataRow {
  key: number;
  title: string;
  year: string;
}

const data = [
  {
    key: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    key: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    key: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

const Comic: NextPage = () => {
  const columns: TableColumn<DataRow>[] = [
    {
      name: "Title",
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row: any) => row.year,
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full h-fit flex flex-wrap gap-10">
        <DataTable columns={columns} data={data} pagination subHeader />
      </div>
    </DashboardLayout>
  );
};

export default Comic;
