const express = require("express");
const favoriteRoutes = express.Router();
const checkingToken = require("../MiddleWare/checkingToken");

const {
  addFavoriteReducer,
  getFavoriteByUserService,
  removeFavoriteReducer,
  getFavoriteByProductService,
} = require("../service/favoriteService");

favoriteRoutes.post("/add", checkingToken, async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.body;
    if (!productId || !user) {
      return res.status(200).json({
        code: 1,
        mess: "missing parameters",
      });
    }

    const data = await addFavoriteReducer(productId, user._id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      code: -1,
      mess: "can not add favorite",
    });
  }
});

favoriteRoutes.post("/remove", checkingToken, async (req, res) => {
  try {
    console.log("remove");
    const { user } = req;
    const { productId } = req.body;
    if (!productId || !user) {
      return res.status(200).json({
        code: 1,
        mess: "missing parameters",
      });
    }

    const data = await removeFavoriteReducer(productId, user._id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      code: -1,
      mess: "can not remove favorite",
    });
  }
});

favoriteRoutes.get("/getByUser", checkingToken, async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(200).json({
        code: 1,
        mess: "missing parameters",
      });
    }
    const data = await getFavoriteByUserService(user._id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      code: -1,
      mess: "can not get favorite by user",
    });
  }
});

favoriteRoutes.get("/getByProduct", async (req, res) => {
  try {
    const { product } = req.query;
    if (!product) {
      return res.status(200).json({
        code: 1,
        mess: "missing parameters",
      });
    }
    const data = await getFavoriteByProductService(product);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      code: -1,
      mess: "can not get favorite by product",
    });
  }
});

module.exports = favoriteRoutes;
