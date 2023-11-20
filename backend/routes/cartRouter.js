const express = require("express");
const router = new express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addtocart,
  getCart,
  deleteCartitem,
  deleteallCart,
} = require("../controllers/cartController");

router.post("/addtocart", auth.userGuard, addtocart);
router.get("/get", auth.userGuard, getCart);
router.delete("/delete/:id", auth.userGuard, deleteCartitem);
router.delete("/deleteall", auth.userGuard, deleteallCart);

module.exports = router;
