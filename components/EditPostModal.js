import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import Moment from "react-moment";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { editPostModalState, idState, postTextState } from "@/atom/modalAtom";
import { db } from "@/firebase";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";

const EditPostModal = () => {
  const [post, setPost] = useState({});
  const [inputText, setInputText] = useState("");
  const [getId] = useRecoilState(idState);
  const [openEditModal, setOpenEditModal] = useRecoilState(editPostModalState);
  const [postText] = useRecoilState(postTextState);

  const { data: session } = useSession();

  // get post with the id: getId
  useEffect(() => {
    onSnapshot(doc(db, "posts", getId), (snapShot) => {
      setPost(snapShot);
    });
  }, [getId]);

  // submit editted post
  const createUpdate = async () => {
    await updateDoc(doc(db, "posts", getId), {
      text: inputText,
      updated: true,
      timestamp: serverTimestamp(),
    });
    setOpenEditModal(false);
  };

  return (
    <div className="">
      {openEditModal && (
        <Modal
          ariaHideApp={false}
          isOpen={openEditModal}
          onRequestClose={() => setOpenEditModal(false)}
          className="absolute z-40 top-24 left-[50%] translate-x-[-50%] max-w-lg w-[90%] h-auto bg-white border border-gray-200 shadow-lg rounded-lg"
        >
          <div className="py-2 px-1.5">
            <div
              onClick={() => setOpenEditModal(false)}
              className="w-7 p-1 menuHoverEffect"
            >
              <XIcon className="text-gray-600" />
            </div>
          </div>
          <div className="flex items-center mb-3">
            <div className="w-[50px] p-2">
              <Image
                src={post?.data()?.userImage}
                width="50"
                height="50"
                alt="user-image"
                className="rounded-full w-full"
              />
            </div>
            <div className="flex flex-col pl-1 pt-2">
              <div className="flex items-center space-x-1 whitespace-nowrap">
                {/* user info */}
                <h4 className="font-bold text-[15px] sm:text-[16px] cursor-pointer hover:text-gray-700 hover:underline text-ellipsis overflow-hidden">
                  {post?.data()?.name}
                </h4>
                <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
                  @{post?.data()?.username}
                </span>
                <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
                  {" "}
                  - <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <span className="w-0.5 h-10 z-[-1] absolute bg-gray-400 left-6 translate-y-[-25px]" />
            {session && (
              <div className="w-auto flex border-b border-gray-200 p-3 space-x-3">
                <Image
                  src={
                    session ? session.user.image : "/assets/images/avatar.png"
                  }
                  width="48"
                  height="48"
                  alt="profile-image"
                  className="h-8 w-9 rounded-full cursor-pointer hover:brightness-95 ml-[-2px]"
                />
                <div className="w-full divide-y divide-gray-200">
                  <div className="">
                    <textarea
                      className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                      rows="2"
                      onChange={(e) => setInputText(e.target.value)}
                      defaultValue={postText}
                    ></textarea>
                  </div>
                  {/* {postFile && (
                    <div className="w-[70%] m-auto relative border-none">
                      <XIcon
                        onClick={removeImageHandler}
                        className="absolute h-5 w-5 text-blue-500 bg-gray-300 text-lg ml-2 mt-2 rounded-full cursor-pointer p-0.5 hover:bg-gray-400 hover:text-black shadow-md shadow-blue-400 hover:shadow-none transition duration-300"
                      />
                      <Image
                        src={postFile}
                        width="0"
                        height="0"
                        alt="post-file"
                        className={`w-full h-full rounded-lg ${
                          isLoading && "animate-pulse"
                        }`}
                      />
                    </div>
                  )} */}
                  <div className="relative flex items-center justify-between pt-2">
                    <div className="flex">
                      <div className="flex">
                        <div className="">
                          <PhotographIcon className="menuHoverEffect p-2 text-sky-500 hover:bg-sky-100 h-10 w-10 cursor-pointer" />
                          <input
                            type="file"
                            hidden
                            // ref={fileInputRef}
                            // onChange={addSelectedFile}
                          />
                        </div>
                        <div className="">
                          <EmojiHappyIcon
                            // onClick={emojiPickerHandler}
                            className="menuHoverEffect p-2 text-sky-500 hover:bg-sky-100 h-10 w-10 cursor-pointer"
                          />
                          {/* <div
                            className={`absolute z-50 ${
                              emojiVisible ? "block" : "hidden"
                            }`}
                          >
                            {emojiVisible && (
                              <EmojiPicker
                                height={400}
                                width={300}
                                onEmojiClick={onEmojiClick}
                              />
                            )}
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={createUpdate}
                      disabled={!inputText.trim()}
                      className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50"
                    >
                      Edit post
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditPostModal;
