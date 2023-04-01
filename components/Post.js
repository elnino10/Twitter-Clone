import {
  DotsHorizontalIcon,
  ChatIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import Image from "next/image";

const Posts = ({ post }) => {
  return (
    <div className="flex flex-col p-2 cursor-pointer border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-[50px] p-2">
          <Image
            width="50"
            height="50"
            src={post.userImage}
            alt="user-image"
            className="rounded-full w-full"
          />
        </div>
        <div className="flex items-center space-x-1 whitespace-nowrap">
          {/* user info */}
          <h4 className="font-bold text-[15px] sm:text-[16px] hover:text-gray-700 hover:underline text-ellipsis overflow-hidden">
            {post.name}
          </h4>
          <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
            @{post.username}
          </span>
          <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
            {" "}
            - {`timestamp`}
          </span>
        </div>
        <div className="ml-auto">
          <DotsHorizontalIcon className="h-10 w-10 menuHoverEffect hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
      </div>
      <div className="pl-2">
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 pl-11">
          {post.text}
        </p>
        <div className="w-80 flex m-auto">
          {post.fileURL && (
            <Image width='310' height='450' src={post.fileURL} alt="post-image" className="rounded mr-2" />
          )}
        </div>
        <div className="flex items-center justify-between h-10 my-1 text-gray-500 p-2">
          <ChatIcon className="h-10 w-10 p-2 menuHoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-10 w-10 p-2 menuHoverEffect hover:text-red-500 hover:bg-red-100" />
          <HeartIcon className="h-10 w-10 p-2 menuHoverEffect hover:text-red-500 hover:bg-red-100" />
          <ShareIcon className="h-10 w-10 p-2 menuHoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-10 w-10 p-2 menuHoverEffect hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Posts;
