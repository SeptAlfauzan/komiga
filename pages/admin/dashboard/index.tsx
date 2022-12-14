import { NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import { TableColumn } from "react-data-table-component";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { DataRow } from "../../../constants/interface";
import Table from "../../../feature/datatable/components/Table";
import { prisma } from "../../../prisma/prisma";

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
  const countComics = (await prisma.comic.findMany()).length;
  const countGenre = (await prisma.genre.findMany()).length;

  return {
    props: {
      rawData,
      countComics,
      countGenre,
    }, // will be passed to the page component as props
    revalidate: 2,
  };
};

function Dashboard({
  rawData,
  countComics,
  countGenre,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <DashboardLayout>
      <div className="h-fit flex flex-wrap gap-10">
        <Card url={"/admin/komik"} num={countComics} title="Komik" />
        <Card url={"/admin/genre"} num={countGenre} title="Genre" />
      </div>
      <>
        {/* <Table
          title="Admin Log"
          data={rawData}
          columns={columns}
          pagination
          subHeader
        /> */}
      </>
    </DashboardLayout>
  );
}
interface Card {
  num: number;
  title: string;
  url: string;
}
const Card: React.FC<Card> = ({ num, title, url }) => {
  return (
    <Link href={url}>
      <div className="w-full md:w-[300px] h-fit py-5 rounded-lg bg-gradient-to-br from-yellow-300 to-pink-500 text-white flex flex-col px-10 hover:scale-105 transition-all cursor-pointer">
        <h3 className="text-3xl">{title}</h3>
        <h5 className="font-bold text-5xl self-end">{num}</h5>
      </div>
    </Link>
  );
};

export default Dashboard;
