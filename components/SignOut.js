import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const SignOut = ({ signOut }) => {
  const Router = useRouter();
  const { data: session } = useSession();

  console.log(session);
  return (
      <div className="py-12 px-8 xl:w-[70%] xl:mx-auto border rounded mt-[100px] flex flex-col items-center justify-center">
        <Image width="45" height="45" src={session.user.image} alt="profile-image" className="rounded-full" />
        <h2 className="font-bold text-5 xl:text-[20px] text-gray-800">
          Sign out from Twitter?
        </h2>
        <div
          onClick={() => signOut({ callbackUrl: "/" })}
          className="border rounded-full h-10 flex items-center justify-center mt-7 px-5 cursor-pointer hover:bg-gray-100 transition duration-200 text-gray-800"
        >
          <p className="font-bold ml-1">Sign Out</p>
        </div>
        <p className="text-gray-500 mt-10">
          Want to keep using Twitter?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:text-blue-500"
            onClick={() => Router.back()}
          >
            Go back
          </span>
        </p>
      </div>
  );
};

export default SignOut;
