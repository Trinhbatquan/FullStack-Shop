require("dotenv/config");
const request = require("request");
const axios = require("axios");

//webhook routes
// Sends response messages via the Send API
// async function gettingStarted() {
//   // Construct the message body
//   let request_body = {
//     get_started: { payload: "GET_STARTED" },
//     whitelisted_domains: ["https://fullstack-shop-621c2.web.app"],
//   };

//   // Send the HTTP request to the Messenger Platform
//   console.log("send: " + JSON.stringify(request_body));
//   try {
//     await request(
//       {
//         uri: `https://graph.facebook.com/v18.0/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
//         qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
//         method: "POST",
//         json: request_body,
//       },
//       (err, res, body) => {
//         if (!err) {
//           console.log("set up get started facebook message page!");
//         } else {
//           console.error(
//             "Unable to set up get started facebook message page:" + err
//           );
//         }
//       }
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }
// gettingStarted();

//handleGetStarted
const getProfileSender = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userName = "";
      await request(
        {
          uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`,
          method: "GET",
        },
        async (err, res, body) => {
          if (!err) {
            const data = await JSON.parse(body);
            userName = `${data.first_name} ${data.last_name}`;
            console.log(userName);
            resolve(userName);
          } else {
            console.error("Unable to send message:" + err);
            reject(err);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};
const handleGetStarted = async (sender_psid) => {
  try {
    const userName = await getProfileSender(sender_psid);
    const response = `Welcome ${userName} to go the my shop. Have a good day! :))`;
    return response;
  } catch (e) {
    console.log("error get started: " + e);
  }
};

async function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  console.log("send: " + JSON.stringify(request_body));
  //   try {
  //     await request(
  //       {
  //         uri: "https://graph.facebook.com/v2.6/me/messages",
  //         qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
  //         method: "POST",
  //         json: request_body,
  //       },
  //       (err, res, body) => {
  //         if (!err) {
  //           console.log("message sent!");
  //         } else {
  //           console.error("Unable to send message:" + err);
  //         }
  //       }
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  axios
    .post(
      "https://graph.facebook.com/v2.6/me/messages/?access_token=" +
        process.env.PAGE_ACCESS_TOKEN,
      Object.assign(
        {},
        {
          messaging_type: "RESPONSE",
          recipient: {
            id: sender_psid,
          },
        },
        messages[i]["payload"]
      )
    )
    .then(
      (response) => {
        console.log("sent message");
        if (i < messages.length)
          sendMessage(recipient, messages, accessToken, i + 1);
      },
      (error) => {}
    )
    .catch((error) => {});
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    case "yes":
      response = { text: "Thanks!" };
      break;
    case "no":
      response = { text: "Oops, try sending another image." };
      break;
    case "GET_STARTED":
      response = await handleGetStarted(sender_psid);
      break;
    default:
      response = { text: `Opps, I don't know what is the payload: ${payload}` };
      break;
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Handles messages events
async function handleMessage(sender_psid, received_message) {
  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
    };
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  console.log("response: " + JSON.stringify(response));
  await callSendAPI(sender_psid, response);
}

module.exports = {
  handleMessage,
  handlePostback,
};
