const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isIdentify: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

// userSchema.methods.validatePassword =  async function (currentPassword) {
//    const result =  await bcrypt.compare(currentPassword, this.password, function (err, res) {
//         if (err) {
//            return 0;
//         }
//         if (res) {
//            return 1;
//         }
//     })
//     return result;
// }

module.exports = mongoose.model("User", userSchema);
