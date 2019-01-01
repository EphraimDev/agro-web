import Mailer from '../utils/mailer';
/** 
 * @exports
 * @class MessageController
 */
class MessageController {
  /**
     * Creates a new unit
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @return {json} res.json
     */
  static createNewMessage(req, res) {
    const {
      name, email, subject, message
    } = req.body;

    Mailer.createMessage(name, subject, email, message);
    return res.status(200).json({
        message: 'successful'
    })
  }

  /**
     * Creates a new unit
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static subscribe(req, res) {
      const {
        email
      } = req.body;
  
      Mailer.newsletter(email);
      return res.status(200).json({
          message: 'successful'
      })
    }

  /**
     * Creates a new unit
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static receiveOrderMessage(req, res) {
      const {
        name, email, phone, reference, address, product, quantity
      } = req.body;
  
      Mailer.createMessageOrder(name, reference, phone, email, address, product, quantity);
      return res.status(200).json({
          message: 'successful'
      })
    }
}

export default MessageController; 
