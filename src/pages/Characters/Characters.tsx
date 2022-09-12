import useGet, { Status } from "hooks/useGet";
import { Avatar } from "component/Characters";
import styles from "./characters.module.css";
import { Collections, Pagination, Fetching } from "component/General";
import { ChangeEvent, useEffect, useState } from "react";
import { ICharacters } from "types/characters";
import { ICharactersRequest } from "types/api";
import { ReactComponent as MarvelLogo } from "assets/images/marvel_logo.svg";
import { useParams } from "react-router-dom";

const LIMIT = 8;

const Characters = () => {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<ICharactersRequest>({
    offset: (page - 1) * LIMIT,
    limit: LIMIT,
    nameStartsWith: undefined,
  });

  const [characters, status] = useGet<ICharacters, ICharactersRequest>(
    "characters",
    options
  );

  const [searchingInput, setSearchingInput] = useState("");

  const onSearchingInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchingInput(e.target.value);
  };
  const onSearchClicked = () => {
    setOptions((prev) => ({
      ...prev,
      nameStartsWith: searchingInput === "" ? undefined : searchingInput,
      offset: 0,
    }));
  };

  useEffect(() => {
    setOptions((prev) => {
      return { ...prev, offset: (page - 1) * LIMIT };
    });
  }, [page]);

  return (
    <Collections
      searchingInput={searchingInput}
      onSearchClickedCallback={onSearchClicked}
      onSearchingInput={onSearchingInput}
    >
      {status === Status.idle && <Fetching />}
      {status === Status.complete && (
        <>
          {characters!.data.total === 0 && (
            <div className={styles["collections__not-found"]}>
              <MarvelLogo className={styles["not-found__marvel-logo"]} />
              <span>Oop ! No Character found</span>
            </div>
          )}
          {characters!.data.total !== 0 && (
            <>
              <span className={styles["collections__total"]}>
                Total: <span>{characters!.data.total}</span>
              </span>
              <div className={styles["grid"]}>
                {characters!.data.results.map((character) => {
                  const { id, name } = character;
                  return (
                    <Avatar
                      key={id}
                      id={id}
                      name={name}
                      to={`/${id}`}
                      thumbnail={
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension
                      }
                    />
                  );
                })}
              </div>
              <div className={styles["collections__pagination"]}>
                <Pagination
                  totalItems={characters!.data.total}
                  limit={LIMIT}
                  currentPage={page}
                  setCurrentPage={setPage}
                />
              </div>
            </>
          )}
        </>
      )}
      {status === Status.error && "error "}
    </Collections>
  );
};
export default Characters;
