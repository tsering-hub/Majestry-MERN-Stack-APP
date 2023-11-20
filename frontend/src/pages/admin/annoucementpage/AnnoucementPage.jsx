import * as React from "react";
import "./announcement.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddBoxRounded from "@mui/icons-material/AddBoxRounded";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { FaRegCommentAlt } from "react-icons/fa";
import AddAnnouncement from "../../../components/addanouncement/AddAnnouncement";
import UpdateAnnouncement from "../../../components/updateannouncement/UpdateAnnouncement";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [view, setView] = React.useState(false);
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);

  // add food
  const [openadd, setOpenadd] = React.useState(false);
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);

  // update food
  const [openUpdate, setOpenupdate] = React.useState(false);
  const handleOpenupdate = () => setOpenupdate(true);
  const handleCloseupdate = () => setOpenupdate(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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

  useEffect(() => {
    axios.get("/announcement/get", config).then((res) => {
      console.log(res.data);
      setAnnouncements(res.data.data);
    });
  }, []);

  const deleteAnnouncement = (id, e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/announcement/delete/${id}`, config)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          toast.success(
            result.data.msg,
            { toastId: "Delete Success" },
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          );
        } else {
          toast.error("Somthing went wrong!", {
            toastId: "error",
            autoClose: 4000,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response.data.message);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div className="d-flex align-items-center justify-content-center">
          <FaRegCommentAlt className="mb-2 me-2 fs-4" />
          <h4>Announcement</h4>
        </div>
        <Button
          variant="contained"
          onClick={handleOpenadd}
          endIcon={<AddBoxRounded />}
        >
          Add Announcement
        </Button>
        <Modal
          open={openadd}
          onClose={handleCloseadd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <AddAnnouncement></AddAnnouncement>
          </Box>
        </Modal>
      </div>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-primary">
            <TableRow>
              <TableCell align="center" className="text-white">
                Title
              </TableCell>
              <TableCell align="center" className="text-white">
                Annoucement
              </TableCell>

              <TableCell align="center" className="text-white">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.title}</TableCell>

                <TableCell align="center">{row.announcement}</TableCell>
                <TableCell align="center">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <button
                      onClick={handleOpenupdate}
                      className="update--btn m-2"
                    >
                      Update&nbsp; <BsPencilSquare size={15} />
                    </button>
                    <Modal
                      open={openUpdate}
                      onClose={handleCloseupdate}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style2}>
                        <UpdateAnnouncement
                          announcements={row}
                        ></UpdateAnnouncement>
                      </Box>
                    </Modal>
                    <button onClick={handleOpen} className="delete--btn m-2">
                      Delete &nbsp; <BsTrashFill size={15} />
                    </button>
                    <Modal
                      open={view}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Are you sure you want to delete this Announcement?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <div className="d-flex align-items-center ">
                            <button
                              className="update--btn"
                              onClick={(e) => deleteAnnouncement(row._id, e)}
                              data-test="yes-btn"
                            >
                              Yes &nbsp; <BsCheckLg />
                            </button>
                            <button
                              onClick={handleClose}
                              className="delete--btn "
                            >
                              No &nbsp; <ImCross />
                            </button>
                          </div>
                        </Typography>
                      </Box>
                    </Modal>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AnnouncementPage;
