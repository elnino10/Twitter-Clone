import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import NewsWidget from "./NewsWidget";

const WidgetSection = ({ propData }) => {
  const [showNews, setShowNews] = useState(3);

  const showNewsHandler = () => {
    setShowNews(prev => prev + 3)
  };

  return (
    <section className="xl:w-[600px] hidden lg:inline ml-8 space-y-5 relative">
      <div className="w-[90%] xl:w-[75%]  bg-white py-1.5 z-50 p-2">
        <div className="flex items-center p-3 rounded-full sticky top-0">
          <SearchIcon className="h-5 z-50 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="absolute inset-0 rounded-full pl-10 border-gray-500 text-gray-500 bg-gray-100 focus:bg-white focus:shadow-lg"
          />
        </div>
        <div className="text-gray-700 bg-gray-100 space-y-3 pt-2 rounded-xl w-[90%] xl:w-[75%] mt-3">
          <div className="">
            <h4 className=" font-bold text-xl p-2">{"What's happening?"}</h4>
          </div>
          <div>
            {propData.slice(0, showNews).map((data) => (
              <NewsWidget key={data.id} props={data} />
            ))}
          </div>
          <button className="p-2 text-blue-400 hover:text-blue-500" onClick={showNewsHandler}>
            Show more...
          </button>
        </div>
      </div>
    </section>
  );
};

export default WidgetSection;
