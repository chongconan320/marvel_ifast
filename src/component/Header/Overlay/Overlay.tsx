import { ReactNode } from "react";
import styles from "./overlay.module.css";

interface IOverlay {
  isExpanded: boolean;
  children?: ReactNode;
}

const Overlay = ({ isExpanded, children }: IOverlay) => {
  return (
    <div
      className={`${styles["overlay"]} ${
        isExpanded ? styles["overlay--visible"] : styles["overlay--hidden"]
      }`}
    >
      {children}
    </div>
  );
};
export default Overlay;
