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
      name, email, phoneNumber, message
    } = req.body;

    Mailer.createMessage(name, phoneNumber, email, message);
    return res.status(200).json({
        message: 'successful'
    })
  }
}

export default MessageController; 
