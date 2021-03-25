const { Router } = require('express');
const OrderService = require('../services/OrderService');
// const Order = require('../models/Order');

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const result = await OrderService.getAllOrders()
      res.send(result);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await OrderService.getOrderById(id)
      res.send(result);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.body.id
      const quantity = req.body.quantity
      const result = await OrderService.updateOrder(id, quantity)
      res.send(result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {});
