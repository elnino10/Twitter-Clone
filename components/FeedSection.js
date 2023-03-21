import Link from "next/link";
import { DotsHorizontalIcon, SparklesIcon } from "@heroicons/react/outline";
import InputSection from "./InputFeed";
import Post from "./Post";
import { SearchIcon } from "@heroicons/react/outline";
import { AiOutlineSetting } from "react-icons/ai";
import Trending from "./Trending";
import Image from "next/image";

const posts = [
  {
    id: "p1",
    name: "Elnino",
    username: "ninocodes",
    userImg: "/assets/images/my-image.jpg",
    postImg:
      "https://media.istockphoto.com/id/1173544006/photo/winding-road.jpg?s=612x612&w=0&k=20&c=_VMEnB08arEsLnbES0knQUWHPrCD8TQFCy99JC4RZIQ=",
    tweet: "Beautiful nature experience",
    timestamp: "3 hours ago",
  },
  {
    id: "p2",
    name: "Kenchuckz",
    username: "kenondabeatz",
    userImg: "/assets/images/kenchukz.jpg",
    postImg:
      "https://media.istockphoto.com/id/1367869166/photo/professional-microphone-on-the-streaming-or-podcast-room-background.jpg?s=612x612&w=0&k=20&c=mcEq7dIs_QfW24ffYgjEwE5JgXB4hC0EXmK6c1hbsgE=",
    tweet: "We make nothing but good music! 🙂",
    timestamp: "1 hour ago",
  },
  {
    id: "p3",
    name: "Jesse Ozioma",
    username: "ninocodes",
    userImg: "/assets/images/JesseMJ.jpg",
    postImg:
      "https://media.istockphoto.com/id/1173544006/photo/winding-road.jpg?s=612x612&w=0&k=20&c=_VMEnB08arEsLnbES0knQUWHPrCD8TQFCy99JC4RZIQ=",
    tweet: "Beautiful nature experience",
    timestamp: "3 hours ago",
  },
  {
    id: "p4",
    name: "Polaino Concept",
    username: "kenondabeatz",
    userImg: "/assets/images/Polaino.jpg",
    postImg:
      "https://media.istockphoto.com/id/1367869166/photo/professional-microphone-on-the-streaming-or-podcast-room-background.jpg?s=612x612&w=0&k=20&c=mcEq7dIs_QfW24ffYgjEwE5JgXB4hC0EXmK6c1hbsgE=",
    tweet: "We make nothing but good music! 🙂",
    timestamp: "1 hour ago",
  },
];

const FeedSection = ({ isAuth }) => {
  return (
    <>
      {isAuth ? (
        <section className="sm:ml-24 xl:ml-[25rem] border-black-100 border-l border-r shadow mt-1 flex-grow max-w-[597px]">
          <div className="flex items-center justify-between p-2 border-b border-gray-200 sticky top-0 bg-white">
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Home
            </h2>
            <div className="cursor-pointer hover:bg-gray-100 rounded-full sm:p-2 w-9 h-9 flex items-center">
              <SparklesIcon className="h-5 mt-1" />
            </div>
          </div>
          <InputSection />
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </section>
      ) : (
        <section className="sm:ml-24 xl:ml-[25rem] border-black-100 border-l border-r shadow mt-1 flex-grow max-w-[597px] relative">
          <div className="flex items-center justify-between sticky top-0 bg-white">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREv2iK0rk8t7xPQQx_G-SKoUNao4VpV5ywoF6VdVJZZQ&s"
              alt="twitter-logo"
              width="30"
              height="30"
              className="xl:hidden p-1 ml-1"
            ></Image>
            <div className="flex items-center justify-between py-1 px-2 my-3 mx-5 xl:p-3  rounded-full relative w-[90%] xl:w-[80%] xl:ml-5">
              <SearchIcon className="h-5 z-50  text-gray-500" />
              <input
                type="text"
                placeholder="Search Twitter"
                className="absolute inset-0 rounded-full pl-10 border-inherit text-gray-500 bg-gray-100 focus:bg-white focus:shadow-lg"
              />
            </div>
            <AiOutlineSetting className="hidden xl:inline xl:h-10 xl:w-10 xl:p-2 xl:mr-5 cursor-pointer hover:bg-gray-200 rounded-full" />
            <DotsHorizontalIcon className="xl:hidden h-7 mx-5"/>
          </div>
          <Trending />
          <div className="xl:hidden flex justify-between bg-white sticky bottom-0 p-4">
            <Link href="/auth/signin"  className="rounded-full border border-blue-400 text-blue-400 font-bold w-40 h-8 flex justify-center items-center text-sm">Log in</Link>
            <Link href="/auth/signup" className="rounded-full bg-blue-400 text-white font-bold w-40 flex justify-center items-center text-sm
            ">Sign up</Link>
        </div>
        </section>
      )}
    </>
  );
};

export default FeedSection;
