import jwt from 'jsonwebtoken';
import db from '../models';

require('dotenv').config();
 
/**
 * @exports
 * @class Authorization
 */
class Authorization {
  /**
   * @method generateToken
   * @memberof Authorization
   * @param {object} user
   * @returns {string} token
   * expires in 48 hours
   */
  static generateToken(user) {
    const token = jwt.sign(
      {
        id: user.userId,
        email: user.email.toLowerCase(),
        password: user.password,
      },
      process.env.SECRET,
      {
        expiresIn: '1d',
      },
    );

    return token;
  }
 
  /**
   * Authorize user
   * @method authorize
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static authorize(req, res, next) {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.SECRET);
      //const text = `SELECT * FROM users where email = '${decoded.email}'`;
      const foundUser = db.Users.findOne({where: {email: decoded.email}});
      req.user = decoded;
      req.userId = foundUser.userId;
      req.email = foundUser.email;

      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Token is invalid or not provided',
      });
    }
  }
}

export default Authorization;
