import useAuth from "@/data/hook/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { appConfig } from "@/config/app";
import Spinner from "@/components/ui/Spinner";

export default function ForceAuth(jsx: React.ReactNode) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user?.email) {
      router.push(appConfig.loginRoute);
    }
  }, [loading, user, router]);

  function renderLoading() {
    return (
      <div className="flex items-center justify-center h-screen text-brand">
        <Spinner />
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
