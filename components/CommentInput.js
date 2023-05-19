import { db, storage } from "@/firebase";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import EmojiPicker from "emoji-picker-react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";

const CommentInput = ({ postId }) => {
  const [inputText, setInputText] = useState("");
  const [postFile, setPostFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emojiVisible, setEmojiVisible] = useState(false);
  const textRef = useRef();
  const fileInputRef = useRef();
  const { data: session } = useSession();

  // sets the post text in state
  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  // reads file from drive
  const addSelectedFile = (e) => {
    const reader = new FileReader();
    if (e.target.files) {
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

  // create comment in firestore database
  const createReply = async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
      userId: session.user.userid,
      name: session.user.name,
      username: session.user.username,
      userImage: session.user.image,
      reply: inputText,
      timestamp: serverTimestamp(),
    });

    // create file reference
    const fileRef = ref(storage, `posts/${postId}/${docRef.id}/image`);

    // checking file attachment to post
    if (postFile) {
      await uploadString(fileRef, postFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(fileRef);
        await updateDoc(doc(db, "posts", postId, "comments", docRef.id), {
          fileURL: downloadURL,
        });
      });
    }

    setInputText("");
    setPostFile(null);
    setIsLoading(false);
  };

  // select emoji picker
  const emojiPickerHandler = () => {
    setEmojiVisible((prev) => (prev = !prev));
  };

  const onEmojiClick = (emojiObject) => {
    const currentCursorPosition = textRef.current.selectionStart;
    const newTextInputValue =
      inputText.slice(0, currentCursorPosition) +
      emojiObject.emoji +
      inputText.slice(currentCursorPosition);
    setInputText(newTextInputValue);
    setEmojiVisible(false);
  };

  // cancel the selected file on preview
  const removeImageHandler = () => {
    setPostFile(null);
  };

  return (
    <div>
      <p className="text-gray-500 ml-20">
        Replying to{" "}
        <span className="text-blue-400">@{session?.user.username}</span>
      </p>
      <div className="w-[600px] flex border-b border-gray-200 p-3 space-x-3">
        <Image
          src={session ? session.user.image : "/assets/images/avatar.png"}
          width="48"
          height="48"
          alt="profile-image"
          className="h-11 w-12 rounded-full cursor-pointer hover:brightness-95"
        />
        <div className="w-full divide-y divide-gray-200">
          <div className="">
            <textarea
              className="w-full border-none focus:ring-0 text-lg placeholder-gray-500 tracking-wide min-h-[50px] text-gray-700 bg-inherit"
              rows="2"
              placeholder="Tweet your reply"
              value={inputText}
              onChange={inputHandler}
              ref={textRef}
            ></textarea>
          </div>
          {postFile && (
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
          )}
          <div className="relative flex items-center justify-between pt-2">
            <div className="flex">
              {!isLoading && (
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
                  <div className="">
                    <EmojiHappyIcon
                      onClick={emojiPickerHandler}
                      className="menuHoverEffect p-2 text-sky-500 hover:bg-sky-100 h-10 w-10 cursor-pointer"
                    />
                    <div
                      className={`absolute z-40 translate-y-[-440px] shadow-lg border border-gray-300 rounded-lg ${
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
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={createReply}
              disabled={!inputText.trim()}
              className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50"
            >
              {isLoading ? "Sending reply" : "Reply"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
