import { Episode, Panel } from "@prisma/client";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import FlipBookWrapper from "../../components/FilpBookWrapper";
import MainLayout from "../../components/layouts/MainLayout";
import NavBar from "../../components/navbar";
import { useRefetch } from "../../hooks/useRefetch";
import { prisma } from "../../prisma/prisma";

interface EpisodeWithPanels {
  panels: Panel[];
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // const comicId = context.query.id;
  if (!Array.isArray(context.query.slug) && context.query.slug?.length !== 2)
    return { notFound: true };

  const [comicId, episodeId] = Array.from(context.query.slug);

  const episodes: Episode[] = await prisma.episode.findMany({
    where: { comicId: comicId?.toString() },
  });
  const selectedEpisodes: EpisodeWithPanels | null =
    await prisma.episode.findFirst({
      where: { comicId: comicId?.toString(), id: episodeId },
      include: { panels: true },
    });

  if (episodes.length === 0 || !selectedEpisodes) return { notFound: true };

  return {
    props: {
      comicId,
      episodeId,
      episodes: JSON.stringify(episodes),
      selectedEpisodes: JSON.stringify(selectedEpisodes),
    },
  };
};

function KomikId({
  comicId,
  episodeId,
  episodes,
  selectedEpisodes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [listEpisodes, setListEpisodes] = React.useState<Episode[]>(
    JSON.parse(episodes)
  );
  const [selectedEp, setSelectedEp] = React.useState<EpisodeWithPanels>(
    JSON.parse(selectedEpisodes)
  );

  const currentEpisodeIndex = listEpisodes
    .map((ep) => ep.id)
    .indexOf(episodeId);

  const previousEpisodeId =
    currentEpisodeIndex !== 0 ? listEpisodes[currentEpisodeIndex - 1].id : null;
  const nextEpisodeId =
    currentEpisodeIndex !== listEpisodes.length - 1
      ? listEpisodes[currentEpisodeIndex + 1].id
      : null;

  console.log(currentEpisodeIndex, listEpisodes.length);
  return (
    <MainLayout>
      <NavBar />
      <div className="w-[100%] min-h-screen relative flex justify-center pt-[100px]">
        {/* <img
          src={selectedEp.panels[0].imageURL}
          // height="100%"
          // width="100%"
          // layout="fill"
          // objectFit="contain"
          alt="_"
        /> */}
        <FlipBookWrapper
          isFirstEp={true}
          isLastEp={false}
          imagesUrl={selectedEp.panels.map((panel, i) => panel.imageURL)}
        >
          <div className="flex flex-col gap-3 items-center justify-center mt-[50%]">
            {currentEpisodeIndex === 0 ? null : (
              <LinkButton
                url={`/komik/${comicId}/${previousEpisodeId}`}
                label="Baca episode sebelumnya"
              />
            )}
            {listEpisodes.length - 1 > currentEpisodeIndex ? (
              <LinkButton
                url={`/komik/${comicId}/${nextEpisodeId}`}
                label="Baca episode selanjutnya"
              />
            ) : null}
          </div>
        </FlipBookWrapper>
      </div>
    </MainLayout>
  );
}

interface LinkButtonProps {
  label: string;
  url: string;
}
const LinkButton: React.FC<LinkButtonProps> = ({ label, url }) => {
  return (
    <a href={url}>
      <button className="bg-black text-white px-5 rounded-full w-fit py-1">
        {label}
      </button>
    </a>
  );
};

export default KomikId;
