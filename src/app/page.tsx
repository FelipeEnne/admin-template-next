import Layout from "@/components/template/Layout";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <Layout title="Dashboard" subtitle="Overview of your workspace">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Getting started">
          <p>
            Edit <code>src/config/app.ts</code> to set the application name and
            the side menu items.
          </p>
        </Card>
        <Card title="Add a route">
          <p>
            Create <code>src/app/&lt;route&gt;/page.tsx</code> and register it
            in <code>navItems</code>.
          </p>
        </Card>
        <Card title="Build the UI">
          <p>
            Compose screens with the primitives in{" "}
            <code>src/components/ui</code>.
          </p>
        </Card>
      </div>
    </Layout>
  );
}
