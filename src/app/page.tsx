import Layout from "@/components/template/Layout";

export default function Home() {
  return (
    <Layout title="Initial page" subtitle="Building the template">
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-50">
        <h1 className="text-3xl font-semibold text-zinc-900">Initial page</h1>
        <p className="mt-2 text-zinc-600">Building the template</p>
      </div>
    </Layout>
  );
}
