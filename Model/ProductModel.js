const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    parameters: {
      type: {},
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    position: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    transport: {
      type: String,
      required: true,
    },

    reviews: [reviewSchema],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
