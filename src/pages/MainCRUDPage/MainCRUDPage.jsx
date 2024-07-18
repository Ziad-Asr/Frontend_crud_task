import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Tabel from "../../components/Tabel/Tabel";
import styles from "./MainCRUDPage.module.css";
import { useDispatch } from "react-redux";
import { fetchAllPeople } from "../../store/slices/peopleSlice/thunk";
import AddPeople from "./AddPeople/AddPeople";

const MainCRUDPage = () => {
  const dispatch = useDispatch();

  const [showAddComponent, setShowAddComponent] = useState(false);

  const handleAddBranchClick = () => {
    setShowAddComponent(true);
  };

  useEffect(() => {
    dispatch(fetchAllPeople());
  }, []);

  return (
    <div className={styles["main-crud-page"]}>
      <Header onAdd={handleAddBranchClick} />
      <AddPeople
        show={showAddComponent}
        onClose={() => {
          setShowAddComponent(false);
          dispatch(fetchAllPeople());
        }}
      />
      <Tabel />
    </div>
  );
};

export default MainCRUDPage;
