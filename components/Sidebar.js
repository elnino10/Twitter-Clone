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
import { useState } from "react";

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

  const activeStyleHandler = (menuId) => {
    if (menuItems[id] === menuId) setIsActive(true)
  };
  return (
    <div>
      <div className="menuHoverEffect">
        <Image
          src="https://cdn.pixabay.com/photo/2018/06/22/19/03/logo-3491390_960_720.png"
          alt="twitter-logo"
          width="50"
          height="50"
        ></Image>
      </div>
      <div>
        {/* Sidebar menu */}
        {menuItems.map((menuItem) => (
          <SidebarMenu
            key={menuItem.id}
            id={menuItem.id}
            text={menuItem.text}
            icon={menuItem.icon}
            activeStyle={activeStyleHandler.bind(null, menuItem.id)}
            isActive={isActive}
          />
        ))}
      </div>
      <button className="">Tweet</button>
      <div>
        <Image
          src="/assets/images/my-image.jpg"
          alt="profile-image"
          width="50"
          height="50"
        />
        <div className="menuHoverEffect">
          <h4>Elnino</h4>
          <p>@ninocodes</p>
        </div>
        <DotsHorizontalIcon className="h-5" />
      </div>
    </div>
  );
};

export default Sidebar;
