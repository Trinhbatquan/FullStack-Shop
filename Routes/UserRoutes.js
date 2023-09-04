const express = require("express");
const asyncHandler = require("express-async-handler");
const userRoutes = express.Router();
const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const checkingToken = require("../MiddleWare/checkingToken");
const AuthTokenRandom = require("../MiddleWare/AuthToken");

const {
  registerService,
  loginService,
  verificationEmailService,
  sendEmailUpdatePasswordService,
  verifyUserAndUpdatePassService,
} = require("../service/userService");

userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        code: 1,
        mess: "Vui lòng nhập đủ các trường.",
      });
    }
    const data = await loginService(email, password);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      code: -1,
      mess: "Có lỗi xảy ra. Vui lòng liên hệ với quản trị viên.",
    });
  }
});

//register
userRoutes.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(401).json({
      code: 1,
      mess: "Vui lòng nhập đủ các ô.",
    });
  } else {
    try {
      const data = await registerService(name, email, password);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(200).json({
        code: -1,
        mess: "Không thể đăng ký. Vui lòng thử cách khác.",
      });
    }
  }
});

//identify
userRoutes.get("/identify", async (req, res) => {
  try {
    const data = await verificationEmailService(req);
    console.log(data);
    // if (data?.codeNumber === 0) {
    //   // const { email, roleId } = data?.user;
    //   // const token = await createTokenRandom(email, roleId, "student");
    //   // return res
    //   //   .cookie("access_token_booking_UET_homepage", token, {
    //   //     httpOnly: true,
    //   //     secure: true,
    //   //   })
    //   //   .status(200)
    //   //   .send(data);
    //   return response.status(200).json(data);
    // } else {
    return res.status(200).send(data);
    // }
  } catch (e) {
    console.log(e);
    res.status(400).send({
      codeNumber: -1,
      message: "Không thể xác minh email của bạn.",
    });
  }
});

//forgetPassword
userRoutes.get("/send_email_updatePassWord", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(200).json({
        code: 1,
        mess: "Vui lòng nhập email để cập nhật mật khẩu.",
      });
    }
    const data = await sendEmailUpdatePasswordService(email);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      code: -1,
      mess: "Có lỗi xảy ra. Vui lòng liên hệ quản trị viên.",
    });
  }
});

userRoutes.post("/verify_user_update_pass", async (req, res) => {
  try {
    const { email, token, password } = req.body;
    if (!email || !token || !password) {
      return res.status(200).json({
        code: 1,
        mess: "Lỗi hệ thống. Vui lòng liên hệ quản trị viên.",
      });
    }

    const data = await verifyUserAndUpdatePassService(email, token, password);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      code: -1,
      mess: "Có lỗi xảy ra. Vui lòng liên hệ quản trị viên.",
    });
  }
});

userRoutes.get("/profile", checkingToken, async (req, res) => {
  if (req.user) {
    const user = await User.findById({
      _id: req.user._id,
    });
    if (user) {
      res.status(200).send({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404).send({
        mess: "User Not Authorization",
      });
    }
  }
});

userRoutes.put("/updateProfile", checkingToken, async (req, res) => {
  console.log(req.body);
  if (req.user) {
    const user = await User.findById({
      _id: req.user._id,
    });
    if (user) {
      try {
        user.name = (await req.body.name) || user.name;
        user.email = (await req.body.email) || user.email;
        user.password =
          (await bcrypt.hashSync(req.body.password, 10)) || user.password;
        const updateUser = await user.save();
        res.status(200).send({
          _id: updateUser._id,
          name: updateUser.name,
          email: updateUser.email,
          isAdmin: updateUser.isAdmin,
          createdAt: updateUser.createdAt,
          token: await AuthTokenRandom(updateUser._id),
        });
      } catch (error) {
        res.status(404).send({
          mess: "No update User",
        });
      }
    } else {
      res.status(404).send({
        mess: "User Not Authorization",
      });
    }
  }
});

module.exports = userRoutes;
