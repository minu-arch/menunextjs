import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";
import React from "react";
import { Metadata } from "next";
import { ModeToggle } from "@/components/ModeToggle";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ForgotPassword = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 s:px-2">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
