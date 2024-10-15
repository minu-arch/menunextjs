import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SkeletonLoader from "@/app/components/MainComp/SkeletonLoader";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.push("/auth/login");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="mx-auto flex h-dvh w-screen items-center justify-center">
        <SkeletonLoader />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
