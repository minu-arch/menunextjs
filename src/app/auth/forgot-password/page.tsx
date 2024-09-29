import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ForgotPassword = () => {
  return (
    <div className="s:px-2 flex h-screen w-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
