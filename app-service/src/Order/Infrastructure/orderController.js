const Order = require("../Domain/VOOrder");
const { getOrderById, createOrder, updateValues } = require("./orderDAO");
const { addElements } = require("../../Shared/Infrastructure/enumDAO");

const getOrderHandler = async (req, res) => {
  const id = req.query.id;
  getOrderById(id)
    .then((order) => {
      res.json({
        message: `OK`,
        order: order,
      });
      res.status(200);
    })
    .catch((e) => {
      console.log(e);
      res.json({ message: e, id: id });
      res.status(500);
    });
};

/**
 * POST: Create an Order
 * @param {Request} req
 * @param {Response} res
 */
const createOrderHandler = async (req, res) => {
  const data = req.body;

  const order = Order(
    "",
    data.orderState,
    new Date(data.entryHour),
    new Date(data.startingHour),
    new Date(data.endingHour),
    new Date(data.deliveryHour),
    null,
    data.duration,
    data.products
  );

  createOrder(order)
    .then((id) => {
      res.json({
        message: `Orden creada exitosamente con el id ${id}`,
        id: id,
      });
      res.status(201);
    })
    .catch((e) => {
      console.log(e);
      res.json({ message: e, id: id });
      res.status(500);
    });
};

const createStatusesHandler = (req, res) => {
  const statuses = req.body;
  addElements(statuses, "order_status")
    .then(() => {
      res.json({ message: "Statuses creados exitosamente" });
      res.status(201);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500);
    });
};

const registerAnOrderEventHandler = async (req, res) => {
  const { orderId, eventType, date } = req.body;
  const dateRegistry = new Date(date);
  try {
    const order = await getOrderById(orderId);
    if (eventType === 0) {
      await updateValues(
        orderId,
        ["starting_hour", "order_state"],
        [dateRegistry, 1]
      );
      res.status(200);
      res.json({
        message: `Se ha registrado el evento de inicio de orden exitosamente`,
      });
    } else if (eventType === 1) {
      await updateValues(
        orderId,
        ["ending_hour", "order_state"],
        [dateRegistry, 2]
      );
      const start = new Date(order.entry_hour);
      const end = new Date(order.ending_hour);
      const difference = end.getTime() - start.getTime();
      await updateValues(
        orderId,
        ["duration"],
        [Math.abs(Math.round(difference / 1000 / 60))]
      );
      res.status(200);
      res.json({
        message: `Se ha registrado el evento de finalización de orden exitosamente`,
      });
    } else if (eventType === 2) {
      await updateValues(orderId, ["delivery_hour", "order_state"], [date, 3]);
      res.status(200);
      res.json({
        message: `Se ha registrado el evento de envío de orden exitosamente`,
      });
    } else {
      res.status(412);
      res.json({
        message: `Se ha introducido un estado incorrecto.`,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      message: `Error con el ervidor.`,
    });
  }
};

module.exports = {
  getOrderHandler: getOrderHandler,
  createOrderHandler: createOrderHandler,
  createStatusesHandler: createStatusesHandler,
  registerAnOrderEventHandler: registerAnOrderEventHandler,
};
