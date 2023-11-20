const express = require("express");
const router = express.Router();
const {
  addAnnouncement,
  GetAnnouncement,
  updateAnnouncements,
  deleteAnnouncement,
} = require("../controllers/announcementController");
const auth = require("../middleware/authMiddleware");

router.post("/add", auth.adminGuard, addAnnouncement);

router.get("/get", GetAnnouncement);
router.put(
  "/update",
  auth.adminGuard,

  updateAnnouncements
);

router.delete("/delete/:id", auth.adminGuard, deleteAnnouncement);

module.exports = router;
