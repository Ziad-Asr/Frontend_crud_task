import { GrFormAdd } from "react-icons/gr";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <div className={styles["header-title"]}>MainCRUDPage</div>

      <div>
        <button className={styles["add-button"]} onClick={props.onAdd}>
          <span className={styles["add-text"]}>Add</span>{" "}
          <GrFormAdd className={styles["add-icon"]} />
        </button>
      </div>
    </div>
  );
};

export default Header;
