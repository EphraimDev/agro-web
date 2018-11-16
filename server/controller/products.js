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
      product, address, quatity, comment
    } = req.body;
    console.log(quatity)

    const {userId} = req.params;

    return db.ProductsBought.findOrCreate({
      where: {id: 0},
      defaults: {
        product, address, quatity, comment, userId
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
