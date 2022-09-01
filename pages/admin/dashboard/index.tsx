import { NextPage } from "next";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <div className="h-fit flex flex-wrap gap-10">
        <Card />
        <Card />
        <Card />
      </div>
    </DashboardLayout>
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
