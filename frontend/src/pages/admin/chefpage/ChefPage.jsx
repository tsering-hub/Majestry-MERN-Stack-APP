import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaUserAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import AddBoxRounded from "@mui/icons-material/AddBoxRounded";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddChef from "../../../components/addchef/AddChef";
import { BsTrashFill } from "react-icons/bs";
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const columns = [
  { field: "username", headerName: "Username", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 210 },
  { field: "contactno", headerName: "Contact Number", width: 150 },
  { field: "gender", headerName: "Gender", width: 130 },
  { field: "dob", headerName: "Date Of Birth", width: 150 },
];

const Chefpage = () => {
  const [chefs, setChefs] = useState([]);

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  // add chefs
  const [openadd, setOpenadd] = React.useState(false);
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);

  useEffect(() => {
    axios.get("/users/getchefs", config).then((res) => {
      setChefs(res.data.chefs);
    });
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div className="d-flex align-items-center justify-content-center">
          <FaUserAlt className="mb-2 me-2 fs-4" />
          <h4>Chefs</h4>
        </div>
        <div className="d-flex justify-content-between">
          <Button
            variant="contained"
            onClick={handleOpenadd}
            endIcon={<AddBoxRounded />}
          >
            Add Chef
          </Button>
          {/* <Button
            variant="contained"
            endIcon={<BsTrashFill />}
            className="bg-danger ms-3"
          >
            Delete
          </Button> */}
        </div>
        <Modal
          open={openadd}
          onClose={handleCloseadd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <AddChef></AddChef>
          </Box>
        </Modal>
      </div>
      <hr />
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={chefs}
          columns={columns}
          getRowId={(row) => row.email}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
        />
      </div>
    </div>
  );
};

export default Chefpage;
