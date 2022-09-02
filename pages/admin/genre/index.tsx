import { InferGetStaticPropsType } from "next";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { TableColumn } from "react-data-table-component";
import { DataRow } from "../../../constants/interface";
import Table from "../../../feature/datatable/components/Table";

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
  {
    name: "Action",
    button: true,
    cell: (row) => (
      <div className="flex flex-col gap-2 py-2">
        <button className="bg-violet-600 rounded-full px-4 text-white hover:scale-105 transition-all duration-150">
          edit
        </button>
        <button className="bg-pink-600 rounded-full px-4 text-white hover:scale-105 transition-all duration-150">
          delete
        </button>
      </div>
    ),
  },
];

export const getStaticProps = async () => {
  const rawData: DataRow[] = [
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
  return {
    props: {
      rawData,
    }, // will be passed to the page component as props
  };
};

function Genre({ rawData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <DashboardLayout>
      <div className="w-full h-fit flex flex-wrap gap-10">
        <Table
          title="Genre"
          data={rawData}
          columns={columns}
          pagination
          subHeader
        />
      </div>
    </DashboardLayout>
  );
}

export default Genre;
