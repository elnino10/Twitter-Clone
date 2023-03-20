import Head from "next/head";
import { Inter } from "next/font/google";
import axios from "axios";

import Sidebar from "@/components/Sidebar";
import FeedSection from "@/components/FeedSection";
import WidgetSection from "@/components/WidgetSection";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ newsData, userData }) {
  const [isAuth, setIsAuth] = useState(false)
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
        <Sidebar isAuth={isAuth} />

        {/* Feed */}
          <FeedSection isAuth={isAuth} />

        {/* Widgets */}
          <WidgetSection newsData={newsData} userData={userData} isAuth={isAuth} />

        {/* Modal */}
      </main>
    </>
  );
}

const newsBaseURL = "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";
const usersBaseURL = "https://randomuser.me/api/?results=20&inc=name,login,picture"

export const getStaticProps = async () => {
  // News data API
  const response = await axios.get(newsBaseURL);
  const newsData = response.data.articles;

  // Random users API
  const responseData = await axios.get(usersBaseURL)
  const userData = responseData.data.results

  return {
    props: {
      newsData,
      userData
    },
    revalidate: 3600 * 3,
  };
};
