import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

import styles from "./navButton.module.css";

interface INavButton extends LinkProps {
  children: ReactNode;
  selected?: boolean;
}

const NavButton = ({
  children,
  selected = false,
  ...LinkProps
}: INavButton) => {
  return (
    <Link
      {...LinkProps}
      className={`${styles["navButton"]} ${
        selected ? styles["navButton--selected"] : styles["navButton--inactive"]
      }`}
    >
      <span
        className={`${styles["navButton__label"]} ${
          selected
            ? styles["navButton__label--selected"]
            : styles["navButton__label--inactive"]
        }`}
      >
        {children}
      </span>
    </Link>
  );
};
export default NavButton;
