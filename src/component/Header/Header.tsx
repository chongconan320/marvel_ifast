// Import styles
import styles from "./header.module.css";

// Import images
import { ReactComponent as ImageMarvelLogo } from "assets/images/marvel_logo.svg";

// Import components
import NavButton from "./NavButton";

// Import library
import { useLocation } from "react-router-dom";

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
    label: "creators",
    link: "/creators",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className={styles["header"]}>
      <ImageMarvelLogo className={styles["header__logo"]} />
      <nav className={styles["header__nav"]}>
        <ul>
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
