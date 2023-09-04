const mongoose = require("mongoose");

const tokenUpdatePassSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TokenUpdatePass", tokenUpdatePassSchema);
