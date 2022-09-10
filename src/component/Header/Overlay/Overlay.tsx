import { ReactNode, useEffect } from "react";
import styles from "./overlay.module.css";

interface IOverlay {
  isExpanded: boolean;
  children?: ReactNode;
  fullScreen?: boolean;
}

const Overlay = ({ isExpanded, children, fullScreen = false }: IOverlay) => {
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [isExpanded]);
  return (
    <div
      className={`${styles["overlay"]} ${
        fullScreen && styles["overlay--full-screen"]
      } ${isExpanded ? styles["overlay--visible"] : styles["overlay--hidden"]}`}
    >
      {children}
    </div>
  );
};
export default Overlay;
