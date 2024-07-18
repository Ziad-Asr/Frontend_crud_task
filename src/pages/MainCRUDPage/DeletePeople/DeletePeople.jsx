import { useDispatch } from "react-redux";
import styles from "./DeletePeople.module.css";
import { useEffect, useRef } from "react";
import {
  deletePeople,
  fetchAllPeople,
} from "../../../store/slices/peopleSlice/thunk";

const DeleteInvoice = ({ onClose, show, idSec }) => {
  const dispatch = useDispatch();

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const deletePersonByIDHandelar = async (id) => {
    await dispatch(deletePeople(id));
  };

  const onDeleteHandelar = () => {
    deletePersonByIDHandelar(idSec);
    dispatch(fetchAllPeople());
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal} ref={menuRef}>
        <div className={styles.form}>
          <div className={styles["delete-button-wrapper"]}>
            <button onClick={onClose} className={`${styles.btnClose}`}>
              X
            </button>
          </div>
          <div className={styles["confern-delete"]}>
            <h1>Confirm Deletion</h1>
            <button
              className={styles["delete-button"]}
              onClick={onDeleteHandelar}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteInvoice;
