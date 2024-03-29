import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  BellIcon,
  DotsHorizontalIcon,
  MailIcon,
  SearchIcon,
  SparklesIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useScrollDirection } from "@/useScrollDirection";
import InputFeed from "./InputFeed";
import Post from "./Post";
import { AnimatePresence, motion } from "framer-motion";
import LoadingIndicator from "./UI/LoadingIndicator";
import { useRecoilState } from "recoil";
import { loadingState, modalState } from "@/atom/modalAtom";

const FeedSection = ({ isAuth }) => {
  const [posts, setPosts] = useState([]);
  const [bottomMenuIsShown, setBottomMenuIsShown] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const ref = useRef();
  const scrollDirection = useScrollDirection(ref);
  const [isLoading, setLoading] = useRecoilState(loadingState);
  const [openCommentModal, setOpenCommentModal] = useRecoilState(modalState);

  // get all posts from database
  const getPosts = () => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (data) => {
        setPosts(data.docs);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    posts && getPosts();
  }, []);

  // check for scroll direction
  useEffect(() => {
    if (scrollDirection === "up") setBottomMenuIsShown(false);
  }, [scrollDirection]);

  const toggleProfilePage = () => {
    setBottomMenuIsShown(!bottomMenuIsShown);
  };

  const showTrendsHandler = () => {
    router.push("/trending");
    setLoading(true);
  };

  // scroll to top
  const viewTopFeed = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="sm:ml-24 xl:ml-[25rem] border-black-100 border-l border-r shadow mt-1 flex-grow max-w-[597px] relative">
      <div
        className={` ${
          !openCommentModal ? "z-10 sticky top-0" : ""
        } flex items-center justify-between p-2 border-b border-gray-200 bg-white`}
      >
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="cursor-pointer hover:bg-gray-100 rounded-full sm:p-2 w-20 h-10 flex items-center">
          <SparklesIcon
            className={`${
              session ? "h-5 mt-1 ml-auto" : "hidden xl:block xl:h-5 xl:ml-auto"
            } `}
          />
          {!session && (
            <div
              onClick={() => {
                router.push("/auth/signin");
              }}
              className="xl:hidden bg-blue-400 text-white rounded-full ml-auto py-1 px-2"
            >
              Sign in
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="">
          <InputFeed isAuth={isAuth} />
          <AnimatePresence>
            {posts?.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Post
                  post={post.data()}
                  postId={post.id}
                  onSetLoading={setLoading}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {bottomMenuIsShown && (
        <div
          className={`${
            session
              ? "flex flex-col items-start justify-between border py-3 px-4 sticky bottom-0 translate-x-[27rem] translate-y-[-3rem] bg-white rounded-md h-[80px] w-[150px] shadow"
              : "flex flex-col items-center border py-3 px-4 sticky bottom-0 translate-x-[18rem] translate-y-[-3rem] bg-white rounded-md h-[50px] w-[150px] shadow"
          }`}
        >
          {session && (
            <span className="text-sm hover:text-sky-500 cursor-pointer">
              View Profile
            </span>
          )}
          {session ? (
            <span
              onClick={() => router.push("/auth/signout")}
              className="text-sm"
            >
              Sign out
            </span>
          ) : (
            <span
              onClick={() => router.push("/auth/signin")}
              className="text-sm"
            >
              Sign in
            </span>
          )}
        </div>
      )}
      {scrollDirection === "up" && !isLoading && (
        <div className="xl:hidden flex items-center justify-between h-12 p-2 mb-0 text-gray-800 border border-gray-200 sticky bottom-0 bg-white z-50">
          <HomeIcon onClick={viewTopFeed} className="h-10 p-1.5" />
          <SearchIcon onClick={showTrendsHandler} className="h-10 p-1.5" />
          <BellIcon className="h-10 p-1.5" />
          <MailIcon className="h-10 p-1.5" />
          <DotsHorizontalIcon
            onClick={toggleProfilePage}
            className="h-10 p-1.5"
          />
        </div>
      )}
    </section>
  );
};

export default FeedSection;
