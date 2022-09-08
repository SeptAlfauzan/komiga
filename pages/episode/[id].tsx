import { Episode } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import NavBar from "../../components/navbar";
import { prisma } from "../../prisma/prisma";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const comicId = context.query.id;
//   const episodes: Episode = await prisma.episode.findMany({
//     where: { comicId: comicId?.toString() },
//   });
// };

const KomikId: NextPage = () => {
  return (
    <MainLayout>
      <NavBar />
      <div
        // style={{ width: "100%", height: "100%", position: "relative" }}
        className="w-[100%] h-fit relative flex justify-center"
      >
        <img
          src={"/assets/images/KOMIGA eps 1 selesai.jpg"}
          // height="100%"
          // width="100%"
          // layout="fill"
          // objectFit="contain"
          alt="_"
        />
      </div>
    </MainLayout>
  );
};

export default KomikId;
