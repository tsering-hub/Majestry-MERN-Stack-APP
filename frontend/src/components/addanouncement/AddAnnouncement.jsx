import React from "react";
import "./addannouncement.scss";
import Box from "@mui/material/Box";
import { Theme, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useState, useEffect } from "react";

import { Button } from "@mui/material";

import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const AddAnnouncement = () => {
  const theme = useTheme();

  const [title, setTitle] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const addanounce = () => {
    // e.perventDefault();

    if (title === "" || announcement === "") {
      toast.warn("Fill all Required Field", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    const data = {
      title: title,
      announcement: announcement,
    };

    axios
      .post("/announcement/add", data, config)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Announcement Added Successfully", {
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
          <h2 className="text-center m-0">Add Announcement</h2>
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
            label="Title"
            width="100%"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Announcement"
            width="100%"
            onChange={(e) => {
              setAnnouncement(e.target.value);
            }}
          />

          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<AddCircleIcon className="fs-3" />}
            onClick={addanounce}
            data-test="add-btn"
          >
            Add Announcement
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddAnnouncement;
