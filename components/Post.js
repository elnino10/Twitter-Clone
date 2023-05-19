import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { db, storage } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import {
  DotsHorizontalIcon,
  ChatIcon,
  HeartIcon,
  ChartBarIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import Image from "next/image";
import Moment from "react-moment";
import Alert from "./UI/Alert";
import { useRecoilState } from "recoil";
import {
  editPostModalState,
  idState,
  modalState,
  postTextState,
} from "@/atom/modalAtom";
import { BsDot } from "react-icons/bs";

const Posts = ({ post, postId, onSetLoading }) => {
  const [userLikes, setUserLikes] = useState(false);
  const [postLikes, setPostLikes] = useState([]);
  const [numLikes, setNumLikes] = useState(null);
  const [panelShown, setPanelShown] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [comments, setComments] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [getId, setId] = useRecoilState(idState);
  const [openEditModal, setOpenEditModal] = useRecoilState(editPostModalState);
  const [postText, setPostText] = useRecoilState(postTextState);

  // get all likes for a post
  useEffect(() => {
    onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) => {
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

  // get available comments and set the number of comments if available
  useEffect(() => {
    onSnapshot(collection(db, "posts", postId, "comments"), (snapShot) => {
      setComments(snapShot.docs);
    });
  }, [postId]);

  // check for user like in post
  const likeHandler = async () => {
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

  // show edit/delete panel
  const toggleActionPanel = (e) => {
    e.stopPropagation();
    const dataValue = e.currentTarget.getAttribute("data-value");
    if (dataValue === "panel") {
      return setPanelShown((currState) => !currState);
    }
  };

  // click around the body closes edit/delete panel
  const postClickHandler = (e) => {
    // e.stopPropagation();
    // const dataValue = e.currentTarget.getAttribute("data-value");
    if (panelShown /*&& dataValue !== "panel"*/) {
      return setPanelShown(false);
    }
    if (!panelShown && !alertShown) {
      window.scrollTo(0, 0);
      router.push(`/posts/${postId}`);
      onSetLoading(true);
    }
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

  // open comment modal if signed in, else redirect to sign in page
  const commentHandler = (e) => {
    e.stopPropagation();
    if (!session) {
      router.push("/auth/signin");
    } else {
      setOpenModal(!openModal);
      setId(postId);
    }
  };

  // open edit modal
  const editModalDisplayHandler = () => {
    setOpenEditModal(true);
    setId(postId);
    setPostText(post.text);
  };

  return (
    <div
      onClick={postClickHandler}
      className="flex flex-col p-2 border-b border-gray-200 cursor-pointer"
    >
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
          {post.updated && (
            <div className="flex items-center">
              <BsDot className="mt-1 text-gray-500" />
              <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
                Edited
              </span>
            </div>
          )}
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
          <div className="translate-x-[435px] w-auto translate-y-3 h-auto border py-2 px-4 rounded-md absolute shadow bg-gray-100">
            {session?.user.userid === post.userId ? (
              <div className="flex flex-col items-start justify-between text-sm">
                <span
                  onClick={editModalDisplayHandler}
                  className="text-md hover:text-sky-500 cursor-pointer"
                >
                  Edit text
                </span>
                <span
                  onClick={alertDisplayHandler}
                  className="text-md hover:text-red-500 cursor-pointer"
                >
                  Delete post
                </span>
              </div>
            ) : (
              <span className="text-md hover:text-red-500 cursor-pointer text-sm">
                Report
              </span>
            )}
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
              priority
              className="m-auto w-full p-5"
            />
          )}
        </div>
        <div className="flex items-center justify-between h-10 my-1 text-gray-500 p-2">
          <div className="">
            <div className="flex items-center hover:text-sky-500">
              <ChatIcon
                onClick={commentHandler}
                className="h-10 w-10 p-2 menuHoverEffect hover:bg-sky-100 peer"
              />
              <span className="text-xs w-5">
                {comments.length > 0 && comments.length}
              </span>
              <span className="absolute translate-y-5 ml-0.5 text-xs bg-gray-500 text-white rounded-sm px-1 py-0.5 invisible peer-hover:visible delay-300 ease-in">
                Reply
              </span>
            </div>
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
