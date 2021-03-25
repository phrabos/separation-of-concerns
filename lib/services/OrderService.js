const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }

  static async getAllOrders() {

    const allOrders = await Order.getOrders();

    return allOrders;
  }

  static async getOrderById(id) {

    const singleOrder = await Order.getSingleOrder(id);

    return singleOrder;
  }


  static async updateOrder(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order updated, new quantity ${quantity}`
    );
    const reviseOrder = await Order.updateQuantity(id, quantity);

    return reviseOrder;
  }
  static async deleteOrder(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      'Order deleted'
    );
    const deleteOrder = await Order.deleteOrder(id);

    return deleteOrder;
  }
};
