"use client";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import DashboardMain from "@/app/components/dashboard/DashboardMain";
import { useState } from "react";
import AuthWrapper from "@/app/utils/AuthWrapper";

const DashboardHome = () => {
  const [currentComponent, setCurrentComponent] = useState("dashboard");

  return (
    <AuthWrapper>
      <div className="flex min-h-screen w-full flex-col">
        <DashboardHeader setCurrentComponent={setCurrentComponent} />
        <DashboardMain currentComponent={currentComponent} />
      </div>
    </AuthWrapper>
  );
};

export default DashboardHome;
