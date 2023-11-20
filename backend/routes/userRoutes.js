const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  addChefAccount,
  getChefs,
  getMyselfCustomer,
  updateProfile,
  updateProfilePic,
  changePassword,
} = require("../controllers/userController");
const uploadFile = require("../file/uploadFile");
const auth = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/addchefaccount", auth.adminGuard, addChefAccount);
router.get("/me", auth.adminGuard, getMe);
router.get("/getchefs", auth.adminGuard, getChefs);
router.get("/myselfcustomer", auth.userGuard, getMyselfCustomer);
router.put("/profileupdate", auth.userGuard, updateProfile);
router.put(
  "/profilepicupdate",
  auth.userGuard,
  uploadFile.single("user_pic"),
  updateProfilePic
);
router.put("/changepassword", auth.userGuard, changePassword);
module.exports = router;
