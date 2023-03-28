import { Fragment } from "react";

const Modal = (props) => {
  const closeModalHander = (e) => {
    e.target.id === "container" && props.closeModal();
  };

  return (
    <Fragment>
      {props.isVisible && (
        <div
          onClick={closeModalHander}
          id="container"
          className={`${'xl' ? "xl:fixed xl:inset-0 xl:bg-black xl:bg-opacity-30 xl:flex xl:items-center xl:justify-center xl:rounded-lg" : ""}}`}
        >
          <div className="w-[600px]">
            <div className="bg-white rounded-lg p-5">{props.children}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Modal;
