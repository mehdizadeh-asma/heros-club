import Head from "next/head";

import DashboardLayout from "@/components/UI/Dashbords/DashboardLayout";

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Heros Club Administrator Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DashboardLayout />
      </main>
    </div>
  );
}
