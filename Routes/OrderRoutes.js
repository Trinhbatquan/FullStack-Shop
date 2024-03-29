const express = require("express");
const orderRouter = express.Router();
const checkingToken = require("../MiddleWare/checkingToken");
const Order = require("../Model/OrderModel");

orderRouter.post("/newOrder", checkingToken, async (req, res) => {
  const newOrder = new Order({
    user: req.user._id,
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    itemsPrice: req.body.itemsPrice,
    totalPrice: req.body.totalPrice,
  });
  const savedOrder = await newOrder.save();
  if (savedOrder) {
    res.status(200).send(savedOrder);
  } else {
    res.status(401).send({
      mess: "No save order",
    });
  }
});

//getOrder by Id and join collection to get data user

orderRouter.get("/getOrder", checkingToken, async (req, res) => {
  try {
    const orderById = await Order.findOne({
      _id: req.query.id,
      user: req.user._id,
    }).populate("user", "name email");
    //get name + email of user of collection User
    if (orderById) {
      res.status(200).send({
        code: 0,
        order: orderById,
      });
    } else {
      res.status(401).send({
        mess: "No get order by id",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).send({
      code: -1,
      mess: "Not get order by Id",
    });
  }
});

//payment order api - is paid
orderRouter.put("/:id/pay", checkingToken, async (req, res) => {
  try {
    const orderById = await Order.findById(req.params.id);
    if (orderById) {
      (orderById.isPaid = true), (orderById.paidAt = Date.now());
      orderById.paymentResult = {
        id: req.body._id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
        method: req.body.method,
      };
      const updatedOrder = await orderById.save();
      res.status(200).send({
        code: 0,
        updateOrder: updatedOrder,
      });
    } else {
      res.status(401).send({
        mess: "No get order by id",
      });
    }
  } catch (e) {
    return res.status(200).send({
      code: -1,
      message: "Not pay",
    });
  }
});

//get order by user
orderRouter.get("/", checkingToken, async (req, res) => {
  try {
    const ordersByUser = await Order.find({ user: req.user._id }).sort({
      _id: -1,
    });
    if (ordersByUser) {
      res.status(200).send({
        code: 0,
        orderData: ordersByUser,
      });
    } else {
      res.status(401).send({
        code: 0,
        mess: "No get orders by user",
      });
    }
  } catch (e) {
    res.status(504).send({
      code: -1,
      mess: "Error. Contact with admin page.",
    });
  }
});

module.exports = orderRouter;
