import Head from "next/head";
import { Inter } from "next/font/google";
import axios from "axios";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import FeedSection from "@/components/FeedSection";
import WidgetSection from "@/components/WidgetSection";
import { useEffect, useState } from "react";
import Modal from "@/components/UI/Modal";
import SigninModal from "@/components/SigninModal";
import Signup from "@/components/Signup";
import { menuItems, menuItemsAuth } from "@/public/assets/data/MenuData";
import TrendsPage from "@/components/TrendsPage";
import CommentModal from "@/components/CommentModal";
import EditPostModal from "@/components/EditPostModal";
import Backdrop from "@/components/UI/Backdrop";
import { useRecoilState } from "recoil";
import { modalState } from "@/atom/modalAtom";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ newsData, userData }) {
  const [isAuth, setIsAuth] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState("");
  const { data: session } = useSession();

  const [openModal, setOpenModal] = useRecoilState(modalState);

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

  const closeSigninModalHandler = () => {
    setShowSigninModal(false);
  };

  const showSigninModalHandler = () => {
    setShowSigninModal(true);
  };

  const closeSignupModalHandler = () => {
    setShowSignupModal(false);
  };

  const showSignupModalHandler = () => {
    setShowSignupModal(true);
  };

  return (
    <>
      <Head>
        <title>Twitter Clone</title>
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

          {/* Feed */}
          {activeMenuId === "m2" ? (
            <TrendsPage />
          ) : (
            <FeedSection isAuth={isAuth} />
          )}

          {/* Widgets */}
          <WidgetSection
            newsData={newsData}
            userData={userData}
            isAuth={isAuth}
            openModal={showSignupModalHandler}
          />

          {/* Modal */}
          <CommentModal />
          <EditPostModal />

          {/* Modal Backdrop */}
          {openModal && <Backdrop />}

          <Modal
            isVisible={showSigninModal}
            closeModal={closeSigninModalHandler}
          >
            <SigninModal onCloseModal={closeSigninModalHandler} />
          </Modal>
          <Modal
            isVisible={showSignupModal}
            closeModal={closeSignupModalHandler}
          >
            <Signup closeModal={closeSignupModalHandler} />
          </Modal>
        </div>
        {!isAuth && !showSigninModal && (
          /*!showSignupModal &&*/ <div className="hidden bg-sky-500 text-white sticky bottom-0 xl:flex py-1.5">
            <div className="ml-[400px] leading-7">
              <h2 className="font-bold text-[25px]">
                {`Don't miss what's happening`}
              </h2>
              <p className="mb-1">People on Twitter are the first to know</p>
            </div>
            <div className="flex ml-auto mr-40 items-center">
              <div
                onClick={showSigninModalHandler}
                className="hover:bg-blue-400 hover:bg-opacity-50 bg-transparent cursor-pointer rounded-full border border-white text-white font-bold w-[80px] h-10 flex justify-center items-center text-sm pb-0.5 mr-5"
              >
                Log in
              </div>
              <div
                onClick={showSignupModalHandler}
                className="hover:bg-opacity-90 cursor-pointer rounded-full border border-white bg-white text-gray-800 font-bold w-[80px] h-10 flex justify-center items-center text-sm pb-0.5"
              >
                Sign up
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

const newsBaseURL =
  "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";
const usersBaseURL =
  "https://randomuser.me/api/?results=20&inc=name,login,picture";

export const getStaticProps = async () => {
  // News data API
  const response = await axios.get(newsBaseURL);
  const newsData = response.data.articles;

  // Random users API
  const responseData = await axios.get(usersBaseURL);
  const userData = responseData.data.results;

  return {
    props: {
      newsData,
      userData,
    },
    revalidate: 3600 * 3,
  };
};
