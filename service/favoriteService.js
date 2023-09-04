const Favorite = require("../Model/FavoriteModel");

const addFavoriteReducer = (productId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await new Favorite({
        product: productId,
        user: userId,
      });
      await data.save();
      resolve({
        code: 0,
        mess: "success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const removeFavoriteReducer = (productId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("remove2");

      await Favorite.deleteOne({ product: productId, user: userId });
      resolve({
        code: 0,
        mess: "success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getFavoriteByUserService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Favorite.find({
        user: userId,
      }).populate("product");
      resolve({
        code: 0,
        favoriteArr: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getFavoriteByProductService = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Favorite.countDocuments({ product });
      resolve({
        code: 0,
        countOfFavorite: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addFavoriteReducer,
  getFavoriteByUserService,
  removeFavoriteReducer,
  getFavoriteByProductService,
};
