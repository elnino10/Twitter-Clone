import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillApple, AiOutlineClose } from "react-icons/ai";

const Signin = ({ providers }) => {
  const [clicked, setClicked] = useState(false);
  const inputRef = useRef()
  // console.log(providers);
  console.log(inputRef.current);

  const clickHandler = (event) => {
    
  };

  const removeClickEffect = (event) => {
    if (event.currentTarget.id !== "input") {
      
    }
  };

  return (
    <div className="h-full" onClick={removeClickEffect}>
      <div className="p-4 flex">
        <AiOutlineClose className="h-5 w-5" />
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREv2iK0rk8t7xPQQx_G-SKoUNao4VpV5ywoF6VdVJZZQ&s"
          alt="twitter-logo"
          width="30"
          height="30"
          className="ml-[8.5rem]"
        ></Image>
      </div>
      <div className="pt-12 px-8">
        <h2 className="font-bold text-[25px] text-gray-800">
          Sign in to Twitter
        </h2>
        <div className="border rounded-full h-10 flex items-center justify-center mt-7 cursor-pointer hover:bg-gray-100 transition duration-200 text-gray-800">
          <img
            src="/assets/images/google-icon.png"
            alt="google-logo"
            width="30"
            className="p-1.5"
          />
          <p className="font-semibold ml-1">Sign in with Google</p>
        </div>
        <div className="border rounded-full h-10 flex items-center justify-center mt-5 cursor-pointer hover:bg-gray-100 transition duration-200 text-gray-800">
          <AiFillApple className="w-6 h-6" />
          <p className="font-semibold ml-1">Sign in with Apple</p>
        </div>
        <div className="flex justify-center items-center mt-3">
          <div className="border border-gray-300 flex flex-grow"></div>
          <div className="mx-2">or</div>
          <div className="border border-gray-300 flex flex-grow"></div>
        </div>
        <div
          ref={inputRef}
          className={`border rounded text-gray-500 flex items-center justify-start pl-5 py-4 text-lg mt-3 ${
            clicked ? "border-blue-400  border-2" : ""
          }`}
          onClick={clickHandler}
        >
          <label>
            <div>
              <span>Phone, email, or username</span>
            </div>
          </label>
          <div></div>
        </div>
        <div className="rounded-full bg-gray-900 text-white font-bold flex items-center justify-center py-1.5 mt-5">
          Next
        </div>
        <div className="border border-gray-300 rounded-full font-bold flex items-center justify-center py-1.5 mt-5 text-gray-800">
          Forgot password?
        </div>
        <p className="text-gray-500 mt-10">
          {`Don't have an account?`}{" "}
          <span className="text-blue-400">
            <Link href="/auth/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
