import { getCookie } from "cookies-next";
import { NextPage } from "next";
import React, { ReactNode } from "react";
import SideBar from "../../components/dashboard/Sidebar";
import { useAuth } from "../../feature/auth/hook/useAuth";

interface Props {
  children: ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
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
      <div className="w-screen md:w-3/4 min-h-screen overflow-y-scroll flex flex-wrap px-10 md:px-[100px] py-10 gap-10">
        {children}
      </div>
    </div>
  );
};
export default DashboardLayout;
