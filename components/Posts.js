import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  DotsHorizontalIcon,
  ChatIcon,
  TrashIcon,
  HeartIcon,
  ChartBarIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Moment from "react-moment";
import { useRouter } from "next/router";

const Posts = ({ post }) => {
  const [userLikes, setUserLikes] = useState(false);
  const [postLikes, setPostLikes] = useState([]);
  const [numLikes, setNumLikes] = useState(null);
  const [panelShown, setPanelShown] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // get all likes for a post
  useEffect(() => {
    onSnapshot(collection(db, "posts", post.id, "likes"), (snapshot) => {
      setPostLikes(
        snapshot.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  }, []);

  // check if current user liked a post, return true, else return false
  useEffect(() => {
    setUserLikes(
      postLikes.findIndex((like) => like.id === session?.user.userid) !== -1
    );
    setNumLikes(postLikes.length > 0 && postLikes.length);
  }, [postLikes, session?.user.userid]);

  // check for user like in post
  const likeHandler = async () => {
    if (session) {
      setUserLikes((prev) => !prev);
      // if user liked the post, remove like, else, set as liked
      if (userLikes) {
        await deleteDoc(
          doc(db, "posts", post.id, "likes", session?.user.userid)
        );
      } else {
        await setDoc(
          doc(db, "posts", post.id, "likes", session?.user.userid),
          {
            username: session?.user.username,
          },
          { capital: true },
          { merge: true }
        );
      }
    } else {
      router.push("/auth/signin");
    }
  };

  // show edit/delete panel
  const toggleActionPanel = (e) => {
    e.preventDefault();
    const dataValue = e.currentTarget.getAttribute("data-value");
    if (dataValue === "panel")
      setPanelShown((currState) => (currState === false ? true : false));
  };

  // click around the body closes edit/delete panel
  const closeActionPanel = (e) => {
    e.preventDefault();
    const dataValue = e.currentTarget.getAttribute("data-value");
    // if (dataValue !== "panel")
    //   setPanelShown((currState) => currState === true && false);
  };

  return (
    <div
      onClick={closeActionPanel}
      className="flex flex-col p-2 border-b border-gray-200"
    >
      <div className="flex items-center relative">
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
          <h4 className="font-bold text-[15px] sm:text-[16px] cursor-pointer hover:text-gray-700 hover:underline text-ellipsis overflow-hidden">
            {post.name}
          </h4>
          <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
            @{post.username}
          </span>
          <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
            {" "}
            - <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
          </span>
        </div>
        <div
          data-value="panel"
          onClick={toggleActionPanel}
          className="ml-auto flex flex-col relative"
        >
          <DotsHorizontalIcon className="h-10 w-10 menuHoverEffect hover:bg-sky-100 hover:text-sky-500 p-2 peer" />
          <span className="absolute z-40 translate-y-10 ml-0.5 text-xs bg-gray-500 text-white rounded p-1 invisible peer-hover:visible delay-300 ease-in">
            More
          </span>
        </div>
        {panelShown && (
          <div className="flex flex-col items-start translate-x-[460px] border py-1 px-4 rounded-md absolute shadow">
            <span className="text-sm hover:text-sky-500 cursor-pointer">
              Edit
            </span>
            <span className="text-sm hover:text-red-500 cursor-pointer">
              Delete
            </span>
          </div>
        )}
      </div>
      <div className="pl-2">
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 pl-11">
          {post.text}
        </p>
        <div className="w-[380px] h-auto flex m-auto">
          {post.fileURL && (
            <Image
              width="0"
              height="0"
              src={post.fileURL}
              alt="post-image"
              sizes="auto"
              className="m-auto w-full p-5"
            />
          )}
        </div>
        <div className="flex items-center justify-between h-10 my-1 text-gray-500 p-2">
          <div className="">
            <div className="flex items-center hover:text-sky-500 peer">
              <ChatIcon className="h-10 w-10 p-2 menuHoverEffect hover:bg-sky-100" />
              <span className="text-xs w-5">12</span>
            </div>
            <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
              Reply
            </span>
          </div>
          <div className="">
            <div className="flex items-center hover:text-green-500 peer">
              <HiArrowPathRoundedSquare className="h-10 w-10 p-2 menuHoverEffect hover:bg-green-100" />
              <span className="text-xs w-5">136</span>
            </div>
            <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
              Retweet
            </span>
          </div>
          <div onClick={likeHandler}>
            {userLikes ? (
              <div className="">
                <div className="flex items-center hover:text-red-500 peer">
                  <HeartIconSolid className="h-10 w-10 p-2 text-red-500" />
                  <span className="text-xs w-5">{numLikes}</span>
                </div>
                <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
                  Unlike
                </span>
              </div>
            ) : (
              <div className="">
                <div className="flex items-center hover:text-red-500 peer">
                  <HeartIcon className="h-10 w-10 p-2 menuHoverEffect hover:bg-red-100" />
                  <span className="text-xs w-5">{numLikes}</span>
                </div>
                <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
                  Like
                </span>
              </div>
            )}
          </div>
          <div className="">
            <div className="flex items-center hover:text-sky-500 peer ">
              <ChartBarIcon className="h-10 w-10 p-2 menuHoverEffect hover:bg-sky-100" />
              <span className="text-xs w-5">125</span>
            </div>
            <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
              View
            </span>
          </div>
          <div>
            <ShareIcon className="h-10 w-10 p-2 menuHoverEffect hover:text-sky-500 hover:bg-sky-100 peer" />
            <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
              Share
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
