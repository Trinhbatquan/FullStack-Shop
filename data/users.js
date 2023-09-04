const bcrypt = require('bcryptjs')


const users = [
    {
        name: "Admin",
        email: "trinhbatquan2001@gmail.com",
        password: bcrypt.hashSync("bodoicuho", 10),
        isAdmin: true,
    },
    {
        name: 'User',
        email: "user@gmail.com",
        password: bcrypt.hashSync("123456", 10),
    }
]

module.exports = users;