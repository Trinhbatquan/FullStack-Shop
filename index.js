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

const request = require("request");
// const { handleMessage, handlePostback } = require("./util/chatbotFacebook");

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
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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

// app.post("/webhook", async (req, res) => {
//   // Parse the request body from the POST
//   let body = req.body;

//   // Check the webhook event is from a Page subscription
//   if (body.object === "page") {
//     // Iterate over each entry - there may be multiple if batched
//     body.entry.forEach(async function (entry) {
//       // Gets the body of the webhook event
//       let webhook_event = entry.messaging[0];
//       console.log(webhook_event);

//       // Get the sender PSID
//       let sender_psid = webhook_event.sender.id;
//       console.log("Sender PSID: " + sender_psid);

//       // Check if the event is a message or postback and
//       // pass the event to the appropriate handler function
//       if (webhook_event.message) {
//         handleMessage(sender_psid, webhook_event.message);
//       } else if (webhook_event.postback) {
//         handlePostback(sender_psid, webhook_event.postback);
//       }
//     });

//     // Return a '200 OK' response to all events
//     res.status(200).send("EVENT_RECEIVED");
//   } else {
//     // Return a '404 Not Found' if event is not from a page subscription
//     res.sendStatus(404);
//   }
// });

// Add support for GET requests to our webhook
// app.get("/webhook", (req, res) => {
//   let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
//   // Parse the query params
//   let mode = req.query["hub.mode"];
//   let token = req.query["hub.verify_token"];
//   let challenge = req.query["hub.challenge"];

//   // Check if a token and mode is in the query string of the request
//   if (mode && token) {
//     // Check the mode and token sent is correct
//     if (mode === "subscribe" && token === VERIFY_TOKEN) {
//       // Respond with the challenge token from the request
//       console.log("WEBHOOK_VERIFIED");
//       res.status(200).send(challenge);
//     } else {
//       // Respond with '403 Forbidden' if verify tokens do not match
//       res.sendStatus(403);
//     }
//   }
// });

// function handleMessage(senderPsid, receivedMessage) {
//   let response;

//   // Checks if the message contains text
//   if (receivedMessage.text) {
//     // Create the payload for a basic text message, which
//     // will be added to the body of your request to the Send API
//     response = {
//       text: `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`,
//     };
//   } else if (receivedMessage.attachments) {
//     // Get the URL of the message attachment
//     let attachmentUrl = receivedMessage.attachments[0].payload.url;
//     response = {
//       attachment: {
//         type: "template",
//         payload: {
//           template_type: "generic",
//           elements: [
//             {
//               title: "Is this the right picture?",
//               subtitle: "Tap a button to answer.",
//               image_url: attachmentUrl,
//               buttons: [
//                 {
//                   type: "postback",
//                   title: "Yes!",
//                   payload: "yes",
//                 },
//                 {
//                   type: "postback",
//                   title: "No!",
//                   payload: "no",
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     };
//   }

//   // Send the response message
//   callSendAPI(senderPsid, response);
// }

// function callSendAPI(senderPsid, response) {
//   // The page access token we have generated in your app settings
//   const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

//   // Construct the message body
//   let requestBody = {
//     recipient: {
//       id: senderPsid,
//     },
//     message: response,
//   };

//   // Send the HTTP request to the Messenger Platform
//   request(
//     {
//       uri: "https://graph.facebook.com/v2.6/me/messages",
//       qs: { access_token: PAGE_ACCESS_TOKEN },
//       method: "POST",
//       json: requestBody,
//     },
//     (err, _res, _body) => {
//       if (!err) {
//         console.log("Message sent!");
//       } else {
//         console.error("Unable to send message:" + err);
//       }
//     }
//   );
// }

// handleMessage("7605071802841718", { text: "oi chan qua" });

app.listen(4000, () => {
  console.log("server running....");
});

module.exports = app;
