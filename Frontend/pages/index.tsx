import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Heros Club</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/admin">go to admin dashborad</Link>
      </main>
    </div>
  );
}
