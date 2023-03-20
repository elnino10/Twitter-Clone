import { ChevronDownIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import { AiFillApple, AiOutlineCopyrightCircle } from "react-icons/ai";

const SignupSection = () => {
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
            <div className="border rounded-full h-10 flex items-center mt-4 cursor-pointer hover:bg-gray-100 transition duration-200">
              <img
                src="/assets/images/google-icon.png"
                alt="google-logo"
                width="15"
                className="ml-1.5"
              />
              <div className=" flex justify-between ml-2 py-1 w-[90%]">
                <div className="ml-2 leading-3">
                  <p className="font-semibold text-xs">Sign in as Joe</p>
                  <p className="flex items-end text-gray-500 text-xs">
                    phebjoe17@gmail.com{" "}
                    <span>
                      <ChevronDownIcon className="h-3 pl-2" />
                    </span>
                  </p>
                </div>
                {/* google logo */}
                <img
                  src="/assets/images/google-icon.png"
                  alt="google-logo"
                  width="30"
                  className="p-1.5"
                />
              </div>
            </div>
            <div className="border rounded-full h-10 flex items-center justify-center mt-4 cursor-pointer hover:bg-gray-100 transition duration-200 text-gray-800">
              <AiFillApple className="w-6 h-6" />
              <p className="font-semibold ml-1">Sign up with Apple</p>
            </div>
            <div className="border rounded-full h-10 flex items-center justify-center mt-4 cursor-pointer hover:bg-gray-100 transition duration-200 text-gray-800">
              <p className="font-semibold ml-1">Create account</p>
            </div>
          </div>
          <p className="pl-3 pt-3 pr-5 pb-4 text-sm leading-5">
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
        </div>
        <div className="pt-3 pl-12 text-[13px] text-gray-500 xl:w-[95%]">
          <p className="">
            <a className="hover:underline cursor-pointer">Terms of Service</a>{" "}
            <a className="hover:underline cursor-pointer ml-2">
              Privacy Policy
            </a>{" "}
            <a className="hover:underline cursor-pointer ml-2">Cookie Policy</a>
            <br />
            <a className="hover:underline cursor-pointer">Accessibility</a>
            <a className="hover:underline cursor-pointer ml-2">Ads info</a>{" "}
            <a className="hover:underline cursor-pointer flex">
              More
              <DotsHorizontalIcon className="h-4 translate-y-1 ml-1" />
            </a>
            <span className="flex items-center">
              <AiOutlineCopyrightCircle className="pr-0.5 mr-0.5" /> 2023
              Twitter, Inc.
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupSection;
