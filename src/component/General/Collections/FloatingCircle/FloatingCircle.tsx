import styles from "./floatingCircle.module.css";
import { ReactComponent as IconSearch } from "assets/icons/search.svg";
import { HTMLAttributes } from "react";

interface IFloatingCircle extends HTMLAttributes<HTMLDivElement> {}

const FloatingCircle = ({ ...floatingCircleProps }: IFloatingCircle) => {
  return (
    <div className={styles["floating-circle"]} {...floatingCircleProps}>
      <IconSearch className={styles["floating-circle__icon"]} />
    </div>
  );
};

export default FloatingCircle;
