import { SparklesIcon } from "@heroicons/react/outline";
import InputSection from "./InputSection";

const FeedSection = () => {
  return (
    <div className="sm:ml-24 xl:ml-80 border-black-100 border-l border-r shadow mt-1 flex-grow max-w-[597px]">
      <div className="flex items-center justify-between p-2 border-b border-gray-200 sticky bg-white">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="cursor-pointer hover:bg-gray-100 rounded-full sm:p-2 w-9 h-9 flex items-center">
          <SparklesIcon className="h-5 mt-1" />
        </div>
      </div>
      <InputSection />
    </div>
  );
};

export default FeedSection;
