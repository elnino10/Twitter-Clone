import { ArrowLeftIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const PostDetails = () => {
  const router = useRouter();

  return (
    <section className="sm:ml-24 xl:ml-[25rem] border-black-100 border-l border-r shadow mt-1 flex-grow max-w-[597px] relative">
      <div className="flex items-center p-2 sticky top-0 bg-white z-40 text-gray-800">
        <ArrowLeftIcon
          onClick={() => router.back()}
          className="h-10 my-1 mr-10 menuHoverEffect"
        />
        <p className="flex  font-bold text-lg">Tweet</p>
      </div>
      {/* <div>
        <div className="flex items-center relative">
          <div className="w-[50px] p-2">
            <Image
              width="50"
              height="50"
              src={post.userImage}
              alt="user-image"
              className="rounded-full w-full"
            />
          </div>
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] cursor-pointer hover:text-gray-700 hover:underline text-ellipsis overflow-hidden">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px] text-gray-500 text-ellipsis overflow-hidden">
              @{post.username}
            </span>
          </div>
          <div
            data-value="panel"
            onClick={toggleActionPanel}
            className="ml-auto flex flex-col relative"
          >
            <DotsHorizontalIcon className="h-10 w-10 menuHoverEffect hover:bg-sky-100 hover:text-sky-500 p-2 peer" />
            <span className="absolute z-40 translate-y-10 ml-0.5 text-xs bg-gray-500 text-white rounded p-1 invisible peer-hover:visible delay-300 ease-in">
              More
            </span>
          </div>
          {panelShown && (
            <div className="translate-x-[435px] w-[100px] translate-y-3 h-auto border py-2 px-4 rounded-md absolute shadow">
              {session?.user.userid === post.userId ? (
                <div className="flex flex-col items-start justify-between">
                  <span
                    onClick={updatePostHandler}
                    className="text-md hover:text-sky-500 cursor-pointer"
                  >
                    Edit
                  </span>
                  <span
                    onClick={alertDisplayHandler}
                    className="text-md hover:text-red-500 cursor-pointer"
                  >
                    Delete
                  </span>
                </div>
              ) : (
                <span className="text-md hover:text-red-500 cursor-pointer">
                  Report
                </span>
              )}
            </div>
          )}
        </div>
      </div> */}
    </section>
  );
};

export default PostDetails;
