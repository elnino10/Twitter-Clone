import { SparklesIcon } from "@heroicons/react/outline";
import InputSection from "./InputFeed";
import Post from "./Post";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "@/firebase";

const FeedSection = ({ isAuth }) => {
  const [posts, setPosts] = useState([]);

  // const getPostsCallback = useCallback(async () => {
  //   const data = await getDocs(
  //     query(collection(db, "posts"), orderBy("timestamp", "desc"))
  //   );
  //     setPosts(data.docs);
  // }, []);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(
        query(collection(db, "posts"), orderBy("timestamp", "desc"))
      );
      setPosts(data.docs);
    };
    getPosts();
  }, []);

  return (
    <section className="sm:ml-24 xl:ml-[25rem] border-black-100 border-l border-r shadow mt-1 flex-grow max-w-[597px]">
      <div className="flex items-center justify-between p-2 border-b border-gray-200 sticky top-0 bg-white">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="cursor-pointer hover:bg-gray-100 rounded-full sm:p-2 w-9 h-9 flex items-center">
          <SparklesIcon className="h-5 mt-1" />
        </div>
      </div>
      <InputSection isAuth={isAuth} />
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post.data()} />
        ))}
      </div>
    </section>
  );
};

export default FeedSection;
