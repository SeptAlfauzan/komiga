import { NextPage, InferGetStaticPropsType } from "next";
import React from "react";
import { TableColumn } from "react-data-table-component";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
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

function Dashboard({
  rawData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <DashboardLayout>
      <div className="h-fit flex flex-wrap gap-10">
        <Card />
        <Card />
        <Card />
      </div>
      <>
        <Table
          title="Admin Log"
          data={rawData}
          columns={columns}
          pagination
          subHeader
        />
      </>
    </DashboardLayout>
  );
}

const Card: React.FC = () => {
  return (
    <div className="md:w-[300px] h-fit py-5 rounded-lg bg-gradient-to-br from-yellow-300 to-pink-500 text-white flex flex-col px-10">
      <h3 className="text-3xl">Title</h3>
      <h5 className="font-bold text-5xl self-end">10000</h5>
    </div>
  );
};

export default Dashboard;
