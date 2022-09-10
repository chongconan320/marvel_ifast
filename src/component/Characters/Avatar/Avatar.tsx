import styles from "./avatar.module.css";
import ImageNotFound from "assets/images/marvel_logo.svg";
interface IAvatar {
  id: number;
  name: string;
  thumbnail: string;
}
const Avatar = ({ id, name, thumbnail }: IAvatar) => {
  const src =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? ""
      : thumbnail;
  return (
    <div className={styles["avatar"]}>
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
    </div>
  );
};

export default Avatar;
