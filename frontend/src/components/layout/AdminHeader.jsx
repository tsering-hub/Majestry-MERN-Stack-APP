import React, { useState } from "react";
import "./adminheader.css";
import logo from "../../assets/logo.svg";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaBell,
} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
const AdminHeader = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/fooditems",
      name: "Foods",
      icon: <MdFastfood />,
    },
    {
      path: "/chefpage",
      name: "Chef",
      icon: <FaUserAlt />,
    },
    {
      path: "/Analytics",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },
    {
      path: "/announcement",
      name: "Announcement",
      icon: <FaCommentAlt />,
    },
    {
      path: "/notification",
      name: "Notification",
      icon: <FaBell />,
    },
  ];

  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };
  return (
    <div className="admin-dashboardcontainer">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <img
            src={logo}
            alt="logo"
            style={{ display: isOpen ? "block" : "none" }}
            className="logo"
          />
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <Link
          className="logout-btn mt-5 d-flex justify-content-center align-items-center"
          to="/"
          onClick={logout}
        >
          <ImExit></ImExit>
          <p
            className="ps-2 my-auto"
            style={{ display: isOpen ? "block" : "none" }}
          >
            {" "}
            Log Out
          </p>
        </Link>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default AdminHeader;
