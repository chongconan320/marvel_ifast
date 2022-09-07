import { AnchorHTMLAttributes, ReactNode } from "react";

import styles from "./navButton.module.css";

interface INavButton extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  selected?: boolean;
}

const NavButton = ({
  children,
  selected = false,
  ...HTMLAnchorElement
}: INavButton) => {
  return (
    <a
      {...HTMLAnchorElement}
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
    </a>
  );
};
export default NavButton;
