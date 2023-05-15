/* eslint-disable react/display-name */
import Image from "next/image";
import { useSession } from "next-auth/react";
import SidebarMenu from "./SidebarMenu";
import Link from "next/link";
import { DotsHorizontalIcon } from "@heroicons/react/outline";

const Sidebar = ({
  isAuth,
  menuItems,
  menuItemsAuth,
  isActive,
  activeMenuId,
  onActiveStyle,
}) => {
  const { data: session } = useSession();

  return (
    <div className="hidden sm:flex flex-col px-8 xl:items-start fixed h-full xl:ml-24">
      <div className="hover:bg-blue-100 xl:ml-2 rounded-full p-4">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREv2iK0rk8t7xPQQx_G-SKoUNao4VpV5ywoF6VdVJZZQ&s"
          alt="twitter-logo"
          width="30"
          height="30"
        />
      </div>
      {isAuth ? (
        <div className="mt-1 mb-2.5 xl:items-start">
          {/* Sidebar menu */}
          {menuItems &&
            menuItems.map((menuItem) => (
              <SidebarMenu
                key={menuItem.id}
                id={menuItem.id}
                text={menuItem.text}
                icon={menuItem.icon}
                onActiveStyle={onActiveStyle}
                isActive={isActive}
                activeMenu={activeMenuId}
              />
            ))}
        </div>
      ) : (
        <div className="mt-1 mb-2.5 xl:items-start">
          {/* Sidebar menu */}
          {menuItemsAuth?.map((menuItem) => (
            <SidebarMenu
              key={menuItem.id}
              id={menuItem.id}
              text={menuItem.text}
              icon={menuItem.icon}
              onActiveStyle={onActiveStyle}
              isActive={isActive}
              activeMenu={activeMenuId}
            />
          ))}
        </div>
      )}
      {isAuth && (
        <button className="bg-blue-500 text-white rounded-full w-[150px] h-[50px] font-bold shadow-md hover:brightness-90 text-lg hidden xl:inline xl:mt-1">
          Tweet
        </button>
      )}
      {isAuth && (
        <Link
          href="/auth/signout"
          className="menuHoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto mb-2 ml-2 xl:ml-1 relative"
        >
          <Image
            width="48"
            height="48"
            src={session?.user.image}
            alt="profile-image"
            className="rounded-full xl:mr-2 peer"
          />
          <div className="leading-5 hidden xl:inline peer">
            <h4 className="font-bold">{session?.user.name}</h4>
            <p className="text-gray-500">@{session?.user.username}</p>
          </div>
          <DotsHorizontalIcon className="h-5 ml-2 hidden xl:inline peer" />
          <span className="text-xs bg-gray-600 text-white rounded p-1 invisible peer-hover:visible delay-300 ease-in absolute translate-x-2 translate-y-[-50px]">
            Sign Out
          </span>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
