import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import styles from "./AddPeople.module.css";
import {
  createPeople,
  fetchAllPeople,
} from "../../../store/slices/peopleSlice/thunk";

const AddPeople = ({ show, onClose }) => {
  let menuRef = useRef();

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

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
  }, [onClose]);

  const dispatch = useDispatch();

  if (!show) {
    return null;
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const form = event.target;

    const first_name = form["first_name"].value;
    const middle_name = form["middle_name"].value;
    const last_name = form["last_name"].value;
    const email = form["email"].value;
    const Description = form["Description"].value;

    let newPerson = {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      email: email,
      description: Description,
      dob: getFormattedDate(),
    };

    await dispatch(createPeople(newPerson));

    onClose();

    dispatch(fetchAllPeople());
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal} ref={menuRef}>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.search}>
            <div>Add</div>
            <button
              onClick={onClose}
              className={`${styles.btnClose} btn-close`}
            >
              X
            </button>
          </div>
          <div className={styles["forms-holder-1"]}>
            <div className={styles["form-holder"]}>
              <div className={styles["form-inputs"]}>
                <label htmlFor="first_name">Fisrt Name</label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="Enter First Name"
                  required
                />
              </div>

              <div className={styles["form-inputs"]}>
                <label htmlFor="middle_name">Middle Name</label>
                <input
                  type="text"
                  id="middle_name"
                  placeholder="Enter Middle Name"
                  required
                />
              </div>

              <div className={styles["form-inputs"]}>
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Enter Last Name"
                  required
                />
              </div>

              <div className={styles["form-inputs"]}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div className={styles["form-inputs"]}>
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  id="Description"
                  placeholder="Enter Description"
                  required
                />
              </div>
            </div>
            <button className={styles["save-button"]} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPeople;
