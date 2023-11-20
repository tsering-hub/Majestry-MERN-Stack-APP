import React from "react";
import "./dashboardchef.scss";
import { Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import ChefDashboardCard from "../../../components/chefdashboardCard/ChefDashboardCard";
import ChefDashboardOrderTable from "../../../components/chefdashboardordertable/ChefDashboardOrderTable";
import { Link, NavLink } from "react-router-dom";
const DashboardChef = () => {
  return (
    <div className="dashboardchef-container">
      <div className="d-flex justify-content-evenly dash-nav">
        <NavLink
          className={({ isActive }) =>
            isActive ? "dashnav-link dashnavactive" : "dashnav-link"
          }
          to=""
        >
          Requested Order
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "dashnav-link dashnavactive" : "dashnav-link"
          }
          to="orderhistory"
        >
          Order History
        </NavLink>
      </div>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardChef;
