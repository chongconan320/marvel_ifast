// Import styles
import styles from "./header.module.css";

// Import images
import { ReactComponent as ImageMarvelLogo } from "assets/images/marvel_logo.svg";

// Import components
import NavButton from "./NavButton";

// Import library
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "./Hamburger";
import Overlay from "./Overlay";
import path from "path";

const navigation = [
  {
    label: "Characters",
    link: "/characters",
  },
  {
    label: "Comics",
    link: "/comics",
  },
  {
    label: "Creators",
    link: "/creators",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const onToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <header className={styles["header"]}>
      <Overlay isExpanded={isExpanded}>
        <div className={styles["overlay"]}>
          <ul
            className={`${styles["nav__list"]} ${styles["nav__list--mobile"]}`}
          >
            {navigation.map(({ label, link }) => (
              <Link
                key={link}
                to={link}
                onClick={onToggle}
                className={`${styles["nav__link"]} ${
                  pathname === link && styles["nav__link--selected"]
                }`}
              >
                <li>{label}</li>
              </Link>
            ))}
          </ul>
        </div>
      </Overlay>
      <ImageMarvelLogo className={styles["header__logo"]} />
      <nav className={styles["header__nav"]}>
        <div className={styles["header__hamburger"]}>
          <Hamburger isExpanded={isExpanded} onClick={onToggle} />
        </div>

        <ul
          className={`${styles["nav__list"]} ${styles["nav__list--desktop"]}`}
        >
          {navigation.map(({ label, link }) => (
            <li key={link}>
              <NavButton to={link} selected={link === pathname}>
                {label}
              </NavButton>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
