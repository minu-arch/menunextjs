import React from "react";
import SkeletonLoader from "../MainComp/SkeletonLoader";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";

const CustomersMain = dynamic(() => import("../MainComp/CustomersMain"), {
  loading: () => <SkeletonLoader />,
});
const OrdersMain = dynamic(() => import("../MainComp/OrdersMain"), {
  loading: () => <SkeletonLoader />,
});
const ProductsMain = dynamic(() => import("../MainComp/ProductsMain"), {
  loading: () => <SkeletonLoader />,
});
const DashMain = dynamic(() => import("../MainComp/DashMain"), {
  loading: () => <SkeletonLoader />,
});
const LogOut = dynamic(() => import("./myaccount/LogOut"), {
  loading: () => <SkeletonLoader />,
});
const MyAccount = dynamic(() => import("./myaccount/MyAccount"), {
  loading: () => <SkeletonLoader />,
});
const Settings = dynamic(() => import("./myaccount/Settings"), {
  loading: () => <SkeletonLoader />,
});

const DashboardMain = ({ currentComponent }: { currentComponent: string }) => {
  const renderComponent = () => {
    switch (currentComponent.toLowerCase()) {
      case "settings":
        return <Settings />;
      case "myaccount":
        return <MyAccount />;
      case "logout":
        return <LogOut />;
      case "dashboard":
        return <DashMain />;
      case "orders":
        return <OrdersMain />;
      case "products":
        return <ProductsMain />;
      case "customers":
        return <CustomersMain />;
      default:
        return <DashMain />;
    }
  };
  return (
    <main className="relative flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 overflow-hidden bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="absolute inset-0 overflow-hidden">
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "absolute inset-x-0 inset-y-[-30%] h-[200%] w-full skew-y-12 fill-gray-50 stroke-gray-500/30",
          )}
        />
      </div>
      <div className="relative z-10">{renderComponent()}</div>
    </main>
  );
};

export default DashboardMain;
