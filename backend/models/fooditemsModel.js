const mongoose = require("mongoose");

const fooditemsSchema = mongoose.Schema(
  {
    food_pic: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    preparingtime: {
      type: Number,
      required: [true, "Please add a preparing time"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    stock: {
      type: Number,
      required: [true, "Please add number of stock"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fooditems", fooditemsSchema);
