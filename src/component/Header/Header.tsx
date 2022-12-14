// Import styles
import styles from "./header.module.css";

// Import images
import { ReactComponent as ImageMarvelLogo } from "assets/images/marvel_logo.svg";

// Import components
import NavButton from "./NavButton";

// Import library
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "./Hamburger";
import Overlay from "./Overlay";

const navigation = [
  {
    label: "Characters",
    link: "/",
    included: [/^\/$/, /^\/\d+$/],
  },
  {
    label: "Comics",
    link: "/comics",
    included: [/^\/comics$/, /^\/comics\/\d+$/],
  },
];

const TRANSITION_TRIGGER = 30;

const Header = () => {
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const headerEl = headerRef.current;
    if (headerEl === null) return;
    const onScroll = () => {
      if (
        lastScrollY.current - window.scrollY > TRANSITION_TRIGGER ||
        window.scrollY === 0
      ) {
        headerEl.style.transform = "";
      }
      if (window.scrollY - lastScrollY.current > TRANSITION_TRIGGER) {
        headerEl.style.transform = "translateY(-100%)";
      }
      lastScrollY.current = window.scrollY;
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <header className={styles["header"]} ref={headerRef}>
      <Overlay isExpanded={isExpanded}>
        <div className={styles["overlay"]}>
          <ul
            className={`${styles["nav__list"]} ${styles["nav__list--mobile"]}`}
          >
            {navigation.map(({ label, link, included }) => {
              const selected = included.some((expression) => {
                return expression.test(pathname);
              });
              return (
                <Link
                  key={link}
                  to={link}
                  onClick={onToggle}
                  className={`${styles["nav__link"]} ${
                    selected && styles["nav__link--selected"]
                  }`}
                >
                  <li>{label}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </Overlay>
      <Link to={"/"} className={styles["header__logo"]}>
        <ImageMarvelLogo className={styles["header__logo"]} />
      </Link>
      <nav className={styles["header__nav"]}>
        <div className={styles["header__hamburger"]}>
          <Hamburger isExpanded={isExpanded} onClick={onToggle} />
        </div>

        <ul
          className={`${styles["nav__list"]} ${styles["nav__list--desktop"]}`}
        >
          {navigation.map(({ label, link, included }) => {
            const selected = included.some((expression) => {
              return expression.test(pathname);
            });
            return (
              <li key={link}>
                <NavButton to={link} selected={selected}>
                  {label}
                </NavButton>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
