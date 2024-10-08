"use client";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import DashboardMain from "@/app/components/dashboard/DashboardMain";
import { useState } from "react";

const DashboardHome = () => {
  const [currentComponent, setCurrentComponent] = useState("dashboard");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader setCurrentComponent={setCurrentComponent} />
      <DashboardMain currentComponent={currentComponent} />
    </div>
  );
};

export default DashboardHome;
