import PostPage from "@/components/PostPage";
import axios from "axios";
import React from "react";

const postPage = ({ newsData, userData }) => {
  return (
    <div>
      <PostPage newsData={newsData} userData={userData} />
    </div>
  );
};

export default postPage;

const newsBaseURL =
  "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";
const usersBaseURL =
  "https://randomuser.me/api/?results=20&inc=name,login,picture";

export const getStaticProps = async () => {
  // News data API
  const response = await axios.get(newsBaseURL);
  const newsData = response.data.articles;

  // Random users API
  const responseData = await axios.get(usersBaseURL);
  const userData = responseData.data.results;

  return {
    props: {
      newsData,
      userData,
    },
    revalidate: 3600 * 3,
  };
};

export async function getStaticPaths() {
    return {
      paths: [
        `/posts/t6nCZDmsFLoe5Vzurmlb`,
      ],
      fallback: true,
    }
  }
