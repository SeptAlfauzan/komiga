import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import LinkNav from "./Link";

const NavBar: React.FC = () => {
  const [minimize, setMinimize] = React.useState<boolean>(true);

  return (
    <nav
      className={`fixed left-0 z-10 flex gap-3 md:flex-row flex-col w-[10px] md:w-full bg-white  px-[80px] md:px-[169px] py-[60px] md:py-5 h-full md:h-fit md:shadow-none shadow-xl ${
        minimize ? " -translate-x-full" : "translate-x-0"
      } md:translate-x-0 transition-all duration-150`}
    >
      <button
        className={`fixed p-3 top-4 bg-white block md:hidden ${
          minimize ? "-right-[50px] " : "right-2 top-0 "
        }`}
        onClick={() => setMinimize(!minimize)}
      >
        <IoMenuOutline />
      </button>
      <LinkNav
        text="KOMIGA"
        href=""
        className="text-yellow-300 font-bold mr-auto"
      />
      <LinkNav text="Masuk" href="/auth" />
      {/* <LinkNav text="Buat Akun" href="" /> */}
    </nav>
  );
};

export default NavBar;
