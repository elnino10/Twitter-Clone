import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

const SignOut = ({ signOut }) => {
  const Router = useRouter();
  const { date: session } = useSession();

  console.log(session);
  return (
    <Fragment className="xl:w-full">
      <div className="py-12 px-8 xl:w-[50%] xl:px-[300px] border rounded mt-[50px] flex flex-col items-center justify-center">
        <img src={""} alt="profile-image" />
        <h2 className="font-bold text-5 xl:text-[25px] text-gray-800">
          Want to sign out from Twitter?
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
    </Fragment>
  );
};

export default SignOut;
