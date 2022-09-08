import { HTMLAttributes } from "react";

import styles from "./hamburger.module.css";

interface IHamburger extends HTMLAttributes<HTMLDivElement> {
  isExpanded: boolean;
}

const Hamburger = ({ isExpanded, onClick }: IHamburger) => {
  return (
    <div className={styles["hamburger"]} onClick={onClick}>
      <div
        className={`${styles["dash"]} ${
          isExpanded && styles["dash--selected"]
        }`}
      />
      <div
        className={`${styles["dash"]} ${
          isExpanded && styles["dash--selected"]
        }`}
      />
    </div>
  );
};
export default Hamburger;
