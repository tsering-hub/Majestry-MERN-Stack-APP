const express = require("express");
const router = express.Router();
const {
  addFooditems,
  GetFooditemsByAdmin,
  GetFooditems,
  updateFooditems,
  deleteFooditem,
} = require("../controllers/fooditemsController");
const auth = require("../middleware/authMiddleware");
const uploadFile = require("../file/uploadFile");

router.post(
  "/add",
  auth.adminGuard,
  uploadFile.single("food_img"),
  addFooditems
);

router.get("/getbyadmin", auth.adminGuard, GetFooditemsByAdmin);
router.get("/get", GetFooditems);
router.put(
  "/update",
  auth.adminGuard,
  uploadFile.single("food_img"),
  updateFooditems
);

router.delete("/delete/:id", auth.adminGuard, deleteFooditem);

module.exports = router;
