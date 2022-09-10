import styles from "./collections.module.css";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import FloatingCircle from "./FloatingCircle";
import Overlay from "component/Header/Overlay";
import SearchBar from "../SearchBar";

interface ICollection {
  children: ReactNode;
}

const Collection = ({ children }: ICollection) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchingInput, setSearchingInput] = useState("");
  const onOverlayToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  const onSearchingInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchingInput(e.target.value);
  };
  const onSearchClicked = () => {
    setIsExpanded(false);
  };

  useEffect(() => {
    setSearchingInput("");
  }, [isExpanded]);

  return (
    <main className={styles["collections"]}>
      <Overlay isExpanded={isExpanded} fullScreen>
        <div
          className={styles["overlay-content__close"]}
          onClick={onOverlayToggle}
        />

        <div className={styles["collections__overlay-content"]}>
          <div className={styles["overlay-content__search-bar"]}>
            <SearchBar value={searchingInput} onChange={onSearchingInput} />
          </div>
          <button
            className={styles["overlay-content__button"]}
            onClick={onSearchClicked}
          >
            Search
          </button>
        </div>
      </Overlay>
      <div className={styles["collections__floating-circle"]}>
        <FloatingCircle onClick={onOverlayToggle} />
      </div>
      <div className={styles["collections__content"]}>
        <div className={styles["content__search-bar"]}>
          <SearchBar value={searchingInput} onChange={onSearchingInput} />
        </div>
        {children}
      </div>
    </main>
  );
};

export default Collection;
