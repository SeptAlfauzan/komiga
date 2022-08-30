import { NextPage } from "next";
import React from "react";

const Dashboard: NextPage = () => {
  return (
    <div className="h-screen w-full bg-zinc-50 flex flex-row">
      <div className="md:w-1/4 h-full bg-white flex flex-col items-center py-10 px-10">
        {/* name section */}
        <>
          <div className="w-20 h-20 rounded-full bg-zinc-200 relative">
            <div className="bg-green-400 border-2 border-white w-3 h-3 rounded-full absolute bottom-0 right-[14%]" />
          </div>
          <h3 className="text-black font-bold text-lg">Admin</h3>
          <h5 className="text-zinc-300">Admin name</h5>
        </>
        {/* menu */}
        <ul className="w-full border-t-2 border-r-zinc-400 pt-10 mt-10 flex flex-col gap-4">
          <li
            className={`bg-gradient-to-br from-yellow-300 to-pink-500 py-1 px-4 rounded-full text-white`}
          >
            Dashboard
          </li>
          <li
            className={`hover:bg-gradient-to-br from-yellow-300 to-pink-500 py-1 px-4 rounded-full hover:text-white text-black bg-white duration-250 transition-all cursor-pointer`}
          >
            Komik
          </li>
          <li
            className={`hover:bg-gradient-to-br from-yellow-300 to-pink-500 py-1 px-4 rounded-full hover:text-white text-black bg-white duration-250 transition-all cursor-pointer`}
          >
            Genre
          </li>
          <li
            className={`hover:bg-gradient-to-br from-yellow-300 to-pink-500 py-1 px-4 rounded-full hover:text-white text-black bg-white duration-250 transition-all cursor-pointer`}
          >
            Admin
          </li>
          <li
            className={`hover:bg-gradient-to-br from-yellow-300 to-pink-500 py-1 px-4 rounded-full hover:text-white text-black bg-white duration-250 transition-all cursor-pointer`}
          >
            Logout
          </li>
        </ul>
      </div>
      <div className="md:w-3/4 h-fit overflow-y-scroll flex flex-wrap px-[100px] py-10 gap-10 items-center">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

const Card: React.FC = () => {
  return (
    <div className="md:w-[300px] h-fit py-5 rounded-lg bg-gradient-to-br from-yellow-300 to-pink-500 text-white flex flex-col px-10">
      <h3 className="text-3xl">Title</h3>
      <h5 className="font-bold text-5xl self-end">10000</h5>
    </div>
  );
};

export default Dashboard;
