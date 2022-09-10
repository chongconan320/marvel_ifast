import useGet, { Status } from "hooks/useGet";
import { Avatar } from "component/Characters";
import styles from "./characters.module.css";
import { Collections, SearchBar } from "component/General";
import SpinningWeb from "component/General/SpinningWeb";
import { useState } from "react";
import { ICharacters } from "types/characters";
import { ICharactersRequest } from "types/api";

const LIMIT = 8;

const Characters = () => {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<ICharactersRequest>({
    offset: (page - 1) * LIMIT,
    limit: LIMIT,
  });

  const [characters, status] = useGet<ICharacters, ICharactersRequest>(
    "characters",
    options
  );
  return (
    <Collections>
      {status === Status.idle && (
        <div className={styles["collections__loading"]}>
          <SpinningWeb />
        </div>
      )}
      {status === Status.complete && (
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
                  thumbnail={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                />
              );
            })}
          </div>
        </>
      )}
      {status === Status.error && "error "}
    </Collections>
  );
};
export default Characters;
