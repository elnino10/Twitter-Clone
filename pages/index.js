import Head from "next/head";
import { Inter } from "next/font/google";
import axios from "axios";

import Sidebar from "@/components/Sidebar";
import FeedSection from "@/components/FeedSection";
import WidgetSection from "@/components/WidgetSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ propData }) {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter clone app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen mx-auto relative">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
          <FeedSection />

        {/* Widgets */}
          <WidgetSection propData={propData} />

        {/* Modal */}
      </main>
    </>
  );
}

const baseURL = "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";

export const getStaticProps = async () => {
  // fetch data from API
  const response = await axios.get(baseURL);
  const propData = response.data.articles;

  return {
    props: {
      propData,
    },
    revalidate: 3600 * 3,
  };
};
