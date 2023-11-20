import axios from "axios";
import React, { useEffect, useState } from "react";
import ChefDashboardCard from "../chefdashboardCard/ChefDashboardCard";

const RequestedOrder = () => {
  const [order, setOrders] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios.get("/order/getallpendingOrder", config).then((res) => {
      console.log(res.data);
      setOrders(res.data.data);
    });
  }, []);
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center">
        {order.map((data) => (
          <ChefDashboardCard order={data}></ChefDashboardCard>
        ))}
      </div>
    </div>
  );
};

export default RequestedOrder;
