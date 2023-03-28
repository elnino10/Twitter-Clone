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
    <section className="sm:ml-24 xl:ml-[25rem] border-black-100 border-l border-r shadow mt-1 flex-grow max-w-[597px]">
      <div className="flex items-center justify-between p-2 border-b border-gray-200 sticky top-0 bg-white">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="cursor-pointer hover:bg-gray-100 rounded-full sm:p-2 w-9 h-9 flex items-center">
          <SparklesIcon className="h-5 mt-1" />
        </div>
      </div>
      <InputSection />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
};

export default FeedSection;
