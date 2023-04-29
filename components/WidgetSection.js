import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import FollowSuggestion from "./FollowSuggestion";
import NewsWidget from "./NewsWidget";
import SigninWidget from "./SigninWidget";
import { AnimatePresence, motion } from "framer-motion";

const WidgetSection = ({ newsData, userData, isAuth, openModal }) => {
  const [showNews, setShowNews] = useState(3);
  const [showUsers, setShowUsers] = useState(5);

  const showNewsHandler = () => {
    setShowNews((prev) => prev + 3);
  };

  const showUsersHandler = () => {
    setShowUsers((prev) => prev + 3);
  };

  return (
    <>
      {isAuth ? (
        <section className="xl:w-[500px] hidden lg:inline space-y-5 relative bg-white py-1.5 p-4">
          <div className="flex items-center w-[90%] xl:w-[65%] p-3 rounded-full sticky top-0">
            <SearchIcon className="h-5 z-50 text-gray-500" />
            <input
              type="text"
              placeholder="Search Twitter"
              className="absolute inset-0 rounded-full pl-10 border-inherit text-gray-500 bg-gray-100 focus:bg-white focus:shadow-lg"
            />
          </div>
          <div className="text-gray-700 bg-gray-100 space-y-3 pt-2 rounded-xl w-[90%] xl:w-[65%] mt-3">
            <div className="">
              <h4 className="font-bold text-xl p-2">{"What's trending"}</h4>
            </div>
            <AnimatePresence>
              {newsData.slice(0, showNews).map((data) => (
                <motion.div
                  key={
                    data.source.id !== null
                      ? data.source.id
                      : Math.random() * 100
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <NewsWidget props={data} />
                </motion.div>
              ))}
            </AnimatePresence>
            <button
              className="pl-2 pb-2 text-blue-400 hover:text-blue-500"
              onClick={showNewsHandler}
            >
              Show more
            </button>
          </div>
          <div className="sticky top-16 text-gray-700 bg-gray-100 rounded-xl w-[90%] xl:w-[65%] mt-3 space-y-3 pt-4">
            <h4 className="font-bold text-xl px-2">Who to follow</h4>
            {userData.slice(0, showUsers).map((user) => (
              <FollowSuggestion key={user.login.username} user={user} />
            ))}
            <button
              className="pl-2 pb-2 text-blue-400 hover:text-blue-500"
              onClick={showUsersHandler}
            >
              Show more
            </button>
          </div>
        </section>
      ) : (
        <SigninWidget openModal={openModal} />
      )}
    </>
  );
};

export default WidgetSection;
