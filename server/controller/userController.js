import db from '../models';
import bcrypt from 'bcrypt';
import randomString from 'random-string';
import Authorization from '../middleware/auth';
import Mailer from '../utils/mailer';
//import moment from '../utils/moment';

require('dotenv').config();

/**
 * @exports
 * @class UserController
 */
class UserController {
  
  /**
   * Creates a new user
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static signup(req, res, next) {
    const {
      firstname, lastname, email, password
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userToken = randomString({
      length: 8,
      numeric: true,
      letters: true,
      special: false
    });


    return db.Users.findOrCreate({
      where: {email},
      defaults: {
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: hashedPassword,
        token: userToken
      }
    }).spread((newUser, created) => {
      if (!created) return res.status(409).send({message: 'Email already in use'})

      const token = Authorization.generateToken(newUser);
      
      const url = `https://wizzyagrofarms.herokuapp.com/verify-user`;
      Mailer.verifyAccount(url, firstname, lastname, email, userToken);

      return res.status(201).json({
        message: 'Successful',
        success: true,
        userId:newUser.userId,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        token,
      });
    })
  }

   /**
   * Logs in a user
   * @method login
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static login(req, res) {
    return db.Users.findOne({ 
      where: { email: req.body.email } })
      .then((authUser) => {
        if (!authUser) return res.status(401).json({ message: 'Invalid Credentials' });
        
        if(!authUser.confirmed) return res.status(401).json({message: 'Please confirm your email to login'});
        console.log(authUser.confirmed)
        UserController.verifyPassword(req.body.password, authUser.password)
          .then((result) => {
            if (!result) {
              return res.status(401).json({
                message: 'Email or password incorrect',
              });
            } 
            const token = Authorization.generateToken(authUser);

            
            
            return res.header('x-access-token', token).status(200).json({
              message: 'Login successful',
              success: true,
              authUser,
              token,
            });
          })
          .catch(err => next(err));
        
      })
      .catch(err => next(err));
  }

  /**
   * Verifies user account
   * @method verifyAccount
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static verifyAccount(req, res) {
    const {email, token} = req.body;
    console.log(typeof token);
    
    return db.Users.findOne({ 
      where: { email } })
      .then((authUser) => {
        if (!authUser) return res.status(401).json({ message: 'User does not exist' });
        console.log(typeof authUser.token)
        if(authUser.token !== token) return res.status(401).json({
          message: 'Invalid token'
        })
        Mailer.welcomeUser(email);
        authUser.update({confirmed: true})
        .then(() =>  res.status(201).json({
          message: 'Your account has been verified',
          authUser
        }))
        .catch(err => next(err))

      })
      .catch(err => next(err));
  }

  /**
   * Gets user profile
   * @method userProfile
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static userProfile(req, res) {
    const {userId} = req.params;

    db.Profiles.findOrCreate({ where: { userId }})
      .then(profile => {
        if(!profile) {
          return res.status(400).json({message: "User does not exist"})
        }

        return res.status(201).json({ 
          profile: profile[0],
          message: "Successful"
        })
      })
      .catch(console.error());
  }

  /**
   * Edits profile
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static editProfile(req, res, next) {
    const {
      address, city, state, zip
    } = req.body;

    const {userId} = req.params;

    return db.Profiles.findOne({
      where: {userId}
    })
    .then((user) => {
      if (!user) return res.status(409).send({message: 'Unseccessful! Please try again'})

      user.update({
        address,
        city,
        state,
        zip: Number(zip)
      })
        .then(() => {
          return res.status(201).json({
            message: 'Successful',
            user
          })
        })
      
    })
  }

  /**
   * @method verifyPassword
   * @memberof Users
   * @param {string} password
   * @param {string} hash
   * @return {Promise} Promise of true or false
   */
  static verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  /**
   * Sends password token to user
   * @method forgotPassword
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static forgotPassword(req, res) {
    const { email } = req.body;

    pool.query(queryHelper.text, [email], (err, user) => {
      if (user.rowCount < 1) {
        return res.status(401).json({
          message: 'Email is incorrect',
        });
      }

      const token = randomString({ length: 6 });
      const duration = Date.now() + 3600000;

      pool.query(queryHelper.update, [token, duration, moment.updatedAt, email], (err, user) => {
        Mailer.forgotPasswordMail(token, email);

        return res.status(200).json({
          message: 'A reset token has been sent to your email address',
          token,
        });
      });
    });
  }

  /**
   * Sends password token to user
   * @method resetPassword
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static resetPassword(req, res) {
    const { email, password, token } = req.body;

    pool.query(queryHelper.text, [email], (err, user) => {
      if (user.rowCount < 1) {
        return res.status(401).json({
          message: 'Email is incorrect'
        });
      }

      if (token !== user.rows[0].password_reset_token) {
        return res.status(400).json({
          message: 'Password reset token is invalid or has expired',
        });
      }

      const passwordResetToken = null;
      const duration = null;

      const hashedPassword = bcrypt.hashSync(password, 10);
      pool.query(queryHelper.resetPassword, [hashedPassword, passwordResetToken, duration, queryHelper.updatedAt, email], (err, user) => {
        Mailer.resetPasswordMail(email);
        const userToken = Authorization.generateToken(user);
        return res.status(200).json({
          message: 'Password has been reset successfully',
          userToken,
        });
      });
    });
  }
}

export default UserController;
