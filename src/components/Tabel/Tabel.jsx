import { useEffect, useState } from "react";
import { fetchAllPeople } from "../../store/slices/peopleSlice/thunk";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import DeletePeople from "../../pages/MainCRUDPage/DeletePeople/DeletePeople";
import EditPeople from "./../../pages/MainCRUDPage/EditPeople/EditPeople";

import styles from "./Tabel.module.css";

const Tabel = () => {
  const [rowId, setRowId] = useState(null);
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);

  let { People } = useSelector((state) => state.peopleSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPeople());
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "id",
      cellClassName: "name-column--cell",
      flex: 2,
      headerAlign: "center",
      align: "center",
      Font: "Cairo",
    },
    {
      field: "first_name",
      headerName: "First Name",
      cellClassName: "name-column--cell",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "middle_name",
      headerName: "Middle Name",
      cellClassName: "name-column--cell",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      cellClassName: "name-column--cell",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      cellClassName: "name-column--cell",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dob",
      headerName: "dob",
      cellClassName: "name-column--cell",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "description",
      cellClassName: "name-column--cell",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className={styles["actions-wraper"]}>
          <div
            className={styles["action"]}
            onClick={() => {
              setShowEditComponent(true);
              setRowId(params.row.id);
            }}
          >
            <FaEdit />
          </div>
          <div
            className={styles["action"]}
            onClick={() => {
              setShowDeleteComponent(true);
              setRowId(params.row.id);
            }}
          >
            <AiFillDelete className={styles["delete-icon"]} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          // height: 550,
          height: 590,
          width: "90%",
          mx: "auto",
          marginTop: 2,
          backgroundColor: "white",
        }}
      >
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={People.map((Peoplee) => ({
            id: Peoplee?.id,
            first_name: Peoplee.first_name,
            middle_name: Peoplee.middle_name,
            last_name: Peoplee.last_name,
            email: Peoplee.email,
            dob: Peoplee.dob,
            description: Peoplee.description,
          }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
        <EditPeople
          show={showEditComponent}
          onClose={() => {
            setShowEditComponent(false);
            dispatch(fetchAllPeople());
          }}
          idSec={rowId}
        />
        <DeletePeople
          onClose={() => {
            setShowDeleteComponent(false);
            dispatch(fetchAllPeople());
          }}
          show={showDeleteComponent}
          idSec={rowId}
        />
      </Box>
    </Box>
  );
};

export default Tabel;
