"use client";

import Layout from "@/components/template/Layout";
import useAppData from "@/data/hook/useAppData";

export default function Profile() {
  const ctx = useAppData();

  return (
    <Layout title="Profile" subtitle="Here you can manage your profile">
      <h1>Profile</h1>
    </Layout>
  );
}
