import Image from "next/image";
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
import { useEffect, useState } from "react";

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

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState("m1");

  useEffect(() => {
    setIsActive(true)
  }, []);

  const activeStyleHandler = (menuId) => {
    menuItems.find((menu) => {
      if (menu.id === menuId) {
        setActiveMenuId((prev) => (prev = menu.id));
        setIsActive(true);
      }
    });
  };

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      <div className="hover:bg-blue-100 xl:py-2 xl:ml-2 rounded-full">
        <Image
          src="https://cdn.pixabay.com/photo/2018/06/22/19/03/logo-3491390_960_720.png"
          alt="twitter-logo"
          width="50"
          height="50"
        ></Image>
      </div>
      <div className="mt-4 mb-2.5 xl:items-start">
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
      <button className="bg-blue-500 text-white rounded-full w-[150px] h-[50px] font-bold shadow-md hover:brightness-90 text-lg hidden xl:inline xl:mt-1">Tweet</button>
      <div className="menuHoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto ml-2">
        <img
          src="/assets/images/my-image.jpg"
          alt="profile-image"
          className="w-12 h-12 rounded-full xl:mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Elnino</h4>
          <p className="text-gray-500">@ninocodes</p>
        </div>
        <DotsHorizontalIcon className="h-5 ml-2 hidden xl:inline" />
      </div>
    </div>
  );
};

export default Sidebar;
