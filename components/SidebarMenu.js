/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useCallback } from "react";
 
const SidebarMenu = (props) => {
  const router = useRouter();
  const menuSelector = useCallback(
    (id) => {
      props.onActiveStyle(id);
    },
    [props]
  );

  const selectMenuHandler = (id) => {
    menuSelector(id);
  };

  return (
    <div
      id={props.id}
      className="menuHoverEffect flex items-center text-gray-900 justify-center xl:justify-start text-xl space-x-3"
      onClick={selectMenuHandler.bind(null, props.id)}
    >
      {props.icon}
      <span
        className={`${
          props.isActive && props.activeMenu === props.id ? "font-bold" : ""
        } hidden xl:inline`}
      >
        {props.text}
      </span>
    </div>
  );
};

export default SidebarMenu;
