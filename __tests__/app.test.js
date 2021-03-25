const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 11 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 11,
        });
      });
  });

  it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('ASYNC/AWAIT: returns all orders', async () => {

    const order = await Order.insert({quantity: 10})
    const order2 = await Order.insert({quantity: 5})
    const res = await request(app)
      .get('/api/v1/orders')

    expect(res.body).toEqual([order, order2]);
  });

  it('ASYNC/AWAIT: returns a signle order that matches a given id', async () => {

    const order = await Order.insert({quantity: 10})
    const order2 = await Order.insert({quantity: 5})
    const res = await request(app)
      .get('/api/v1/orders/2')

    expect(res.body).toEqual([order2]);
  });

  it('ASYNC/AWAIT: updates a signle order that matches a given id', async () => {

    const order = await Order.insert({quantity: 10})
    const order2 = await Order.insert({quantity: 5})
    const res = await request(app)
      .put('/api/v1/orders/2')
      .send({ id: 2, quantity: 99 })
    
    const updatedOrder = await request(app)
      .get('/api/v1/orders/2')

    expect(res.body).toEqual(updatedOrder.body);
  });
});
