import { db, storage } from "@/firebase";
import { PhotographIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const InputFeed = ({ isAuth }) => {
  const [inputText, setInputText] = useState("");
  const [postFile, setPostFile] = useState(null);
  const { data: session } = useSession();
  const fileInputRef = useRef(null);

  // sets the post text in state
  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const addSelectedFile = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setPostFile(readerEvent.target.result);
    };
  };

  // triggers file selection
  const addPostFile = () => {
    fileInputRef.current.click();
  };

  const createPost = async () => {
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.userid,
      text: inputText,
      name: session.user.name,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });

    const fileRef = ref(storage, `posts/${docRef.id}/image`);

    if (postFile) {
      await uploadString(fileRef, postFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(fileRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          fileURL: downloadURL,
        });
      });
    }

    setInputText("");
    setPostFile(null);
  };

  // cancel the selected file on preview
  const removeImageHandler = () => {
    setPostFile(null);
  };

  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        src={isAuth ? session.user.image : "/assets/images/avatar.png"}
        alt="profile-image"
        className="h-11 w-12 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
            rows="2"
            placeholder="What's happening?"
            value={inputText}
            onChange={inputHandler}
          ></textarea>
        </div>
        {postFile && (
          <div className="flex justify-center">
            <AiOutlineClose
              onClick={removeImageHandler}
              className="absolute h-5 w-5 text-blue-500 bg-gray-300 text-lg -ml-80 mt-2 rounded-full cursor-pointer p-0.5 hover:bg-gray-400 hover:text-black"
            />
            <img
              src={postFile}
              alt="postImage"
              className="xl:w-[70%] xl:h-[350px] rounded-lg"
            />
          </div>
        )}
        <div className="flex items-center justify-between pt-2">
          <div className="flex">
            <div className="" onClick={addPostFile}>
              <PhotographIcon className="menuHoverEffect p-2 text-sky-500 hover:bg-sky-100 h-10 w-10 cursor-pointer" />
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={addSelectedFile}
              />
            </div>
            <EmojiHappyIcon className="menuHoverEffect p-2 text-sky-500 hover:bg-sky-100 h-10 w-10 cursor-pointer" />
          </div>
          <button
            onClick={createPost}
            disabled={!inputText.trim()}
            className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputFeed;
