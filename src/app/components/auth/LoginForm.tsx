"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Starea pentru erori
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("https://menunextjs.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message); // Afișează mesajul de succes
      router.push("../../dashboard"); // Redirect sau alte acțiuni după autentificare reușită
    } else {
      const errorData = await response.json();
      setError(errorData.error); // Setează mesajul de eroare
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(""); // Resetează mesajul de eroare
  };

  return (
    <div className="relative mx-auto size-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="relative z-10 flex items-center justify-center py-12 s:rounded-md lg:rounded-none">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/paint.jpeg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="opacity-60 s:rounded-md lg:rounded-none"
          />
        </div>
        <div className="relative z-10 mx-auto grid w-[350px] gap-6 px-5">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-popover-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          {error && <div className="text-neutral-900">{error}</div>}{" "}
          {/* Afișează mesajul de eroare */}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="placeholder:text-popover-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="../auth/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="../auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/img/nature.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="size-full object-cover backdrop-blur-md dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginForm;
