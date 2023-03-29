import { signIn } from "next-auth/react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import { AiFillApple, AiOutlineCopyrightCircle } from "react-icons/ai";

const SigninWidget = (props) => {
  const openModalHandler = () => {
    props.openModal();
  };

  return (
    <>
      <div className="hidden xl:inline xl:w-[400px] fixed ml-[62rem]">
        <div className="border mt-3 ml-8 rounded-xl">
          <h4 className="pl-4 pt-3 font-bold text-xl text-gray-700">
            New to Twitter?
          </h4>
          <div className="pl-3 pr-8 py-2">
            <p className="text-sm text-gray-500">
              Sign up now to get your own personalized timeline!
            </p>
            <div
              onClick={() => signIn()}
              className="border rounded-full h-10 flex items-center justify-center mt-7 cursor-pointer hover:bg-gray-100 transition duration-200 text-gray-800"
            >
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
            <div
              onClick={openModalHandler}
              className="border rounded-full h-10 flex items-center justify-center mt-4 cursor-pointer hover:bg-gray-100 transition duration-200 text-gray-800"
            >
              <p className="font-semibold ml-1">Create account</p>
            </div>
          </div>
          <p className="pl-3 pt-3 pr-5 pb-4 text-sm leading-5">
            By signing up, you agree to the{" "}
            <span className="text-blue-400 cursor-pointer hover:underline">
              Terms of Service{" "}
            </span>
            and{" "}
            <span className="text-blue-400 cursor-pointer hover:underline">
              Privacy Policy
            </span>
            , including{" "}
            <span className="text-blue-400 cursor-pointer hover:underline">
              Cookie Use
            </span>
            .
          </p>
        </div>
        <div className="pt-3 pl-12 text-[13px] text-gray-500 xl:w-[95%]">
          <p className="">
            This project is made for learning purpose and for the practice and
            implementation of different development concepts
            <a className="hover:underline cursor-pointer flex">
              More
              <DotsHorizontalIcon className="h-4 translate-y-1 ml-1" />
            </a>
            <span className="flex items-center">
              <AiOutlineCopyrightCircle className="pr-0.5 mr-0.5" /> 2023
              Twitter-clone, App.
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SigninWidget;
