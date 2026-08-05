import useAuth from "@/data/hook/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ForceAuth(jsx: React.ReactNode) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user?.email) {
      router.push("/authentication");
    }
  }, [loading, user, router]);

  function renderLoading() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white-900 "></div>
      </div>
    );
  }

  if (loading) {
    return renderLoading();
  }

  if (!user?.email) {
    return renderLoading();
  }

  return <>{jsx}</>;
}
