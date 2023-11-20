import React, { useState } from "react";
import "./register.scss";
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
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [values, setValues] = React.useState({
    password: "",
    password2: "",
    showPassword: false,
    showPassword2: false,
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

  const handleClickShowPassword2 = () => {
    setValues({
      ...values,
      showPassword2: !values.showPassword2,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (values.password !== values.password2) {
      toast.error("Confirm Password is not same with Password");
      return;
    }

    const data = {
      email: email,
      username: username,
      name: name,
      password: values.password,
    };

    axios
      .post("/users/register", data)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success("Register Successful");
        } else {
          toast.error("Register Unsuccessful");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register">
          <h2 className="register-heading">Register</h2>
          <form className="register_form">
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
                Username
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <FaUserAlt />
                  </InputAdornment>
                }
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </FormControl>

            <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Name</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <FaUserAlt />
                  </InputAdornment>
                }
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
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
            <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Confirm Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={values.showPassword2 ? "text" : "password"}
                value={values.password2}
                onChange={handleChange("password2")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword2 ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <button className="btn-register" onClick={registerUser}>
              Register
            </button>
          </form>
          <div className="login-part my-5">
            <p>Already have an account?</p>
            <Link className="signin-link" to="/login">
              SignIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
