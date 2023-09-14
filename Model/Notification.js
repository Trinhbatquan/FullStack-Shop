const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    titleVn: {
      type: String,
      required: true,
    },
    titleEn: {
      type: String,
      required: true,
    },
    detailVn: {
      type: String,
      required: true,
    },
    detailEn: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
