import { useState } from "react";

import styles from "./hamburger.module.css";

const Hamburger = () => {
  const [isToggle, setIsToggle] = useState(false);

  const onToggle = () => {
    setIsToggle((prev) => !prev);
  };
  return (
    <div className={styles["hamburger"]} onClick={onToggle}>
      <div
        className={`${styles["dash"]} ${isToggle && styles["dash--selected"]}`}
      />
      <div
        className={`${styles["dash"]} ${isToggle && styles["dash--selected"]}`}
      />
    </div>
  );
};
export default Hamburger;
