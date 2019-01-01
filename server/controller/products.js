import db from '../models';
//import moment from '../utils/moment';

require('dotenv').config();

/**
 * @exports
 * @class  ProductsController
 */
class ProductsController {
  /**
   * Creates a new order
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static newOrder(req, res, next) {
    const {
      product, address, quantity, amount, comment, price, unit
    } = req.body;

    const {userId} = req.params;

    return db.ProductsBought.findOrCreate({
      where: {id: 0},
      defaults: {
        product, address, quantity, amount, comment, userId, price, unit
      }
    }).spread((newOrder, created) => {
      if (!created) return res.status(409).send({message: 'Order was not successful, try again'})

      return res.status(201).json({
        message: 'Successful',
        success: true,
        newOrder
      });
    })
  }

   /**
   * Gets a product
   * @method getAProduct
   * @memberof ProductsController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static getAProduct(req, res) {
    const {productId} = req.params;
    console.log(productId);

    db.Products.findOne({ where: { productId }})
      .then(product => {
        if(!product) {
          return res.status(400).json({message: "Product does not exist"})
        }

        return res.status(201).json({ 
          product,
          message: "Successful"
        })
      })
      .catch(console.error());
  }

  /**
   * Gets an order
   * @method getOrder
   * @memberof ProductsController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static getOrder(req, res) {
    const {orderId} = req.params;

    db.ProductsBought.findOne({ where: { productsId: orderId }})
      .then(order => {
        if(!order) {
          return res.status(400).json({message: "Order does not exist"})
        }

        return res.status(201).json({ 
          order,
          message: "Successful"
        })
      })
      .catch(console.error());
  }

  /**
   * Gets last order
   * @method getLastOrder
   * @memberof ProductsController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getLastOrder(req, res) {
    const {userId} = req.params;

    try {
      let allOrders = await db.ProductsBoughts.findAll({ where: { userId }});

    const dates = await allOrders.map(order => new Date(order.createdAt).getTime());

    dates.sort();

    let num = dates.length;

    const strDate = JSON.stringify(new Date(dates[num-1]));

    let date = strDate.slice(1, 11);
    let time = strDate.slice(12, 20);
    let gmt = strDate.slice(21,24)
    let fullDate = `${date} ${time}.${gmt}+00`;

    const latestOrder = await db.ProductsBoughts.findOne({ where: { userId, createdAt: fullDate }});

     return res.status(201).json({ 
          latestOrder,
          message: "Successful"
        })
    } catch(err) {
      throw new Error(err)
    }
  }

  /**
   * Gets all orders
   * @method getAllOrders
   * @memberof ProductsController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static getAllOrders(req, res) {

    const {userId} = req.params;

    db.ProductsBought.findAll({where: {userId}} )
      .then(orders => {
        if(!orders) {
          return res.status(400).json({message: "Orders does not exist"})
        }

        return res.status(201).json({ 
          orders,
          message: "Successful"
        })
      })
      .catch(console.error());
  }

  /**
   * Updates an order
   * @method updateOrder
   * @memberof ProductsController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static updateOrder(req, res) {
    const {orderId} = req.params;
    console.log(orderId)
    const {
        product, address, quatity, comment
    } = req.body;

    db.ProductsBought.findOne({ where: { productsId: orderId }})
      .then(foundOrder => {
        if(!foundOrder) {
          return res.status(400).json({message: "Order does not exist"})
        }

        foundOrder.update({
            product, address, quatity, comment
        })
        .then(() =>  res.status(201).json({
          message: 'Order has been updated',
          foundOrder
        }))
        .catch(err => next(err))
      })
      .catch(console.error());
  }

  /**
   * Deletes an order
   * @method updateOrder
   * @memberof ProductsController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static deleteOrder(req, res) {
    const {orderId} = req.params;

    db.ProductsBought.findOne({ where: { productsId: orderId }})
      .then(foundOrder => {
        if(!foundOrder) {
          return res.status(400).json({message: "Order does not exist"})
        }

        foundOrder.destroy()
        .then(() =>  res.status(201).json({
          message: 'Order has been canceled',
        }))
        .catch(err => next(err))
      })
      .catch(console.error());
  }
}

export default ProductsController;
