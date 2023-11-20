import React from "react";
import "./updateannouncement.scss";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useState } from "react";

import { Button } from "@mui/material";

import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const UpdateAnnouncement = ({ announcements }) => {
  const [title, setTitle] = useState(announcements.title);
  const [announcement, setAnnouncement] = useState(announcements.announcement);

  const updateAnnouncement = () => {
    // e.perventDefault();

    if (title === "" || announcement === "") {
      toast.warn("Fill all Required Field", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    const data = {
      id: announcements._id,
      title: title,
      announcement: announcement,
    };
    axios
      .put("/announcement/update", data, config)
      .then((res) => {
        if (res.status === 201) {
          console.log("Announcement Updated Successfully");

          toast.success("Announcement Updated Successfully", {
            position: "top-center",
            autoClose: 4000,
          });
          window.location.reload();
        } else {
          console.log("Please Try Again! Something Went Wrong!!!", res);
          toast.error("Somthing went wrong!", {
            toastId: "error",
            position: "top-center",
            autoClose: 4000,
          });
        }

        // console.log(res);
      })

      .catch((e) => {
        console.log(e);
        toast.error(e.response.data.message);
      });
  };

  return (
    <div>
      <div className="form-title row justify-content-center mb-2 p-2">
        <div className="addfood-heading">
          <h2 className="text-center m-0">Update Food Item</h2>
        </div>
      </div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0, pb: 2 },
          // width: 762,
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <div className="row">
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Food Name"
            width="100%"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            defaultValue={announcements.title}
          />
          <TextField
            required
            multiline
            rows={4}
            maxRows={6}
            id="outlined-required outlined-multiline-static"
            label="Food Description"
            onChange={(e) => {
              setAnnouncement(e.target.value);
            }}
            defaultValue={announcements.announcement}
          />

          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<AddCircleIcon className="fs-3" />}
            onClick={updateAnnouncement}
            data-test="add-btn"
          >
            Update
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdateAnnouncement;
