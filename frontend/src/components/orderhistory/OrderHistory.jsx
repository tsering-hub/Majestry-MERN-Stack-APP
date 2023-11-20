import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderHistoryCard from "../orderhistorycard/orderhistorycard";

const OrderHistory = () => {
  const [order, setOrders] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios.get("/order/getall", config).then((res) => {
      setOrders(res.data.data);
    });
  }, []);
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center">
        {order.map((data) => (
          <OrderHistoryCard order={data}></OrderHistoryCard>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
