import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import "./header.scss";
const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuClickHandler = (e) => {
    e.preventDefault();
    setOpenMenu((p) => !p);
  };
  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };
  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <img src={logo} alt="logo" className="header__logo--img" />
        </div>
      </Link>
      <div
        className={`menu ${openMenu ? "menu--open" : ""}`}
        onClick={menuClickHandler}
      >
        <div className="menu__line "></div>
        <div className="menu__line "></div>
        <div className="menu__line  "></div>
      </div>
      <nav className={`nav ${openMenu ? "nav--slide" : ""}`}>
        {localStorage.getItem("token") ? (
          <Link className="nav__btn nav__links" to="/" onClick={logout}>
            Log out
          </Link>
        ) : (
          <Link className="nav__btn nav__links" to="/">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
