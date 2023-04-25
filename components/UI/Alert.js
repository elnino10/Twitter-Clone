/* eslint-disable react/display-name */
import { cloneElement, forwardRef } from "react";
import style from "./Alert.module.css";
import css from "classnames";

const Alert = forwardRef(
  ({ children, type, message, alertShown, onCloseAlert, onDelete }, ref) => {
    const renderElAlert = function () {
      return cloneElement(children);
    };

    const handleDelete = () => {
      onCloseAlert();
      onDelete();
    };

    return (
      <div className={css(style.alert, style[type], !alertShown && style.hide)}>
        <div>
          <span className={style.closebtn} onClick={handleDelete}>
            OK
          </span>
          <span onClick={() => onCloseAlert()} className={style.closebtn}>
            &times;
          </span>
        </div>
        {children ? renderElAlert() : message}
      </div>
    );
  }
);

export default Alert;
