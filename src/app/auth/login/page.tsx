import LoginForm from "@/app/components/auth/LoginForm";
import { Metadata } from "next";
import { ModeToggle } from "@/components/ModeToggle";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      {/* <div className="absolute right-4 top-4 s:z-20">
        <ModeToggle />
      </div> */}
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
