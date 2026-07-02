"use client";

import Layout from "@/components/template/Layout";
import useAppData from "@/data/hook/useAppData";

export default function Notifications() {
  const ctx = useAppData();

  return (
    <Layout
      title="Notifications"
      subtitle="Here you can manage your notifications"
    >
      <button onClick={ctx.changeTheme}>Change Theme</button>
    </Layout>
  );
}
