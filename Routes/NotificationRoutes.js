const express = require("express");
const notificationRoutes = express.Router();
const checkingToken = require("../MiddleWare/checkingToken");
const { getAllNotificationService } = require("../service/notificationService");

notificationRoutes.get("", checkingToken, async (req, res) => {
  try {
    const { user } = req;
    // const { productId } = req.body;
    // if (!productId || !user) {
    //   return res.status(200).json({
    //     code: 1,
    //     mess: "missing parameters",
    //   });
    // }

    const data = await getAllNotificationService();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      code: -1,
      mess: "can not get notification",
    });
  }
});

// notificationRoutes.get("/updateById", checkingToken, async (req, res) => {
//   try {
//     const { user } = req;
//     const { notification } = req.query;
//     if (!notification) {
//       return res.status(200).json({
//         code: 1,
//         mess: "missing parameters",
//       });
//     }

//     const data = await updateNotificationService(notification);
//     return res.status(200).json(data);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       code: -1,
//       mess: "can not get notification",
//     });
//   }
// });

module.exports = notificationRoutes;
