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
      <h3>Notifications</h3>
      <p>
        Here you can manage your notifications. You can add, edit, delete and
        view your notifications.
      </p>
      <p>You can also manage your notifications settings.</p>
      <p>{ctx.name}</p>
    </Layout>
  );
}
