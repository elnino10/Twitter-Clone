import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";
import { AiOutlineSetting } from "react-icons/ai";

export const menuItems = [
  { id: "m1", text: "Home", icon: <HomeIcon className="h-7" /> },
  {
    id: "m2",
    text: "Trending",
    icon: <HashtagIcon className="h-7" />,
  },
  {
    id: "m3",
    text: "Notifications",
    icon: <BellIcon className="h-7" />,
  },
  {
    id: "m4",
    text: "Messages",
    icon: <InboxIcon className="h-7" />,
  },
  {
    id: "m5",
    text: "Bookmarks",
    icon: <BookmarkIcon className="h-7" />,
  },
  {
    id: "m6",
    text: "Lists",
    icon: <ClipboardIcon className="h-7" />,
  },
  { id: "m7", text: "Profile", icon: <UserIcon className="h-7" /> },
  {
    id: "m8",
    text: "More",
    icon: <DotsCircleHorizontalIcon className="h-7" />,
  },
];

export const menuItemsAuth = [
  {
    id: "m2",
    text: "Trending",
    icon: <HashtagIcon className="h-7" />,
  },
  {
    id: "m9",
    text: "Settings",
    icon: <AiOutlineSetting className="h-7 w-7" />,
  },
];
