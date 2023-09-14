const User = require("../Model/UserModel");
const TokenEmail = require("../Model/TokenEmailModel");
const TokenUpdatePass = require("../Model/TokenUpdatePassModel");
const AuthTokenRandom = require("../MiddleWare/AuthToken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto-js");

const registerService = (name, email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        email,
      });

      console.log(user);
      if (user && user?.isIdentify) {
        resolve({
          code: 1,
          mess: "Email existed. Please try another email or log in.",
        });
      } else if (!user) {
        const user = new User({
          name,
          email,
          password: bcrypt.hashSync(password, 10),
          isIdentify: false,
        });

        const savedUser = await user.save();

        let token = crypto.AES.encrypt(
          email,
          process.env.SECRET_KEY
        ).toString();

        //decode token
        //save token into database
        token = encodeURIComponent(token);
        await TokenEmail.create({
          email,
          token: token,
        });

        const url = `${process.env.BASE_URL_FRONTEND}/users/${email}/verify/${token}`;
        const html = `
        <h2>Chào mừng bạn đến với shop của chúng tôi.</h2>
        <h3>Vui lòng xác nhận đăng ký tài khoản bằng cách click vào đường dẫn sau: </h3>
        <a href=${url} target='_blank'>Click here</a>
        <p>Xin chân thành cảm ơn bạn!</p>
        <p>Mọi góp ý về trang web, xin vui lòng liên hệ qua email: <a href="mailto:trinhbv09022001@gmail.com">trinhbv09022001@gmail.com</a></p>`;
        await sendEmail(email, "Xác thực tài khoản email.", html);
        resolve({
          code: 2,
          mess: "An Email sent to your account. Please verify.",
        });

        //   res.status(200).send({
        //     _id: savedUser._id,
        //     name: savedUser.name,
        //     email: savedUser.email,
        //     isAdmin: savedUser.isAdmin,
        //     createdAt: savedUser.createdAt,
        //     token: await AuthTokenRandom(savedUser._id),
        //   });
      } else if (user && !user?.isIdentify) {
        if (user?.name !== name) {
          user.name = name;
          await user.save();
        }
        if (await bcrypt.compare(password, user?.password)) {
          let token = crypto.AES.encrypt(
            email,
            process.env.SECRET_KEY
          ).toString();

          //update token into database

          //decode token
          token = encodeURIComponent(token);
          const filter = { email };
          const update = { token };

          // `doc` is the document _after_ `update` was applied because of
          // `new: true`
          await TokenEmail.findOneAndUpdate(filter, update, {
            new: true,
          });

          const url = `${process.env.BASE_URL_FRONTEND}/users/${email}/verify/${token}`;
          const html = `
        <h2>Chào mừng bạn đến với shop của chúng tôi.</h2>
        <h3>Vui lòng xác nhận đăng ký tài khoản bằng cách click vào đường dẫn sau: </h3>
        <a href=${url} target='_blank'>Click here</a>
        <p>Xin chân thành cảm ơn bạn!</p>
        <p>Mọi góp ý về trang web, xin vui lòng liên hệ qua email: <a href="mailto:trinhbv09022001@gmail.com">trinhbv09022001@gmail.com</a></p>`;
          await sendEmail(email, "Xác thực tài khoản email.", html);
          resolve({
            code: 2,
            mess: "An Email sent to your account. Please verify.",
          });
        } else {
          resolve({
            code: 1,
            mess: "Password wrong. Please try again.",
          });
        }
      }
    } catch (e) {
      console.log("error" + "\n" + e);
      reject(e);
    }
  });
};

const verificationEmailService = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = encodeURIComponent(req.query.token);
      // console.log(token);
      const user = await User.find({
        email: req.query.email,
      });
      if (!user)
        resolve({
          code: 1,
          mess: "Invalid Link 1",
        });

      const checkToken = await TokenEmail.findOne({
        email: req.query.email,
        token,
      });
      console.log(checkToken?.token + "\n" + token);
      // console.log(checkToken?.token === req.query.token);
      if (!checkToken)
        resolve({
          codeNumber: 1,
          message: "Invalid Link 2",
        });
      //check expires of token email (crypto aes encrypt)
      // allow exist into 1 hour
      // console.log(checkToken.updatedAt + 7 * 60 * 60);
      // console.log(addHours(checkToken.updatedAt, 7));
      const updateTime = new Date(checkToken.updatedAt).getTime();
      // console.log(new Date(Date.now()));
      // console.log(new Date());
      const date_now = new Date(Date.now()).getTime();
      if (Math.abs(Math.floor((date_now - updateTime) / 1000)) > 1 * 60 * 60) {
        resolve({
          codeNumber: 1,
          message: "Invalid Link 3",
        });
      }

      console.log(user.email);
      const filter = { email: req.query.email };
      const update = { isIdentify: true };
      await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      await TokenEmail.deleteOne({
        email: req.query.email,
      });
      resolve({
        code: 0,
        user: {
          name: user[0].name,
          email: req.query.email,
          isAdmin: user[0].isAdmin,
          //   createdAt: user.createdAt,
          token: await AuthTokenRandom(user[0]._id),
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const loginService = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        resolve({
          code: 1,
          mess: "Not account in the system. Please try another email or sign up.",
        });
      }
      if (!(await bcrypt.compare(password, user?.password))) {
        resolve({
          code: 1,
          mess: "Password wrong. Please try again.",
        });
      }
      if (user && !user.isIdentify) {
        resolve({
          code: 1,
          mess: "This account is verified  yet. Please sign up to verify.",
        });
      }

      //notification

      resolve({
        code: 0,
        user: {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          token: await AuthTokenRandom(user._id),
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

const sendEmailUpdatePasswordService = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        resolve({
          code: 1,
          mess: "Not account in the system. Please try another email or sign up.",
        });
      }

      if (user && !user.isIdentify) {
        resolve({
          code: 1,
          mess: "This account is verified  yet. Please sign up to verify.",
        });
      }

      let token = crypto.AES.encrypt(email, process.env.SECRET_KEY).toString();

      //decode token
      //save token into database
      token = encodeURIComponent(token);
      const checkTokenUpdatePassword = await TokenUpdatePass.findOne({
        email,
      });
      if (!checkTokenUpdatePassword) {
        await TokenUpdatePass.create({
          email,
          token: token,
        });
      } else {
        checkTokenUpdatePassword.token = token;
        await checkTokenUpdatePassword.save();
      }

      const url = `${process.env.BASE_URL_FRONTEND}/update/${email}/password/${token}`;
      const html = `
        <h2>Chào mừng bạn đến với shop của chúng tôi.</h2>
        <h3>Bạn hãy cập nhật mật khẩu bằng cách click vào đường link bên dưới: </h3>
        <a href=${url} target='_blank'>Click here</a>
        <p>Xin chân thành cảm ơn bạn!</p>
        <p>Mọi góp ý về trang web, xin vui lòng liên hệ qua email: <a href="mailto:trinhbv09022001@gmail.com">trinhbv09022001@gmail.com</a></p>`;
      await sendEmail(email, "Cập nhật mật khẩu tài khoản.", html);
      resolve({
        code: 2,
        mess: "An Email sent to your account. Please click to update password.",
      });
    } catch (e) {
      reject(e);
    }
  });
};

//U2FsdGVkX18GxpIoRHMs3MR23cjyrsK7pd%2BB7VCJoISgbDzNgjZmf4fiMHJCjjxG
const verifyUserAndUpdatePassService = (email, token, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenEnCode = encodeURIComponent(token);
      // console.log(token);
      const user = await User.findOne({
        email,
      });
      if (!user) {
        resolve({
          code: 1,
          mess: "Invalid Link 1",
        });
      }

      console.log("tokenUser " + tokenEnCode);
      const checkToken = await TokenUpdatePass.findOne({
        email,
        token: tokenEnCode,
      });
      // console.log(checkToken?.token + "\n" + token);
      if (!checkToken)
        resolve({
          codeNumber: 1,
          message: "Invalid Link 2",
        });
      //check expires of token email (crypto aes encrypt)
      // allow exist into 5 minutes
      // console.log(checkToken.updatedAt + 7 * 60 * 60);
      // console.log(addHours(checkToken.updatedAt, 7));
      const updateTime = new Date(checkToken.updatedAt).getTime();
      console.log("update " + updateTime);
      // console.log(new Date(Date.now()));
      // console.log(new Date());
      const date_now = new Date(Date.now()).getTime();
      console.log("now " + date_now);

      console.log(
        "time " + Math.abs(Math.floor((date_now - updateTime) / 1000))
      );
      if (Math.abs(Math.floor((date_now - updateTime) / 1000)) > 5 * 60) {
        resolve({
          codeNumber: 3,
          message: "Token is expired. Please click into Send new link.",
        });
      }

      const filter = { email };
      const update = { password: bcrypt.hashSync(password, 10) };
      await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      await TokenUpdatePass.deleteOne({
        email,
      });
      resolve({
        code: 0,
        mess: "Update password successfully. Please log in again.",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  registerService,
  verificationEmailService,
  loginService,
  sendEmailUpdatePasswordService,
  verifyUserAndUpdatePassService,
};
