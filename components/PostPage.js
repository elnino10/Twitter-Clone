import Head from "next/head";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { menuItems, menuItemsAuth } from "@/public/assets/data/MenuData";
import PostDetails from "./PostDetails";
import Sidebar from "./Sidebar";
import WidgetSection from "./WidgetSection";

const inter = Inter({ subsets: ["latin"] });

export default function PostPage({ newsData, userData }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState("");
  const { data: session } = useSession();
  const activeMenuRef = useRef(null);

  // sets the active menu
  useEffect(() => {
    setActiveMenuId("m1");
    setIsActive(true);
  }, []);

  // show active menu selected, when authenticated and when not authenticated
  const activeStyleHandler = (menuId) => {
    if (isAuth) {
      menuItems &&
        menuItems.find((menu) => {
          if (menuId === menu.id) {
            setActiveMenuId(menuId);
            setIsActive(true);
          }
        });
    }
    menuItemsAuth &&
      menuItemsAuth.find((menu) => {
        if (menuId === menu.id) {
          setActiveMenuId(menuId);
          setIsActive(true);
        }
      });
  };

  useEffect(() => {
    if (session) {
      setIsAuth(true);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Post page</title>
        <meta name="description" content="Twitter clone app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rl="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="flex min-h-screen mx-auto relative">

          {/* Sidebar */}
          <Sidebar
            isAuth={isAuth}
            ref={activeMenuRef}
            menuItems={menuItems}
            menuItemsAuth={menuItemsAuth}
            isActive={isActive}
            activeMenuId={activeMenuId}
            onActiveStyle={activeStyleHandler}
          />

          {/* Post */}
          <PostDetails />

          {/* Widgets */}
          <WidgetSection
            newsData={newsData}
            userData={userData}
            isAuth={isAuth}
          />
        </div>
      </main>
    </>
  );
}
