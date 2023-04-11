const jwt = require("jsonwebtoken")
require("dotenv/config");



const AuthTokenRandom = async (user_id) => {

    return  jwt.sign(

        {
            user_id
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "30d"
        },
    )
}


module.exports = AuthTokenRandom;