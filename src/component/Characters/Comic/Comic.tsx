import useGet, { Status } from "hooks/useGet";
import { Comics as IComics } from "types/comics";
import styles from "./comic.module.css";

interface IComic {
  id: number;
  name: string;
}

const Comic = ({ id, name }: IComic) => {
  const [comic, status] = useGet<IComics>(`/comics/${id}`);

  return (
    <figure className={styles["comic"]}>
      {status === Status.complete && (
        <img
          src={
            comic!.data.results[0].thumbnail.path +
            "." +
            comic!.data.results[0].thumbnail.extension
          }
          alt={name}
        />
      )}
      <figcaption>{name}</figcaption>
    </figure>
  );
};
export default Comic;
