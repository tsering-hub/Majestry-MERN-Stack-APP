const express = require("express");
const router = new express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addorder,
  getallOrder,
  getmyorders,
  getmypendingorders,
  getallpendingOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/add", auth.userGuard, addorder);
router.get("/getall", auth.chefGuard, getallOrder);
router.get("/getallpendingOrder", auth.chefGuard, getallpendingOrder);
router.get("/getmyorders", auth.userGuard, getmyorders);
router.get("/getmypendingorders", auth.userGuard, getmypendingorders);
router.put("/update", auth.chefGuard, updateOrderStatus);

module.exports = router;
