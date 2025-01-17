import Login from "@/app/auth/login/page";
import { Metadata } from "next";
import { ModeToggle } from "@/components/ModeToggle";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: "https://minufy.site/api/og?v=${Date.now()}",
        width: 1000,
        height: 630,
      },
    ],
  },
  twitter: {
    title: "Minu | Web Developer",
    description: "Professional web developer specializing in React and Next.js",
    images: ["https://minufy.site/api/og"],
  },
};

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      {/* <div className="absolute right-4 top-4 s:z-20">
        <ModeToggle />
      </div> */}
      <div className="relative z-10">
        <Login />
      </div>
    </div>
  );
}
