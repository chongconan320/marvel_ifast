import styles from "./collections.module.css";
import { ChangeEvent, ReactNode, useState } from "react";
import FloatingCircle from "./FloatingCircle";
import Overlay from "component/Header/Overlay";
import SearchBar from "../SearchBar";

interface ICollection {
  children: ReactNode;
  searchingInput: string;
  onSearchingInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchClickedCallback: () => void;
}

const Collection = ({
  children,
  searchingInput,
  onSearchingInput,
  onSearchClickedCallback,
}: ICollection) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const onOverlayToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  const onSearchClicked = () => {
    setIsExpanded(false);
    onSearchClickedCallback();
  };
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
            className={`${styles["search-button"]} ${styles["search-button--mobile"]} `}
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
          <SearchBar value={searchingInput} onChange={onSearchingInput} />{" "}
          <button
            className={`${styles["search-button"]} ${styles["search-button--desktop"]}`}
            onClick={onSearchClicked}
          >
            SEARCH
          </button>
        </div>
        {children}
      </div>
    </main>
  );
};

export default Collection;
