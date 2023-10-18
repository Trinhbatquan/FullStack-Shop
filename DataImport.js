const express = require("express");
const User = require("./Model/UserModel");
const Product = require("./Model/ProductModel");
const users = require("./data/users");
const products = require("./data/products");
const asyncHandler = require("express-async-handler");

const dataImport = express.Router();

dataImport.post(
  "/users",
  asyncHandler(async (req, res) => {
    await User.deleteMany({});
    try {
      const data = await User.insertMany(users);
      if (data) {
        res.status(200).send(data);
      }
    } catch (error) {
      res.status(404).send("Import User failed");
    }
  })
);

dataImport.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.deleteMany({});
    try {
      const data = await Product.insertMany(products);
      if (data) {
        res.status(200).send(data);
      }
    } catch (error) {
      res.status(404).send("Import Product failed");
    }
  })
);

module.exports = dataImport;
