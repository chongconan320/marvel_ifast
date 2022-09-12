import useGet from "hooks/useGet";
import { Collections } from "component/General";
import { ChangeEvent, useEffect, useState } from "react";
import { IComicsRequest } from "types/api";
import { Comics as IComics } from "types/comics";
import List from "component/General/List/List";

const LIMIT = 8;

const Comics = () => {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<IComicsRequest>({
    offset: (page - 1) * LIMIT,
    limit: LIMIT,
    titleStartsWith: undefined,
  });

  const [comics, status] = useGet<IComics, IComicsRequest>("comics", options);

  const [searchingInput, setSearchingInput] = useState("");

  const onSearchingInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchingInput(e.target.value);
  };
  const onSearchClicked = () => {
    setOptions((prev) => ({
      ...prev,
      titleStartsWith: searchingInput === "" ? undefined : searchingInput,
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
        data={comics}
        limit={LIMIT}
        page={page}
        setPage={setPage}
        to={"/comics/"}
      />
    </Collections>
  );
};
export default Comics;
