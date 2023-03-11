const SidebarMenu = ({ id, text, icon, activeStyle, isActive }) => {

  console.log(isActive);

  const selectMenuHandler = () => {
    activeStyle()
  };

  return (
    <div className="menuHoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
      {icon}
      <span
        className={`${isActive ? "font-bold" : ""}`}
        onClick={selectMenuHandler}
      >
        {text}
      </span>
    </div>
  );
};

export default SidebarMenu;
