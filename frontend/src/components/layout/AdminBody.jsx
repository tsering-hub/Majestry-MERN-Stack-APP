import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardAdmin from "../../pages/admin/dashboard-admin/DashboardAdmin";
import FoodItems from "../../pages/admin/fooditems-admin/FoodItems";
import Chefpage from "../../pages/admin/chefpage/ChefPage";
import AnnouncementPage from "../../pages/admin/annoucementpage/AnnoucementPage";
import Analytics from "../../pages/admin/analytics/Analytics";
import PrivateRoute from "../../ProtectedRoute";
const AdminBody = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/fooditems"
          element={
            <PrivateRoute>
              <FoodItems />
            </PrivateRoute>
          }
        />
        <Route
          path="/chefpage"
          element={
            <PrivateRoute>
              <Chefpage />
            </PrivateRoute>
          }
        />
        <Route
          path="/announcement"
          element={
            <PrivateRoute>
              <AnnouncementPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/Analytics"
          element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AdminBody;
