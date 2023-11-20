const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

// This Is Guard For Customer...
module.exports.userGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    user
      .findOne({
        $and: [
          { _id: data.userId },
          {
            userType: "Customer",
          },
        ],
      })
      .then((udata) => {
        req.userInfo = udata;
        next();
      })
      .catch((e) => {
        res.json({ msg: "Invalid Token" });
      });
  } catch (e) {
    res.json({ msg: "Invalid Token" });
  }
};

// This Is Guard For Admin...
module.exports.adminGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    user
      .findOne({
        $and: [
          { _id: data.userId },
          {
            userType: "Admin",
          },
        ],
      })
      .then((adata) => {
        req.adminInfo = adata;
        next();
      })
      .catch((e) => {
        res.json({ msg: "Invalid Token" });
      });
  } catch (e) {
    res.json({ msg: "Invalid Token" });
  }
};

// This Is Guard For Chef...
module.exports.chefGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    user
      .findOne({
        $and: [
          { _id: data.userId },
          {
            userType: "Chef",
          },
        ],
      })
      .then((adata) => {
        req.chefInfo = adata;
        next();
      })
      .catch((e) => {
        res.json({ msg: "Invalid Token" });
      });
  } catch (e) {
    res.json({ msg: "Invalid Token" });
  }
};
