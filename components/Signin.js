import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillApple } from "react-icons/ai";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { signinState } from "@/atom/modalAtom";

const Signin = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const inputRef = useRef(null);
  const router = useRouter();

  const [signinClicked, setSigninClicked] = useRecoilState(signinState);

  useEffect(() => {
    if (signinClicked) {
      props.signIn(props.provider.id, { callbackUrl: "/" })
    }
  }, [props, signinClicked]);

  // removes the effect of clicking on the input by clicking on it's parent element
  const removeClickEffect = (e) => {
    e.preventDefault();
    const dataValue = e.currentTarget.getAttribute("data-value");
    const inputValue = inputRef.current.value;
    if (dataValue !== "input") {
      setIsClicked(false);
    }
    if (inputValue.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  // shows that the input section was clicked
  const clickHandler = (e) => {
    e.stopPropagation();
    inputRef.current && inputRef.current.focus();
    const dataValue = e.currentTarget.getAttribute("data-value");
    if (dataValue === "input") {
      setIsClicked(true);
    }
  };

  // set signinState to true if clicked
  const signinClickHandler = () => {
    setSigninClicked(true);
  };

  let display = "hidden";

  return (
    <div className="">
      <div className="xl:hidden py-10 border-b flex items-center h-10">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREv2iK0rk8t7xPQQx_G-SKoUNao4VpV5ywoF6VdVJZZQ&s"
          alt="twitter-logo"
          width="30"
          height="30"
          className="mx-auto"
        />
      </div>
      <div
        className="flex flex-col items-center h-full xl:rounded-xl xl:w-[600px] xl:h-[600px] xl:px-[70px] mx-auto mt-5 xl:mt-10 px-5 xl:border xl:shadow"
        data-value="parent"
        onClick={removeClickEffect}
      >
        <div className="hidden xl:block py-10 items-center h-10">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREv2iK0rk8t7xPQQx_G-SKoUNao4VpV5ywoF6VdVJZZQ&s"
            alt="twitter-logo"
            width="30"
            height="30"
            className="mx-auto"
          />
        </div>
        <ArrowLeftIcon
          className="h-10 w-10 p-2.5 mr-auto hover:bg-gray-200 rounded-full transition duration-200 cursor-pointer"
          onClick={() => router.back()}
        />
        <div className="pt-5 px-8">
          <h2 className="font-bold text-md xl:text-[25px] text-gray-800">
            Sign in to continue on Twitter
          </h2>
          <div
            onClick={
              /*() =>
              props.signIn(props.provider.id, { callbackUrl: "/" })*/ signinClickHandler
            }
            className="border rounded-full h-10 flex items-center justify-center mt-7 cursor-pointer hover:bg-gray-100 transition duration-200 text-gray-800"
          >
            <Image
              src="/assets/images/google-icon.png"
              alt="google-logo"
              width="30"
              height="30"
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
            data-value="input"
            className={`border rounded text-gray-500 flex flex-col items-center justify-start py-4 text-lg mt-3 cursor-pointer ${
              isClicked ? "border-blue-400 pl-5 border-2 shadow" : "pl-5"
            }`}
            onClick={clickHandler}
          >
            <label>
              <div
                className={`${
                  isClicked && isEmpty
                    ? "text-sm text-blue-400 -ml-[120px] -translate-y-3.5 -translate-x-2 duration-200"
                    : (!isClicked && !isEmpty) || (isClicked && !isEmpty)
                    ? "text-sm text-gray-500 -ml-[120px] -translate-y-3.5 -translate-x-2.5"
                    : "-ml-[80px]"
                }`}
              >
                <span>Phone, email, or username</span>
              </div>
            </label>
            <div
              className={`${
                !isClicked && !isEmpty
                  ? (display = "flex items-start mb-2  relative")
                  : !isClicked && isEmpty
                  ? display
                  : "py-0.5"
              }`}
            >
              <input
                ref={inputRef}
                type="text"
                className="w-[280px] h-5 absolute px-0 -ml-[150px] -mt-2 border-none bg-sky-100 text-lg text-gray-800 focus:outline-none"
              />
            </div>
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
    </div>
  );
};

export default Signin;
