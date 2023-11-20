const mongoose = require("mongoose");

const order = mongoose.Schema(
  {
    orderItems: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Fooditems",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    totalprice: {
      type: Number,
      required: true,
    },
    totalpreparingtime: {
      type: Number,
      required: true,
    },
    orderstatus: {
      type: String,
    },
    paymentmethod: {
      type: String,
    },
    paymentstatus: {
      type: String,
    },
    tablenumber: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", order);
