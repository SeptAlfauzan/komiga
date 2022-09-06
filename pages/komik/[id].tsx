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

interface ComicData extends Comic {
  episodes: Episode[];
  genre: Genre;
  url?: string;
}

interface EpisodeWithOrder extends Episode {
  order?: number;
}
export const getServerSideProps = async (context: GetStaticPropsContext) => {
  const comic: ComicData | null = await prisma.comic.findFirst({
    where: { id: context.params!.id!.toString() },
    include: { episodes: true, genre: true },
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
  const data: ComicData = comic;

  return (
    <MainLayout>
      <NavBar />
      <div
        // style={{ width: "100%", height: "100%", position: "relative" }}
        className="w-full min-h-screen h-fit relative flex flex-col items-center"
      >
        <div className="w-full h-[60vh]  bg-gradient-to-br from-blue-500 to-pink-700 relative">
          <h3 className="absolute text-white top-28 text-center w-full text-5xl">
            GENRE GUNUNG MELETUS
          </h3>
        </div>
        <div className="flex flex-col gap-4 w-3/4 rounded min-h-[80vh] bg-white -mt-[100px] py-10 px-10 z-10">
          {data.episodes.map((data, i) => (
            <Link key={i} href="/episode/uasdaklsdasklduasd">
              <div className="flex px-2 justify-between rounded border-b-2 text-lg cursor-pointer hover:bg-blue-50 text-zinc-600">
                <p>Episode {i + 1}</p>
                <div className="text-zinc-300 text-xs">
                  {data.created.toString()}{" "}
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
