import Head from "next/head";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter clone app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}

        {/* Widgets */}

        {/* Modal */}
      </main>
    </>
  );
}
