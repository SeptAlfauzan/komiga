import { getCookie } from "cookies-next";
import { NextPage } from "next";
import React from "react";
import SideBar from "../../../components/dashboard/Sidebar";
import { useAuth } from "../../../feature/auth/hook/useAuth";

const Dashboard: NextPage = () => {
  const { auth, logout } = useAuth();

  React.useEffect(() => {
    const check = async () => {
      const token = getCookie("tokenAuth");
      await auth(token?.toString() || "");
    };
    check();
  }, []);

  return (
    <div className="h-screen w-full bg-zinc-50 flex flex-row">
      <SideBar />
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
