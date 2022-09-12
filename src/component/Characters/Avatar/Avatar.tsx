import styles from "./avatar.module.css";
import ImageNotFound from "assets/images/marvel_logo.svg";
import { Link } from "react-router-dom";
interface IAvatar {
  id: number;
  name: string;
  thumbnail: string;
  to: string;
}
const Avatar = ({ id, name, thumbnail, to }: IAvatar) => {
  const src =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? ""
      : thumbnail;
  return (
    <Link className={styles["avatar"]} to={to}>
      {src === "" && (
        <figure
          className={`${styles["avatar__figure"]} ${styles["avatar__figure--not-found"]}`}
        >
          <img alt={`Character ${id}`} src={ImageNotFound} />
        </figure>
      )}
      {src !== "" && (
        <figure className={styles["avatar__figure"]}>
          <img alt={`Character ${id}`} src={src} />
        </figure>
      )}

      <span className={styles["avatar__name"]}>{name}</span>
    </Link>
  );
};

export default Avatar;
