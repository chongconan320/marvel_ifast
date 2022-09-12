import { Status } from "hooks/useGet";
import styles from "./list.module.css";
import { Pagination, Fetching } from "component/General";
import { Comics, IComic } from "types/comics";
import { ICharacter, ICharacters } from "types/characters";
import { Avatar } from "component/General";
import { ReactComponent as MarvelLogo } from "assets/images/marvel_logo.svg";
import { Dispatch, SetStateAction } from "react";

interface IList<T> {
  status: Status;
  data: T;
  limit: number;
  page: number;
  to: string;
  setPage: Dispatch<SetStateAction<number>>;
}

const instanceOfComic = (result: any): result is IComic => {
  return "title" in result;
};
const instanceOfCharacter = (result: any): result is ICharacter => {
  return "name" in result;
};

const List = ({
  status,
  data,
  limit,
  page,
  to,
  setPage,
}: IList<Comics | ICharacters | null>) => {
  return (
    <>
      {status === Status.idle && <Fetching />}
      {status === Status.complete && (
        <>
          {data!.data.total === 0 && (
            <div className={styles["list__not-found"]}>
              <MarvelLogo className={styles["not-found__marvel-logo"]} />
              <span>Oop ! No Character found</span>
            </div>
          )}

          {data!.data.total !== 0 && (
            <>
              <span className={styles["list__total"]}>
                Total: <span>{data!.data.total}</span>
              </span>
              <div className={styles["grid"]}>
                {data!.data.results.map(({ id, ...itemProps }) => {
                  let label = "";

                  if (instanceOfComic(itemProps)) {
                    label = itemProps.title;
                  }
                  if (instanceOfCharacter(itemProps)) {
                    label = itemProps.name;
                  }
                  return (
                    <Avatar
                      key={id}
                      id={id}
                      name={label}
                      to={`${to}${id}`}
                      thumbnail={
                        itemProps.thumbnail.path +
                        "." +
                        itemProps.thumbnail.extension
                      }
                    />
                  );
                })}
              </div>
              <div className={styles["list__pagination"]}>
                <Pagination
                  totalItems={data!.data.total}
                  limit={limit}
                  currentPage={page}
                  setCurrentPage={setPage}
                />
              </div>
            </>
          )}
        </>
      )}
      {status === Status.error && "error "}
    </>
  );
};

export default List;
