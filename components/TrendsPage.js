import { DotsHorizontalIcon, SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import Trending from './Trending';

const TrendsPage = () => {
    return (
        <section className="sm:ml-24 xl:ml-[25rem] border-black-100 border-l border-r shadow mt-1 flex-grow max-w-[597px] relative">
          <div className="flex items-center justify-between sticky top-0 bg-white">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREv2iK0rk8t7xPQQx_G-SKoUNao4VpV5ywoF6VdVJZZQ&s"
              alt="twitter-logo"
              width="30"
              height="30"
              className="xl:hidden p-1 ml-1"
            ></Image>
            <div className="flex items-center justify-between py-1 px-2 my-3 mx-5 xl:p-3  rounded-full relative w-[90%] xl:w-[80%] xl:ml-5">
              <SearchIcon className="h-5 z-50  text-gray-500" />
              <input
                type="text"
                placeholder="Search Twitter"
                className="absolute inset-0 rounded-full pl-10 border-inherit text-gray-500 bg-gray-100 focus:bg-white focus:shadow-lg"
              />
            </div>
            <AiOutlineSetting className="hidden xl:inline xl:h-10 xl:w-10 xl:p-2 xl:mr-5 cursor-pointer hover:bg-gray-200 rounded-full" />
            <DotsHorizontalIcon className="xl:hidden h-7 mx-5" />
          </div>
          <Trending />
          <div className="xl:hidden flex justify-between bg-white sticky bottom-0 p-4">
            <Link
              href="/auth/signin"
              className="rounded-full border border-blue-400 text-blue-400 font-bold w-40 h-8 flex justify-center items-center text-sm mx-2"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full bg-blue-400 text-white font-bold w-40 flex justify-center items-center text-sm mx-2"
            >
              Sign up
            </Link>
          </div>
        </section>
    );
};

export default TrendsPage;