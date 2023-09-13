import { Comic, Episode, Genre } from "@prisma/client";
import {
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import NavBar from "../../components/navbar";
import { prisma } from "../../prisma/prisma";
import { formatDate } from "../../utils/date";

interface ComicData extends Comic {
  episodes: Episode[];
  genre: Genre;
  url?: string;
}

interface EpisodeWithOrder extends Episode {
  order?: number;
}

interface ComicData extends Episode {
  comic: Comic;
}

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  const comic = await prisma.episode.findMany({
    where: {
      comicId: context.params!.id!.toString(),
      NOT: { created: "1000-10-10T00:00:00.000Z" },
    },
    include: { comic: true },
    orderBy: {
      created: "asc",
    },
  });

  return {
    props: {
      comic: JSON.parse(JSON.stringify(comic)),
    },
  };
};

function KomikId({
  comic,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data: (Episode & { comic: Comic })[] = comic;

  return (
    <MainLayout>
      <NavBar />
      <div
        // style={{ width: "100%", height: "100%", position: "relative" }}
        className="w-full min-h-screen h-fit relative flex flex-col items-center"
      >
        <div className="w-full h-[60vh]  bg-gradient-to-br from-blue-500 to-pink-700 relative">
          <Image
            src={data[0].comic.bannerImage || ""}
            alt={`${data[0].comic.name}-banner-image`}
            objectFit="cover"
            layout="fill"
          />
          <div className="absolute text-white top-28 text-center w-full ">
            <h3 className="text-5xl">{data[0].comic.name}</h3>
            <p>{data[0].comic.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-3/4 rounded min-h-[80vh] bg-white -mt-[100px] py-10 px-10 z-10">
          {data.map((data, i) => (
            <Link key={i} href={`/komik/${data.comicId}/${data.id}`}>
              <div className="flex px-2 justify-between rounded border-b-2 text-lg cursor-pointer hover:bg-blue-50 text-zinc-600">
                <p>Episode {i + 1}</p>
                <div className="text-zinc-300 text-xs">
                  {formatDate(data.created.toString())}{" "}
                  <span className="text-black text-lg">#{i + 1}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default KomikId;
