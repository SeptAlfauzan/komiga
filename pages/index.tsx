import React from "react";
import type { InferGetServerSidePropsType, NextPage } from "next";
import MainLayout from "../components/layouts/MainLayout";
import Image from "next/image";
import CardThumbnail from "../components/CardThumbnail";
import NavBar from "../components/navbar";
import { Comic, Genre } from "@prisma/client";
import { prisma } from "../prisma/prisma";

interface ComicWithGenre extends Comic {
  genre: Genre;
}

export const getServerSideProps = async () => {
  const comics: ComicWithGenre[] = await prisma.comic.findMany({
    include: { genre: true },
  });

  return {
    props: {
      comics,
    },
  };
};

function Home({
  comics,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [items, setItems] = React.useState<(ComicWithGenre | undefined)[]>(
    comics || []
  );

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input: string = event.target.value.toLowerCase();

    if (event.target.value === "") return setItems(comics);
    return setItems(
      comics.map((comic: ComicWithGenre, i: number) => {
        if (comic.genre.name.toLowerCase().includes(input)) return comic;
      })
    );
  };
  console.log(items);
  return (
    <MainLayout>
      <NavBar />
      <section className="h-screen flex w-full pt-[100px] md:pt-[170px] px-[50px] md:px-[169px] relative">
        <div className="w-full md:w-1/2 h-full flex flex-col gap-[30px] z-10">
          <h3 className="text-3xl md:text-4xl font-semibold leading-relaxed">
            KOMIGA, media pembelajaran pengenalan bencana
          </h3>
          <p className="text-lg font-light">
            Belajar bisa dibuat dengan menyenangkan.
          </p>
          <a href="#comics">
            <button className="text-white px-8 py-2 rounded-full w-fit bg-blue-500">
              Mulai Baca
            </button>
          </a>
        </div>
        <div className="w-[200px] md:w-1/2 md:h-full h-4/5 absolute md:relative right-0 md:opacity-100 opacity-30">
          <Banner />
        </div>
      </section>
      <section
        id="comics"
        className="min-h-screen flex flex-col w-full  bg-yellow-300 px-[50px] md:px-[169px] py-[100px] relative"
      >
        <h3 className="text-4xl mb-10">Daftar Komik</h3>
        <input
          className="border px-3 py-1 rounded-full"
          type="text"
          onChange={handleFilter}
        />
        <div className="flex w-full flex-wrap gap-[2.5%] relative">
          {items.map((data: ComicWithGenre | undefined, i: number) => {
            if (data !== undefined)
              return <CardThumbnail url={`/komik/${data?.id}`} key={i} />;
          })}
          {items.length === 1 && items[0] === undefined ? "HAH KOSONG?!" : null}
        </div>
      </section>
    </MainLayout>
  );
}

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-clip">
      <div className="h-[333px] w-[333px] rounded-full bg-blue-500 absolute top-0 left-0" />
      <div className="h-[333px] w-[333px] rounded-full bg-yellow-300 absolute bottom-10 right-10" />
      <div className="absolute translate-x-[50%] translate-y-[15%] w-[200px] h-[300px] md:block hidden rounded-lg overflow-clip">
        <Image
          src={"/assets/images/cover gunung meletus fix.jpg"}
          alt="image banner"
          layout={"fill"}
          objectFit={"cover"}
        />
      </div>
    </div>
  );
};

export default Home;
