import { useCallback } from "react";

const SidebarMenu = ({ id, text, icon, activeStyle, isActive, activeMenu }) => {
  const menuSelector = useCallback(() => {
    activeStyle();
  }, [activeStyle]);

  const selectMenuHandler = () => {
    menuSelector();
  };

  return (
    <div
      className="menuHoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3"
      onClick={selectMenuHandler}
    >
      {icon}
      <span
        className={`${
          isActive && activeMenu === id ? "font-bold" : ""
        } hidden xl:inline`}
      >
        {text}
      </span>
    </div>
  );
};

export default SidebarMenu;
