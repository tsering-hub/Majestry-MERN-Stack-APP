import React from "react";
import { Link } from "react-router-dom";
import { AiFillRightCircle } from "react-icons/ai";

import order from "../../../assets/order.svg";
import foods from "../../../assets/foods.svg";
import chef from "../../../assets/chef.svg";
import customers from "../../../assets/customers.svg";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import "./dashboardHome.scss";
const barChartData = [
  { month: "10", users: 5 },
  { month: "11", users: 7 },
  { month: "12", users: 10 },
];
const LineChartData = [
  { day: "1", orders: 4 },
  { day: "2", orders: 6 },
  { day: "4", orders: 8 },
  { day: "5", orders: 5 },
  { day: "6", orders: 9 },
];

const DashboardAdmin = () => {
  return (
    <div className="dashboard-home">
      <div className="dashboard-home__cards">
        <DashboardCard
          heading="Orders"
          icon={order}
          count={20}
          link={"/users"}
        />
        <DashboardCard heading="Chefs" icon={chef} count={10} link={"/books"} />
        <DashboardCard
          heading="Foods"
          icon={foods}
          count={50}
          link={"/sales"}
        />
        <DashboardCard
          heading="Customers"
          icon={customers}
          count={15}
          link={"/sales"}
        />
      </div>
      <div className="d-flex mt-4">
        <div className="dashboard-charts__chart">
          <h1 className="dashboard-charts__chart--heading">User Growth</h1>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData} className="barchart">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#ff6363" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dashboard-charts__chart">
          <h1 className="dashboard-charts__chart--heading">Orders Traffic</h1>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={LineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#ff6363" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ heading, icon, count, link }) => {
  return (
    <div className="dash-card">
      <div className="dash-card__heading mt-3">
        <span className="dash-card__heading--text">{heading}</span>
      </div>
      <hr />
      <div className="dash-card__icon">
        <img className="img-fluid" src={icon} alt={heading} />
      </div>
      <p className="dash-card__count d-flex justify-content-between">
        {`${heading === "sales" ? "Rs. " : ""}`}
        {count}
        <Link to={link}>
          <AiFillRightCircle className="dash-card__heading--icon" />
        </Link>
      </p>
    </div>
  );
};

export default DashboardAdmin;
