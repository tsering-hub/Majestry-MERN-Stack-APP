const asyncHandler = require("express-async-handler");
const Announcement = require("../models/announcementModel");

// @desc Adding New Announcement
// @route /announcement/add
// @access Private Admin
const addAnnouncement = asyncHandler(async (req, res) => {
  const { title, announcement } = req.body;

  // Validation
  if (!title || !announcement) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Create Food Item
  const Anm = await Announcement.create({
    title: title,
    announcement: announcement,
  });

  if (Anm) {
    res.status(201).json({
      msg: "Announcement added successfully",
    });
  } else {
    res.status(400);
    throw new Error("Announcement not added");
  }
});

// @desc Get Announcement
// @route /announcement/get
// @access public
const GetAnnouncement = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find();
  if (announcements) {
    res.status(200).json({
      success: true,
      data: announcements,
    });
  } else {
    res.status(400);
    throw new Error("Announcements not Found");
  }
});

// @desc Updating announcements
// @route /announcement/update
// @access Private Admin
const updateAnnouncements = asyncHandler(async (req, res) => {
  const { id, title, announcement } = req.body;

  // Update Food Item
  const anm = await Announcement.updateOne(
    { _id: id },
    {
      title: title,
      announcement: announcement,
    }
  );
  if (anm !== null) {
    res.status(201).json({
      msg: "Announcement Updated successfully",
    });
  } else {
    res.status(400);
    throw new Error("Announcement not Updated");
  }
});

// @desc delete Announcement
// @route /announcement/delete/:id
// @access Private Admin
const deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcementdelete = await Announcement.deleteOne({
    _id: req.params.id,
  });

  if (announcementdelete) {
    res.status(200).json({
      msg: "Announcement Deleted successfully",
    });
  } else {
    res.status(400);
    throw new Error("Something Went Wrong, Please Try Again!!!");
  }
});

module.exports = {
  addAnnouncement,
  GetAnnouncement,
  updateAnnouncements,
  deleteAnnouncement,
};
