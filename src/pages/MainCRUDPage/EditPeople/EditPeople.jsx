import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPeople,
  fetchPeopleByID,
  updatePeople,
} from "../../../store/slices/peopleSlice/thunk";
import styles from "./EditPeople.module.css";

const EditPeople = ({ show, onClose, idSec }) => {
  let { singlePerson } = useSelector((state) => state.peopleSlice);

  console.log("singlePerson");
  console.log(singlePerson);

  const dispatch = useDispatch();

  const [first_name, setFirstName] = useState(singlePerson?.first_name || "");
  const [middle_name, setMiddleName] = useState(
    singlePerson?.middle_name || ""
  );
  const [last_name, setLastName] = useState(singlePerson?.last_name || "");
  const [email, setEmail] = useState(singlePerson?.email || "");
  const [Description, setDescription] = useState(
    singlePerson?.description || ""
  );

  useEffect(() => {
    dispatch(fetchPeopleByID(idSec));
  }, [dispatch, idSec]);

  useEffect(() => {
    setFirstName(singlePerson?.first_name || "");
    setMiddleName(singlePerson?.middle_name || "");
    setLastName(singlePerson?.last_name || "");
    setEmail(singlePerson?.email || "");
    setDescription(singlePerson?.description || "");
  }, [singlePerson]);

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

  const UpdateBranchesByIDHandelar = async (id, body) => {
    await dispatch(updatePeople(id, body));
  };

  if (!show) {
    return null;
  }

  const onSubmitHnadelar = (event) => {
    event.preventDefault();

    const newPerson = {
      first_name: first_name || singlePerson?.first_name,
      middle_name: middle_name || singlePerson?.middle_name,
      last_name: last_name || singlePerson?.last_name,
      email: email || singlePerson.email,
      description: Description || singlePerson?.description,
    };

    UpdateBranchesByIDHandelar([idSec, newPerson]);

    onClose();

    dispatch(fetchAllPeople());
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal} ref={menuRef}>
        <form className={styles.form} onSubmit={onSubmitHnadelar}>
          <div className={styles.search}>
            <div>Edit Person Data</div>
            <button onClick={onClose} className={`${styles.btnClose}`}>
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
                  value={first_name}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div className={styles["form-inputs"]}>
                <label htmlFor="middle_name">Middle Name</label>
                <input
                  type="text"
                  id="middle_name"
                  placeholder="Enter Middle Name"
                  required
                  value={middle_name}
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                  }}
                />
              </div>

              <div className={styles["form-inputs"]}>
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Enter Last Name"
                  required
                  value={last_name}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <div className={styles["form-inputs"]}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className={styles["form-inputs"]}>
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  id="Description"
                  placeholder="Enter Description"
                  required
                  value={Description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
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

export default EditPeople;
