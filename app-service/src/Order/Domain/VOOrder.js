const Order = (id, orderState, entryHour, startingHour, endingHour, deliveryHour, inCharge, duration, products) => {
  return {
    id: id,
    orderState: orderState,
    entryHour: entryHour,
    startingHour: startingHour,
    endingHour: endingHour,
    deliveryHour: deliveryHour,
    inCharge: inCharge,
    duration: duration,
    products: products
  }
}

module.exports = Order;
