import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import NavBar from "../../components/navbar";

const KomikId: NextPage = () => {
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
        <div className=" w-3/4 rounded min-h-[80vh] bg-white -mt-[100px] py-10 px-10 z-10">
          {new Array(1).fill(undefined).map((data, i) => (
            <Link key={i} href="/episode/uasdaklsdasklduasd">
              <div className="flex justify-between border-b-2 text-lg cursor-pointer">
                <p>Episode {i + 1}</p>
                <p className="text-zinc-300">
                  2022-09-05 <span className="text-black">#{i + 1}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default KomikId;
