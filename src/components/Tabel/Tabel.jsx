import { useEffect, useState } from "react";
import { fetchAllPeople } from "../../store/slices/peopleSlice/thunk";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Grid } from "@mui/material";
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
      flex: 2,
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
      <Grid container justifyContent="center">
        <Grid item xs={10} md={12} lg={8}>
          <Box
            sx={{
              height: { xs: 400, md: 590 },
              minWidth: 900,
              mx: "auto",
              marginTop: 2,
              marginBottom: 2,
              backgroundColor: "rgb(239, 239, 239)",
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tabel;
