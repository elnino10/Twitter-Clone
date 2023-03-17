import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { newsTrend } from "../public/assets/trending/trends";

const Trending = () => {
    const [showTrend, setShowTrend] = useState(5);

  const showTrendHandler = () => {
    setShowTrend((prev) => prev + 3);
  };
  return (
    <div className="">
      <h4 className="font-bold text-[20px] text-gray-900 mx-4 my-3">
        Trends for you
      </h4>
      {newsTrend.slice(0, showTrend).map((trend) => (
        <div
          key={trend.name}
          className="flex items-start justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 transition duration-200"
        >
          <div className="flex flex-col justify-between leading-6">
            <span className="text-sm text-gray-500">{trend.category}</span>
            <h6 className="font-bold text-gray-800">{trend.name}</h6>
            <span className="text-sm text-gray-500">
              {trend.tweetNum} Tweets
            </span>
          </div>
          <DotsHorizontalIcon className="h-5 text-gray-700" />
        </div>
      ))}
      <div onClick={showTrendHandler} className="cursor-pointer pl-4 pb-2 text-blue-500 hover:bg-gray-100 h-[50px] flex items-center">
        Show more
      </div>
    </div>
  );
};

export default Trending;
