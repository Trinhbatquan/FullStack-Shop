const express = require("express");
const products = require("./data/products");
const ImportData = require('./DataImport')
require("dotenv/config");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const productRoutes = require("./Routes/ProductRoutes");
const userRoutes = require("./Routes/UserRoutes")
const orderRoutes = require("./Routes/OrderRoutes")

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("hello world");
});

//connect database

const connectDatabase = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_CONNECT, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    if (connection) {
      console.log("connect database successful");
    }
  } catch (error) {
    console.log("connect Database" + error);
  }
};

connectDatabase();


//api
// load data products all
// app.get("/api/products", (req, res) => {
//   res.status(200).send(products);
// });

//load product id
// app.get("/api/product/:id", (req, res) => {
//   try {
//     const product = products.filter((product) => product._id === req.params.id);

//     if (product) {
//       const [item] = product;
//       res.status(200).send(item);
//     }
//   } catch (error) {
//     res.status(500).send({
//       message: "None",
//     });
//   }
// });
app.use("/api/importData", ImportData)
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)

app.listen(4000, () => {
  console.log("server running....");
});

module.exports = app;
