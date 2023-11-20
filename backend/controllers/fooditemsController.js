const asyncHandler = require("express-async-handler");
const Fooditems = require("../models/fooditemsModel");

// @desc Adding New Food Item
// @route /fooditems/add
// @access Private Admin
const addFooditems = asyncHandler(async (req, res) => {
  // Validation file formate
  if (req.file == undefined) {
    res.status(400);
    throw new Error("Invalid file formate");
  }

  const { name, desc, category, preparingtime, price, stock } = req.body;

  // Validation
  if (!name || !desc || !category || !preparingtime || !price || !stock) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // find if food item already exists
  const foodExists = await Fooditems.findOne({
    name,
  });

  if (foodExists) {
    res.status(400);
    throw new Error("Food Item already exists");
  }

  // Create Food Item
  const food = await Fooditems.create({
    food_pic: req.file.filename,
    name: name,
    desc: desc,
    category: category,
    preparingtime: preparingtime,
    price: price,
    stock: stock,
    user: req.adminInfo._id,
  });

  if (food) {
    res.status(201).json({
      msg: "Food added successfully",
    });
  } else {
    res.status(400);
    throw new Error("Food not added");
  }
});

// @desc Get Food items
// @route /fooditems/getbyadmin
// @access Private Admin
const GetFooditemsByAdmin = asyncHandler(async (req, res) => {
  const foods = await Fooditems.find();
  if (foods) {
    res.status(200).json({
      success: true,
      data: foods,
    });
  } else {
    res.status(400);
    throw new Error("Food not Found");
  }
});

// @desc Get Food items
// @route /fooditems/getbyadmin
// @access Public
const GetFooditems = asyncHandler(async (req, res) => {
  const foods = await Fooditems.find();
  if (foods) {
    res.status(200).json({
      success: true,
      data: foods,
    });
  } else {
    res.status(400);
    throw new Error("Food not Found");
  }
});

// @desc Updating Food Item
// @route /fooditems/update
// @access Private Admin
const updateFooditems = asyncHandler(async (req, res) => {
  const { id, name, desc, category, preparingtime, price, stock } = req.body;

  var food;
  // Update Food Item
  if (req.file == undefined) {
    food = await Fooditems.updateOne(
      { _id: id },
      {
        name: name,
        desc: desc,
        category: category,
        preparingtime: preparingtime,
        price: price,
        stock: stock,
      }
    );
  } else {
    food = await Fooditems.updateOne(
      { _id: id },
      {
        food_pic: req.file.filename,
        name: name,
        desc: desc,
        category: category,
        preparingtime: preparingtime,
        price: price,
        stock: stock,
      }
    );
  }

  if (food !== null) {
    res.status(201).json({
      msg: "Food Updated successfully",
    });
  } else {
    res.status(400);
    throw new Error("Food not Updated");
  }
});

// @desc delete Food item
// @route /fooditems/delete/:id
// @access Private Admin
const deleteFooditem = asyncHandler(async (req, res) => {
  const fooddelete = await Fooditems.deleteOne({ _id: req.params.id });

  if (fooddelete) {
    res.status(200).json({
      msg: "Food Deleted successfully",
    });
  } else {
    res.status(400);
    throw new Error("Something Went Wrong, Please Try Again!!!");
  }
});

module.exports = {
  addFooditems,
  GetFooditemsByAdmin,
  GetFooditems,
  updateFooditems,
  deleteFooditem,
};
