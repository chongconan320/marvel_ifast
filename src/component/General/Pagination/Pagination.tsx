import styles from "./pagination.module.css";

import { Dispatch, SetStateAction, useState, ChangeEvent } from "react";
import { ReactComponent as IconArrowLeft } from "assets/icons/arrow-left.svg";

interface IPagination {
  totalItems: number;
  limit: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  totalItems,
  limit,
  currentPage,
  setCurrentPage,
}: IPagination) => {
  const totalPage = Math.ceil(totalItems / limit);

  const [page, setPage] = useState<number>(currentPage);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (isNaN(Number(value))) return;
    if (Number(value) > totalPage) {
      setPage(totalPage);
      return;
    }
    setPage(Number(value));
  };

  const onApplyClick = () => {
    setCurrentPage(page);
  };
  const onPreviousClick = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const onNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <ul className={styles["pagination"]}>
      {currentPage !== 1 && (
        <li>
          <IconArrowLeft
            className={styles["pagination__arrow"]}
            onClick={onPreviousClick}
          />
        </li>
      )}
      <li>
        <input
          inputMode="numeric"
          className={styles["pagination__input"]}
          value={page}
          type={"text"}
          onChange={onInputChange}
        />
        <div className={styles["pagination__apply"]} onClick={onApplyClick}>
          apply
        </div>
      </li>
      <li>/</li>
      <li>{totalPage}</li>
      {currentPage !== totalPage && (
        <li>
          <IconArrowLeft
            onClick={onNextClick}
            className={`${styles["pagination__arrow"]} ${styles["pagination__arrow--right"]}`}
          />
        </li>
      )}
    </ul>
  );
};
export default Pagination;
