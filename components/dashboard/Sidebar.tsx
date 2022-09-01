import React from "react";
import { useAppSelector } from "../../app/hooks";

import { IoMenuOutline } from "react-icons/io5";
import { useAuth } from "../../feature/auth/hook/useAuth";

const SideBar: React.FC = () => {
  const admin = useAppSelector((state) => state.auth.value);
  const [minimize, setMinimize] = React.useState<boolean>(true);
  const { logout } = useAuth();

  return (
    <nav
      className={` fixed md:relative ${
        minimize ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 duration-300 transition-all md:w-1/4 h-full bg-white flex flex-col items-center py-10 px-10`}
    >
      <button
        className={`absolute md:hidden p-2 bg-white rounded z-10 top-5 ${
          minimize ? "right-5" : "-right-10"
        }`}
        onClick={() => setMinimize(!minimize)}
      >
        <IoMenuOutline />
      </button>
      {/* name section */}
      <>
        <div className="w-20 h-20 rounded-full bg-zinc-200 relative">
          <div className="bg-green-400 border-2 border-white w-3 h-3 rounded-full absolute bottom-0 right-[14%]" />
        </div>
        <h3 className="text-black font-bold text-lg capitalize">
          {admin.username || "No Username"}
        </h3>
        <h5 className="text-zinc-300">{admin.username}</h5>
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
          onClick={logout}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
