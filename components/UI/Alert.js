/* eslint-disable react/display-name */
import {
  cloneElement,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import style from "./Alert.module.css";
import css from "classnames";

const Alert = forwardRef(({ children, type, message }, ref) => {
  const [isShown, setIsShown] = useState(true);
  const closeAlertRef = useRef();

  console.log(closeAlertRef.current);

  const deletePost = () => {
    closeAlertRef.current.click();
  };

  useImperativeHandle(ref, () => {
    return {
      confirmDelete: deletePost,
    };
  });

  const renderElAlert = function () {
    return cloneElement(children);
  };

  // const handleClose = () => {
  //   setIsShown(false);
  // };

  return (
    <div className={css(style.alert, style[type], !isShown && style.hide)}>
      <div>
        <span
          
          className={style.closebtn}
          // onClick={handleClose}
        >
          OK
        </span>
        <span ref={closeAlertRef} className={style.closebtn}>
          &times;
        </span>
      </div>
      {children ? renderElAlert() : message}
    </div>
  );
});

export default Alert;
