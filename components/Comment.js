import { useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiArrowPathRoundedSquare, HiArrowUpTray } from "react-icons/hi2";
import Moment from "react-moment";

const Comment = ({
  post,
  comment,
  postId,
  commentId,
  panelShown,
  onShowPanel,
  onHidePanel,
  activePanelId,
  setActivePanelId,
}) => {
  const [userLikes, setUserLikes] = useState(false);
  const { data: session } = useSession();

  // make a reply to a post if signed in, else redirect to sign in page
  const commentHandler = () => {
    // if (!session) {
    //   router.push("/auth/signin");
    // } else {
    //   setOpenModal(!openModal);
    // }
  };

  // check for user like in comment
  const likeHandler = async () => {
    if (panelShown) return;
    if (session) {
      setUserLikes((prev) => !prev);
      // if user liked the post, remove like, else, set as liked
      if (userLikes) {
        await deleteDoc(
          doc(db, "posts", postId, "likes", session?.user.userid)
        );
      } else {
        await setDoc(
          doc(db, "posts", postId, "likes", session?.user.userid),
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

  // show panel
  const toggleActionPanel = (id, e) => {
    setActivePanelId(id);
    e.stopPropagation();
    if (panelShown) {
      onHidePanel();
    } else {
      onShowPanel(id);
    }
  };

  // click around the body closes panel
  const postClickHandler = () => {
    setActivePanelId(null);
    if (panelShown) {
      return onHidePanel();
    }
  };

  return (
    <div
      onClick={postClickHandler}
      className="hover:bg-gray-100 border-b h-auto"
    >
      <div className="flex items-center relative">
        <div className="w-[50px] p-2">
          <Image
            width="50"
            height="50"
            src={comment?.userImage}
            alt="user-image"
            className="rounded-full w-full"
          />
        </div>
        <div className="flex items-center space-x-1 whitespace-nowrap">
          <h4 className="font-bold text-[15px] sm:text-[16px] cursor-pointer hover:text-gray-700 hover:underline text-ellipsis overflow-hidden">
            {comment?.name}
          </h4>
          <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
            @{comment?.username}
          </span>

          <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
            {" "}
            - <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
          </span>
        </div>
        <div
          data-value="panel"
          onClick={toggleActionPanel.bind(null, commentId)}
          className="ml-auto flex flex-col relative"
        >
          <DotsHorizontalIcon className="h-10 w-10 menuHoverEffect hover:bg-sky-100 hover:text-sky-500 p-2 peer" />
          <span className="absolute z-40 translate-y-10 ml-0.5 text-xs bg-gray-500 text-white rounded p-1 invisible peer-hover:visible delay-300 ease-in">
            More
          </span>
        </div>
        {panelShown && activePanelId === commentId && (
          <div className="translate-x-[360px] w-auto translate-y-14 bg-white h-auto border py-4 px-5 rounded-md absolute shadow text-gray-800 font-semibold text-lg leading-1">
            <div className="flex flex-col items-start justify-between">
              <span className="text-md hover:text-sky-500 cursor-pointer">
                Follow @{comment?.username}
              </span>
              <span className="text-md hover:text-sky-500 cursor-pointer">
                Mute @{comment?.username}
              </span>
              <span className="text-md hover:text-sky-500 cursor-pointer">
                Mute this conversation
              </span>
              <span className="text-md hover:text-sky-500 cursor-pointer">
                Report Tweet
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="px-10">
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 pl-11">
          {comment?.reply}
        </p>
        <div className="w-[380px] h-auto flex m-auto rounded-lg">
          {comment?.fileURL && (
            <Image
              width="0"
              height="0"
              src={comment.fileURL}
              alt="post-image"
              sizes="auto"
              priority
              className="m-auto w-full p-5"
            />
          )}
        </div>
        <div className="flex items-center justify-between h-7 mt-5 text-gray-500 p-1">
          <div className="">
            <div className="flex items-center hover:text-sky-500 peer">
              <ChatIcon
                onClick={commentHandler}
                className="h-10 w-10 p-2.5 menuHoverEffect hover:bg-sky-100"
              />
            </div>
            <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
              Reply
            </span>
          </div>
          <div className="">
            <div className="flex items-center hover:text-green-500 peer">
              <HiArrowPathRoundedSquare className="h-10 w-10 p-2.5 menuHoverEffect hover:bg-green-100" />
            </div>
            <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
              Retweet
            </span>
          </div>
          <div onClick={likeHandler}>
            {userLikes ? (
              <div className="">
                <div className="flex items-center hover:text-red-500 peer">
                  <HeartIconSolid className="h-10 w-10 p-2.5 text-red-500" />
                </div>
                <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
                  Unlike
                </span>
              </div>
            ) : (
              <div className="">
                <div className="flex items-center hover:text-red-500 peer">
                  <HeartIcon className="h-10 w-10 p-2.5 menuHoverEffect hover:bg-red-100" />
                </div>
                <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
                  Like
                </span>
              </div>
            )}
          </div>
          <div>
            <BookmarkIcon className="h-10 w-10 p-2.5 menuHoverEffect hover:text-sky-500 hover:bg-sky-100 peer" />
            <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
              Bookmark
            </span>
          </div>
          <div>
            <HiArrowUpTray className="h-10 w-10 p-2.5 menuHoverEffect hover:text-sky-500 hover:bg-sky-100 peer" />
            <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
              Share
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
