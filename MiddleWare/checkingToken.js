const jwt = require("jsonwebtoken")
const User = require("../Model/UserModel")


const checkingToken = async (req, res, next) => {


    let token = "";

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {

            token = req.headers.authorization.split(" ")[1];
            console.log(token)

            if (token) {
              const decode = jwt.verify(token, process.env.SECRET_KEY);
              const user = await User.findById({
                _id: decode?.user_id
              })
              if (user) {
                  req.user = user;
                  next();
              } else {
                res.status(404).send({
                    mess: "Token failed"
                })
              }
            }

        } catch (error) {
            res.status(404).send({
                mess: "Token failed"
            })
        }
    }

}

module.exports = checkingToken;