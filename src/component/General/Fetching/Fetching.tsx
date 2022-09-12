import styles from "./fetching.module.css";
import SpinningWeb from "../SpinningWeb";
const Fetching = () => {
  return (
    <div className={styles["collections__loading"]}>
      <SpinningWeb />
    </div>
  );
};

export default Fetching;
