import SignUpForm from "@/app/components/auth/SignUpForm";
import React from "react";
import { Metadata } from "next";
import { ModeToggle } from "@/components/ModeToggle";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUp = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-2">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
