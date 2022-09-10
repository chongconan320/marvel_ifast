import { ReactComponent as Web } from "assets/icons/web.svg";
import styles from "./spinningWeb.module.css";

const SpinningWeb = () => {
  return (
    <div className={styles["spinning-web"]}>
      <Web className={styles["spinning-web__web"]} />
      <span className={styles["spinning-web__label"]}>Searching</span>
    </div>
  );
};
export default SpinningWeb;
