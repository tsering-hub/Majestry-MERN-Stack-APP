import React from "react";
import "./addchef.scss";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useState } from "react";

import {
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

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

const genders = ["Male", "Female", "Others"];

function getStyles(name, gender, theme) {
  return {
    fontWeight:
      gender.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const AddChef = () => {
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactno, setContactno] = useState("");
  const [gender, setGender] = useState("");

  const addchef = () => {
    // e.perventDefault();

    if (
      username === "" ||
      name === "" ||
      email === "" ||
      password === "" ||
      contactno === "" ||
      gender === ""
    ) {
      toast.warn("Fill all Required Field", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    const data = {
      username: username,
      name: name,
      email: email,
      contactno: contactno,
      gender: gender,
      password: password,
    };

    axios
      .post("/users/addchefaccount", data, config)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Chef Created Successfully", {
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
          <h2 className="text-center m-0">Add Chef</h2>
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
            label="Username"
            width="100%"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Name"
            width="100%"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Email"
            type="email"
            width="100%"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Password"
            type="password"
            width="100%"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Contanct Number"
            type="number"
            width="100%"
            onChange={(e) => {
              setContactno(e.target.value);
            }}
          />
          <FormControl sx={{ pb: 2 }} required>
            <InputLabel id="demo-multiple-name-label">Gender</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              input={<OutlinedInput label="Food Category" />}
              MenuProps={MenuProps}
            >
              {genders.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, gender, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<AddCircleIcon className="fs-3" />}
            onClick={addchef}
            data-test="add-btn"
          >
            Add Chef
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddChef;
