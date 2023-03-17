import {
  DotsHorizontalIcon,
  ChatIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";

const Posts = ({ post }) => {
  return (
    <div className="flex p-2 cursor-pointer border-b border-gray-200">
      {/* left */}
      <div className="">
        <img src={post.userImg} alt="user-image" className="rounded-full h-10 w-10 mr-4" />
      </div>

      {/* right section */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            {/* user info */}
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:text-gray-700 hover:underline">{post.name}</h4>
            <span className="text-sm sm:text-[15px] text-gray-500">@{post.username}</span>
            <span className="text-sm sm:text-[15px] text-gray-500"> - {post.timestamp}</span>
          </div>
          <div className="">
            <DotsHorizontalIcon className="h-10 w-10 menuHoverEffect hover:bg-sky-100 hover:text-sky-500 p-2" />
          </div>
        </div>
        <div className="">
          <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post.tweet}</p>
        </div>
        <div className="">
          <img src={post.postImg} alt="post-image" className="rounded mr-2" />
        </div>
        <div className="flex items-center justify-between h-10 text-gray-500 p-2">
          <ChatIcon className="h-7 w-10 p-1 menuHoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-7 w-10 p-1 menuHoverEffect hover:text-red-500 hover:bg-red-100"  />
          <HeartIcon className="h-7 w-10 p-1 menuHoverEffect hover:text-red-500 hover:bg-red-100" />
          <ShareIcon className="h-7 w-10 p-1 menuHoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-7 w-10 p-1 menuHoverEffect hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Posts;
