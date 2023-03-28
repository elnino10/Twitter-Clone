import Image from "next/image";
import { useSession } from "next-auth/react";
import SidebarMenu from "./SidebarMenu";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { AiOutlineSetting } from "react-icons/ai";
import { useEffect, useState } from "react";
import Link from "next/link";

const menuItems = [
  { id: "m1", text: "Home", icon: <HomeIcon className="h-7" /> },
  { id: "m2", text: "Explore", icon: <HashtagIcon className="h-7" /> },
  { id: "m3", text: "Notifications", icon: <BellIcon className="h-7" /> },
  { id: "m4", text: "Messages", icon: <InboxIcon className="h-7" /> },
  { id: "m5", text: "Bookmarks", icon: <BookmarkIcon className="h-7" /> },
  { id: "m6", text: "Lists", icon: <ClipboardIcon className="h-7" /> },
  { id: "m7", text: "Profile", icon: <UserIcon className="h-7" /> },
  {
    id: "m8",
    text: "More",
    icon: <DotsCircleHorizontalIcon className="h-7" />,
  },
];

const menuItemsAuth = [
  { id: "m2", text: "Explore", icon: <HashtagIcon className="h-7" /> },
  { id: "m9", text: "Settings", icon: <AiOutlineSetting className="h-7 w-7" /> },
];

const Sidebar = ({isAuth}) => {
  const [isActive, setIsActive] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState("");
  const {data: session} = useSession()

  useEffect(() => {
    setActiveMenuId("m2");
    setIsActive(true);
    if (isAuth) {
      setActiveMenuId("m1");
      setIsActive(true);
    }
  }, [isAuth]);

  const activeStyleHandler = (menuId) => {
    if (isAuth) {
      menuItems.find((menu) => {
        if (menu.id === menuId) {
          setActiveMenuId((prev) => (prev = menu.id));
          setIsActive(true);
        }
      });
    }
    menuItemsAuth.find((menu) => {
      if (menu.id === menuId) {
        setActiveMenuId((prev) => (prev = menu.id));
        setIsActive(true);
      }
    });
  };

  return (
    <div className="hidden sm:flex flex-col px-8 xl:items-start fixed h-full xl:ml-24">
      <div className="hover:bg-blue-100 xl:ml-2 rounded-full p-4">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREv2iK0rk8t7xPQQx_G-SKoUNao4VpV5ywoF6VdVJZZQ&s"
          alt="twitter-logo"
          width="30"
          height="30"
        ></Image>
      </div>
      {isAuth ? (
        <div className="mt-1 mb-2.5 xl:items-start">
          {/* Sidebar menu */}
          {menuItems.map((menuItem) => (
            <SidebarMenu
              key={menuItem.id}
              id={menuItem.id}
              text={menuItem.text}
              icon={menuItem.icon}
              activeStyle={activeStyleHandler.bind(null, menuItem.id)}
              isActive={isActive}
              activeMenu={activeMenuId}
            />
          ))}
        </div>
      ) : (
        <div className="mt-1 mb-2.5 xl:items-start">
          {/* Sidebar menu */}
          {menuItemsAuth.map((menuItem) => (
            <SidebarMenu
              key={menuItem.id}
              id={menuItem.id}
              text={menuItem.text}
              icon={menuItem.icon}
              activeStyle={activeStyleHandler.bind(null, menuItem.id)}
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
        <Link href="/signout" className="menuHoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto mb-2 ml-2 xl:ml-1">
          <img
            src={session.user.image}
            alt="profile-image"
            className="w-12 h-12 rounded-full xl:mr-2"
          />
          <div className="leading-5 hidden xl:inline">
            <h4 className="font-bold">{session.user.name}</h4>
            <p className="text-gray-500">@{session.user.username}</p>
          </div>
          <DotsHorizontalIcon className="h-5 ml-2 hidden xl:inline" />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
