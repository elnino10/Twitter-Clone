import Image from "next/image";
import Link from "next/link";
import { AiFillApple, AiOutlineClose } from "react-icons/ai";

const Signup = ({ closeModal }) => {
  const onCloseModal = () => {
    closeModal();
  };

  return (
    <div className="h-full xl:rounded-xl xl:w-[600px] xl:h-[600px] xl:px-[70px]">
      <div className="p-4 flex">
        <AiOutlineClose
          className="h-7 w-7 xl:-ml-20 hover:bg-gray-200 rounded-full p-1.5 transition duration-200 cursor-pointer"
          onClick={onCloseModal}
        />
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREv2iK0rk8t7xPQQx_G-SKoUNao4VpV5ywoF6VdVJZZQ&s"
          alt="twitter-logo"
          width="30"
          height="30"
          className="ml-[8.5rem] xl:ml-[230px]"
        ></Image>
      </div>
      <div className="pt-28 px-8 xl:pt-20">
        <h2 className="font-bold text-[25px] text-gray-800">
          Join Twitter today
        </h2>
        <div className="border rounded-full h-10 flex items-center justify-center mt-7 cursor-pointer hover:bg-gray-100 transition duration-200 text-gray-800">
          <Image
            src="/assets/images/google-icon.png"
            alt="google-logo"
            width="30"
            height="30"
            className="p-1.5"
          />
          <p className="font-semibold ml-1">Sign up with Google</p>
        </div>
        <div className="border rounded-full h-10 flex items-center justify-center mt-5 cursor-pointer hover:bg-gray-100 transition duration-200 text-gray-800">
          <AiFillApple className="w-6 h-6" />
          <p className="font-semibold ml-1">Sign up with Apple</p>
        </div>
        <div className="flex justify-center items-center mt-3">
          <div className="border border-gray-300 flex flex-grow"></div>
          <div className="mx-2">or</div>
          <div className="border border-gray-300 flex flex-grow"></div>
        </div>
        <div className="rounded-full bg-gray-900 text-white font-bold flex items-center justify-center py-1.5 mt-4">
          Create account
        </div>
        <p className="pl-3 pt-3 pr-5 pb-4 text-[13px] leading-4 text-gray-500">
          By signing up, you agree to the{" "}
          <a
            href="https://twitter.com/tos"
            className="hover:underline text-blue-400"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://twitter.com/privacy"
            className="hover:underline text-blue-400"
          >
            Privacy Policy
          </a>
          , including{" "}
          <a
            href="https://help.twitter.com/rules-and-policies/twitter-cookies"
            className="hover:underline text-blue-400"
          >
            Cookie Use
          </a>
          .
        </p>
        <p className="text-gray-500 mt-8">
          Have an account already?{" "}
          <span className="text-blue-400">
            <Link href="/auth/signin">Log in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
