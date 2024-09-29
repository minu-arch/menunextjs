import Login from "@/app/auth/login/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <Login />
    </div>
  );
}
