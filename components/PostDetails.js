import {
  ArrowLeftIcon,
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Alert from "./UI/Alert";
import { useSession } from "next-auth/react";
import { HiArrowPathRoundedSquare, HiArrowUpTray } from "react-icons/hi2";
import { BsDot } from "react-icons/bs";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import CommentInput from "./CommentInput";
import CommentSection from "./CommentSection";
import { useRecoilState } from "recoil";
import { idState, modalState } from "@/atom/modalAtom";
import LoadingIndicator from "./UI/LoadingIndicator";

const PostDetails = ({ postId, post, postLikes, db }) => {
  const [isLoading, setLoading] = useState(false);
  const [panelShown, setPanelShown] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [userLikes, setUserLikes] = useState(false);
  const [numLikes, setNumLikes] = useState(null);
  const [comments, setComments] = useState("");
  const [activePanelId, setActivePanelId] = useState(null);
  const [commentPanelShown, setCommentPanelShown] = useState(false);
  const router = useRouter();
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [getId, setId] = useRecoilState(idState);

  const { data: session } = useSession();

  // check if current user liked a post, return true, else return false
  useEffect(() => {
    setUserLikes(
      postLikes.findIndex((like) => like.id === session?.user.userid) !== -1
    );
    setNumLikes(postLikes.length > 0 && postLikes.length);
  }, [postLikes, session?.user.userid]);

  // show edit/delete panel
  const toggleActionPanel = (e) => {
    e.stopPropagation();
    const dataValue = e.currentTarget.getAttribute("data-value");
    if (dataValue === "panel") {
      return setPanelShown((currState) => !currState);
    }
  };

  // show comment action panel
  const onShowPanel = (id) => {
    comments.find((comment) => {
      if (comment.id === id) {
        setCommentPanelShown(true);
      }
    });
  };

  const alertDisplayHandler = () => {
    setAlertShown(true);
    setPanelShown(false);
  };

  const closeAlertHandler = () => {
    setAlertShown(false);
  };

  const deletePostHandler = async () => {
    await deleteDoc(doc(db, "posts", postId));
    if (post.image) await deleteObject(ref(storage, `posts/${postId}/image`));
    setAlertShown(false);
  };

  // open the comment modal if signed in, else redirect to sign in page
  const commentHandler = (e) => {
    e.stopPropagation();
    if (!session) {
      router.push("/auth/signin");
    } else {
      setOpenModal(!openModal);
      setId(postId);
    }
  };

  // check for user like in post
  const likeHandler = async () => {
    if (session) {
      setUserLikes((prev) => !prev);
      // if user liked the post, click event will remove like, else, set as liked
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

  // get all the comments for post
  const getAllComments = useCallback(() => {
    onSnapshot(collection(db, "posts", postId, "comments"), (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [db, postId]);

  useEffect(() => {
    getAllComments();
  }, [getAllComments]);

  // update an existing post
  const updatePostHandler = () => {};

  // if panel is shown, close panel on click
  const hidePanelHandler = () => {
    panelShown && setPanelShown(false);
    setCommentPanelShown(false);
    setActivePanelId(null);
  };

  // go back
  const trackBackHandler = () => {
    router.back();
    setLoading(true);
  };

  return (
    <section
      onClick={hidePanelHandler}
      className="sm:ml-24 xl:ml-[25rem] border-black-100 border-l border-r shadow mt-1 flex-grow xl:max-w-[597px] relative"
    >
      <div className={`${!openModal ? "z-10 sticky top-0 bg-white" : ""} flex items-center p-2  text-gray-800 border-b xl:border-none`}>
        <ArrowLeftIcon
          onClick={trackBackHandler}
          className="h-10 p-2 my-1 mr-10 menuHoverEffect"
        />
        <p className="flex  font-bold text-lg">Tweet</p>
      </div>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div>
          {alertShown && (
            <Alert
              alertShown={alertShown}
              onCloseAlert={closeAlertHandler}
              onDelete={deletePostHandler}
              type="error"
            >
              <p>Deleting post?</p>
            </Alert>
          )}
          <div>
            <div className="flex items-center relative">
              <div className="w-[50px] p-2">
                <Image
                  width="50"
                  height="50"
                  src={post?.userImage}
                  alt="user-image"
                  className="rounded-full w-full"
                />
              </div>
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <h4 className="font-bold text-[15px] sm:text-[16px] cursor-pointer hover:text-gray-700 hover:underline text-ellipsis overflow-hidden">
                  {post?.name}
                </h4>
                <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
                  @{post?.username}
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
                <div className="translate-x-[435px] w-[100px] translate-y-3 h-auto border py-2 px-4 rounded-md absolute shadow">
                  {session?.user.userid === post.userId ? (
                    <div className="flex flex-col items-start justify-between">
                      <span
                        onClick={updatePostHandler}
                        className="text-md hover:text-sky-500 cursor-pointer"
                      >
                        Edit
                      </span>
                      <span
                        onClick={alertDisplayHandler}
                        className="text-md hover:text-red-500 cursor-pointer"
                      >
                        Delete
                      </span>
                    </div>
                  ) : (
                    <span className="text-md hover:text-red-500 cursor-pointer">
                      Report
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="px-10">
              <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 pl-11">
                {post?.text}
              </p>
              <div className="w-[380px] h-auto flex m-auto rounded-lg">
                {post?.fileURL && (
                  <Image
                    width="0"
                    height="0"
                    src={post.fileURL}
                    alt="post-image"
                    sizes="auto"
                    priority
                    className="m-auto w-full p-5"
                  />
                )}
              </div>
              <div className="flex items-center text-xs text-gray-500 border-b px-5 py-3 w-[90%] ml-5">
                <p>10:30AM</p>
                <BsDot />
                <p>April 29, 2023</p>
              </div>
              <div className="flex items-center px-5 py-3 border-b ml-5 w-[90%] text-xs">
                <p className="text-gray-500 mr-3">
                  <span className="mr-1 text-gray-700 font-bold ">15</span>
                  Retweets
                </p>
                <p className="text-gray-500 mr-3">
                  <span className="mr-1 text-gray-700 font-bold">2</span>Quotes
                </p>
                <p className="text-gray-500 mr-3">
                  <span className="mr-1 text-gray-700 font-bold">
                    {numLikes}
                  </span>
                  Likes
                </p>
                <p className="text-gray-500 mr-3">
                  <span className="mr-1 text-gray-700 font-bold">1</span>
                  Bookmark
                </p>
              </div>
              <div className="flex items-center justify-between h-10 my-1 text-gray-500 p-2">
                <div className="">
                  <div className="flex items-center hover:text-sky-500 peer">
                    <ChatIcon
                      onClick={commentHandler}
                      className="h-10 w-10 p-2 menuHoverEffect hover:bg-sky-100"
                    />
                  </div>
                  <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
                    Reply
                  </span>
                </div>
                <div className="">
                  <div className="flex items-center hover:text-green-500 peer">
                    <HiArrowPathRoundedSquare className="h-10 w-10 p-2 menuHoverEffect hover:bg-green-100" />
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
                <div>
                  <BookmarkIcon className="h-10 w-10 p-2 menuHoverEffect hover:text-sky-500 hover:bg-sky-100 peer" />
                  <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
                    Bookmark
                  </span>
                </div>
                <div>
                  <HiArrowUpTray className="h-10 w-10 p-2 menuHoverEffect hover:text-sky-500 hover:bg-sky-100 peer" />
                  <span className="absolute ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
                    Share
                  </span>
                </div>
              </div>
            </div>
          </div>
          <CommentInput postId={postId} />
          <CommentSection
            postId={postId}
            db={db}
            comments={comments}
            commentPanelShown={commentPanelShown}
            activePanelId={activePanelId}
            onHidePanel={hidePanelHandler}
            onShowPanel={onShowPanel}
            setActivePanelId={setActivePanelId}
          />
        </div>
      )}
    </section>
  );
};

export default PostDetails;
