const express = require("express");
const asyncHandler = require("express-async-handler");
const userRoutes = express.Router();
const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const checkingToken = require("../MiddleWare/checkingToken");
const AuthTokenRandom = require("../MiddleWare/AuthToken");

userRoutes.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        token: await AuthTokenRandom(user._id),
      });
    } else {
      res.status(404).send({
        mess: "Invalid email or password",
      });
    }
  }
});

userRoutes.post("/register", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    res.status(200).send({
      mess: "User exist",
    });
  } else {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    try {
      const savedUser = await user.save();
      res.status(200).send({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
        createdAt: savedUser.createdAt,
        token: await AuthTokenRandom(savedUser._id),
      });
    } catch (error) {
      res.status(401).send({
        mess: "User Not Register",
      });
    }
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
  console.log(req.body)
  if (req.user) {
    const user = await User.findById({
      _id: req.user._id,
    });
    if (user) {
      try {
        
        user.name = await req.body.name || user.name
        user.email =await req.body.email || user.email
        user.password =await  bcrypt.hashSync(req.body.password, 10) || user.password
        const updateUser = await user.save()
        res.status(200).send(
          {
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            createdAt: updateUser.createdAt,
            token: await AuthTokenRandom(updateUser._id),
          }
        )

      } catch(error) {
        res.status(404).send({
          mess: "No update User"
        })
      }
    } else {
      res.status(404).send({
        mess: "User Not Authorization",
      });
    }
  }
});



module.exports = userRoutes;
