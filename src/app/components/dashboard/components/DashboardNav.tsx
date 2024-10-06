import React from "react";
import Link from "next/link";
import { Package2 } from "lucide-react";

const DashboardNav = ({
  setCurrentComponent,
}: {
  setCurrentComponent: (component: string) => void;
}) => {
  const handleNavClick = (component: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentComponent(component);
  };

  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="size-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <Link
        href="#"
        onClick={handleNavClick("Dashboard")}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>
      <Link
        href="#"
        onClick={handleNavClick("Orders")}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Orders
      </Link>
      <Link
        href="#"
        onClick={handleNavClick("Products")}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Products
      </Link>
      <Link
        href="#"
        onClick={handleNavClick("Customers")}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Customers
      </Link>
    </nav>
  );
};

export default DashboardNav;
