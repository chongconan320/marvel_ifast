// Import styles
import styles from "./header.module.css";

// Import images
import { ReactComponent as ImageMarvelLogo } from "assets/images/marvel_logo.svg";

// Import components
import NavButton from "./NavButton";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <ImageMarvelLogo className={styles["header__logo"]} />
      <nav className={styles["header__nav"]}>
        <ul>
          <li>
            <NavButton href="/">Characters</NavButton>
          </li>
          <li>
            <NavButton href="/">Characters</NavButton>
          </li>
          <li>
            <NavButton href="/">Characters</NavButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
