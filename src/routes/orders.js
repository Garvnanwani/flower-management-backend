const express = require("express");
const router = express.Router();
const {getAllOrders, getOrderByUser, postCreateOrder, postUpdateOrder, postDeleteOrder} = require("../controller/orders");

router.get("/get-all-orders", getAllOrders);
router.post("/order-by-user", getOrderByUser);

router.post("/create-order", postCreateOrder);
router.post("/update-order", postUpdateOrder);
router.post("/delete-order", postDeleteOrder);

module.exports = router;
