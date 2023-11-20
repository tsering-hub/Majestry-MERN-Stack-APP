const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Announcement Model Collection Create
const Announcement = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    announcement: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Announcement", Announcement);
