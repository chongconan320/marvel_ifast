import useGet from "hooks/useGet";
import { Collections } from "component/General";
import { ChangeEvent, useEffect, useState } from "react";
import { ICharacters } from "types/characters";
import { ICharactersRequest } from "types/api";

import List from "component/General/List/List";

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
      <List
        status={status}
        data={characters}
        limit={LIMIT}
        page={page}
        setPage={setPage}
        to={"/"}
      />
    </Collections>
  );
};
export default Characters;
