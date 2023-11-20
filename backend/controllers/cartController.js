const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

// @desc creating New Cart
// @route /cart/addtocart
// @access Private Customer
const addtocart = asyncHandler(async (req, res) => {
  const { foodId, quantity } = req.body;

  // Validation
  if (!foodId || !quantity) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // find if cart already exists
  const cartExists = await Cart.findOne({
    $and: [
      {
        foodId: foodId,
      },
      {
        userId: req.userInfo._id,
      },
    ],
  });

  if (cartExists) {
    res.status(400);
    throw new Error("Food item is already exists in cart");
  }

  // Create cart
  const cart = await Cart.create({
    foodId: foodId,
    userId: req.userInfo._id,
    quantity: quantity,
  });

  if (cart) {
    res.status(201).json({
      msg: "Added to Cart successfully",
    });
  } else {
    res.status(400);
    throw new Error("Failed to add to cart");
  }
});

// @desc Get Cart items
// @route /cart/get
// @access Private Customer
const getCart = asyncHandler(async (req, res) => {
  const carts = await Cart.find({ userId: req.userInfo._id })
    .sort({
      createdAt: "desc",
    })
    .populate("foodId");
  if (carts) {
    res.status(200).json({
      success: true,
      data: carts,
    });
  } else {
    res.status(400);
    throw new Error("Cart not Found");
  }
});

// @desc delete Cart item
// @route /cart/delete/:id
// @access Private Customer
const deleteCartitem = asyncHandler(async (req, res) => {
  const cartdelete = await Cart.deleteOne({ _id: req.params.id });

  if (cartdelete) {
    res.status(200).json({
      msg: "Cart Deleted successfully",
    });
  } else {
    res.status(400);
    throw new Error("Something Went Wrong, Please Try Again!!!");
  }
});

// @desc delete all Cart item
// @route /cart/deleteall
// @access Private Customer
const deleteallCart = asyncHandler(async (req, res) => {
  const cartdelete = await Cart.deleteMany({
    userId: req.userInfo._id,
  });

  if (cartdelete) {
    res.status(200).json({
      msg: "All Cart Deleted successfully",
    });
  } else {
    res.status(400);
    throw new Error("Something Went Wrong, Please Try Again!!!");
  }
});

module.exports = {
  addtocart,
  getCart,
  deleteCartitem,
  deleteallCart,
};
