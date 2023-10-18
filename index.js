const express = require("express");
const products = require("./data/products");
const ImportData = require("./DataImport");
require("dotenv/config");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const productRoutes = require("./Routes/ProductRoutes");
const userRoutes = require("./Routes/UserRoutes");
const orderRoutes = require("./Routes/OrderRoutes");
const favoriteRoutes = require("./Routes/FavoriteRoutes");
const notificationRoutes = require("./Routes/NotificationRoutes");

// const Notification = require("./Model/Notification");

const app = express();
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Cho phép truy cập từ mọi nguồn
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get("/", (req, res) => {
  return res.json("hello world");
});

//connect database

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_CONNECT);
    //   {
    //     useUnifiedTopology: true,
    //     useNewUrlParser: true,
    //   }
    // );

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
app.use("/api/importData", ImportData);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/notifications", notificationRoutes);
app.get("/api/config/paypal", (req, res) => {
  return res.send({
    data: process.env.CLIENT_PAYPAL_ID,
  });
});

//webhook routes
// Handles messages events
function handleMessage(sender_psid, received_message) {}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {}

app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Return a '200 OK' response to all events
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Add support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

app.listen(4000, () => {
  console.log("server running....");
});

module.exports = app;
