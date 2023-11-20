import React from "react";
import "./updatefood.scss";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useState } from "react";

import {
  Button,
  InputAdornment,
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

const categories = [
  "Starters",
  "Main Course",
  "Mo:mo",
  "Burger",
  "Thakali",
  "Pizza",
  "Salad",
  "Keema Noodle",
  "Fired Rice",
  "Neweri Khaja Set",
  "Thukpa",
  "Chowmein",
  "Cold Beverage",
  "Hot Beverage",
];

function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const UpdateFood = ({ food }) => {
  console.log(food);
  const theme = useTheme();

  const [food_img, setFood_img] = useState("");
  const [name, setName] = useState(food.name);
  const [desc, setDesc] = useState(food.desc);
  const [categoryName, setcategoryName] = useState(food.category);
  const [preparingtime, setPreparingtime] = useState(food.preparingtime);
  const [stock, setStock] = useState(food.stock);
  const [price, setPrice] = useState(food.price);

  const updateFood = () => {
    // e.perventDefault();

    if (
      categoryName === "" ||
      name === "" ||
      desc === "" ||
      preparingtime === "" ||
      stock === "" ||
      price === ""
    ) {
      toast.warn("Fill all Required Field", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    const data = new FormData();
    data.append("id", food._id);
    data.append("food_img", food_img);
    data.append("name", name);
    data.append("desc", desc);
    data.append("category", categoryName);
    data.append("preparingtime", preparingtime);
    data.append("stock", stock);
    data.append("price", price);
    console.log(data);

    axios
      .put("/fooditems/update", data, config)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Food Updated Successfully", {
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
            type="file"
            label="Food Image"
            fullWidth
            width="100%"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setFood_img(e.target.files[0]);
            }}
          />
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Food Name"
            width="100%"
            onChange={(e) => {
              setName(e.target.value);
            }}
            defaultValue={food.name}
          />
          <TextField
            required
            multiline
            rows={4}
            maxRows={6}
            id="outlined-required outlined-multiline-static"
            label="Food Description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            defaultValue={food.desc}
          />
          <FormControl sx={{ pb: 2 }} required>
            <InputLabel id="demo-multiple-name-label">Food Category</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={categoryName}
              onChange={(e) => {
                setcategoryName(e.target.value);
              }}
              input={<OutlinedInput label="Food Category" />}
              MenuProps={MenuProps}
            >
              {categories.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, categoryName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Preparing Time / minute"
            width="100%"
            onChange={(e) => {
              setPreparingtime(e.target.value);
            }}
            defaultValue={food.preparingtime}
          />{" "}
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Stock"
            width="100%"
            onChange={(e) => {
              setStock(e.target.value);
            }}
            defaultValue={food.stock}
          />
          <FormControl fullWidth required>
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">Rs.</InputAdornment>
              }
              label="Amount"
              type="number"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              defaultValue={food.price}
            />
          </FormControl>
          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<AddCircleIcon className="fs-3" />}
            onClick={updateFood}
            data-test="add-btn"
          >
            Update
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdateFood;
