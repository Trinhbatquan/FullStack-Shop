const Notification = require("../Model/Notification");

const getAllNotificationService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data1 = await Notification.find().sort({
        updatedAt: -1,
      });

      resolve({
        code: 0,
        notification: data1,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// const updateNotificationService = (notification) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (notification !== "all") {
//         const filter = { _id: notification };
//         const update = { isRead: true };

//         // `doc` is the document _before_ `update` was applied
//         await Notification.findOneAndUpdate(filter, update);
//         resolve({
//           code: 0,
//           mess: "success",
//         });
//       } else {
//         await Notification.updateMany(
//           {},
//           {
//             isRead: true,
//           }
//         );
//         resolve({
//           code: 0,
//           mess: "success",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

module.exports = {
  getAllNotificationService,
  // updateNotificationService,
};
