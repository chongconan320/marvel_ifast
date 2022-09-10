import styles from "./avatar.module.css";
import Image_CaptainAmerica from "assets/images/marvel.jpeg";

const Avatar = () => {
  return (
    <div className={styles["avatar"]}>
      <figure className={styles["avatar__figure"]}>
        <img alt={"Captain America"} src={Image_CaptainAmerica} />{" "}
      </figure>
      <span className={styles["avatar__name"]}>Captain America</span>
    </div>
  );
};

export default Avatar;
