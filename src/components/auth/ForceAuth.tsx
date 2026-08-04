import useAuth from "@/data/hook/useAuth";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function ForceAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  function renderContent() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
      if (!document.cookie.includes("admin-template-auth")) {
        window.location.href = "/authentication";
      }
    `,
            }}
          ></script>
        </Head>
        {children}
      </>
    );
  }

  function renderLoading() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white-900 "></div>
      </div>
    );
  }

  if (!loading && user?.email) {
    return renderContent();
  } else if (loading) {
    return renderLoading();
  } else {
    router.push("/authentication");
    return null;
  }
}
