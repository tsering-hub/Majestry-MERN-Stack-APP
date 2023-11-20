import React, { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const userLogin = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: values.password,
    };
    axios
      .post("/users/login", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("userType", res.data.usertype);
          localStorage.setItem("token", res.data.token);
          window.location.replace("/");
          toast.success("Login Successful");
        } else {
          toast.error("Login Unsuccessful");
        }
      })
      .catch((e) => {
        console.log(e.response.data.message);
        toast.error(e.response.data.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login">
          <h2 className="login-heading">Login to Majesty Eatry</h2>
          <form className="login_form">
            <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type="email"
                endAdornment={
                  <InputAdornment position="end">
                    <FaUserAlt />
                  </InputAdornment>
                }
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <button className="btn-login" onClick={userLogin}>
              Login
              <BiLogIn className="fs-2 ms-2" />
            </button>
          </form>
          {/* <div className="login-create my-5">
            <p>Create an account?</p>

            <Link className="signup-link" to="/register">
              SignUp
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Login;
