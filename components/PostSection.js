import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { menuItems, menuItemsAuth } from "@/public/assets/data/MenuData";
import PostDetails from "./PostDetails";
import Sidebar from "./Sidebar";
import WidgetSection from "./WidgetSection";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import CommentModal from "./CommentModal";
import Backdrop from "./UI/Backdrop";
import { useRecoilState } from "recoil";
import { editPostModalState, modalState } from "@/atom/modalAtom";

const inter = Inter({ subsets: ["latin"] });

export default function PostSection({ newsData, userData }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState("");
  const [postDetails, setPostDetails] = useState();
  const [postLikes, setPostLikes] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [openEditModal, setOpenEditModal] = useRecoilState(editPostModalState)

  const { postId } = router.query;

  // get the post information
  useEffect(() => {
      onSnapshot(doc(db, "posts", postId), (snapShot) =>
        setPostDetails(snapShot)
      );
  }, [postId]);

  // get all likes for a post
  useEffect(() => {
    onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) => {
      setPostLikes(
        snapshot.docs.map((item) => {
          return { ...item, id: item.id };
        })
      );
    });
  }, []);

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
            menuItems={menuItems}
            menuItemsAuth={menuItemsAuth}
            isActive={isActive}
            activeMenuId={activeMenuId}
            onActiveStyle={activeStyleHandler}
          />
          {/* comment modal */}
          <CommentModal />

          {/* Modal Backdrop */}
          {openModal || openEditModal && <Backdrop />}

          {/* Post */}
          <PostDetails
            postId={postId}
            post={postDetails?.data()}
            postLikes={postLikes}
            db={db}
          />

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
