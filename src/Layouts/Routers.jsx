import { Routes, Route } from "react-router-dom";
import MainCRUDPage from "../pages/MainCRUDPage/MainCRUDPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<MainCRUDPage />} />
    </Routes>
  );
};

export default Routers;
