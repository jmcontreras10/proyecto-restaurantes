const { Router } = require("express");
const {
  getOrderHandler,
  createOrderHandler,
  createStatusesHandler,
  registerAnOrderEventHandler,
} = require("./orderController");
const router = Router();

//  api/products/
router.get("/", getOrderHandler);

//  api/products/
router.post("/", createOrderHandler);

//  api/products/statuses
router.post("/statuses", createStatusesHandler);

//  api/products/statuses
router.post("/events", registerAnOrderEventHandler);

module.exports = router;
