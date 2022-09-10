import styles from "./searchBar.module.css";
import { ReactComponent as IconSearch } from "assets/icons/search.svg";
import { InputHTMLAttributes } from "react";

interface ISearchBar extends InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = ({ ...searchBarProps }: ISearchBar) => {
  return (
    <div className={styles["search-bar"]}>
      <input
        className={styles["search-bar__input"]}
        placeholder={"Search"}
        {...searchBarProps}
      />
      <IconSearch className={styles["search-bar__icon"]} />
    </div>
  );
};

export default SearchBar;
