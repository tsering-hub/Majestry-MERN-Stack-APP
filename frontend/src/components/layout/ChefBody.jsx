import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardChef from "../../pages/cheff/dashboard-chef/DashboardChef";
import OrderHistory from "../orderhistory/OrderHistory";
import RequestedOrder from "../requestedorder/RequestedOrder";
import "./chefbody.scss";
import PrivateRoute from "../../ProtectedRoute";
const ChefBody = () => {
  return (
    <>
      <div className="chefbody-container">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardChef />
              </PrivateRoute>
            }
          >
            <Route path="" element={<RequestedOrder />} />
            <Route path="orderhistory" element={<OrderHistory />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default ChefBody;
