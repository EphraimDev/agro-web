import nodemailer from 'nodemailer';
import randomString from 'random-string';

require('dotenv').config();

let verify = randomString({
  length: 12,
  numeric: true,
  letters: true,
  special: true
})

/**
 * Mailer Event Emitter
 * @exports
 * @class Mailer
 * @extends EventEmitter
 */
class Mailer {
  /**
   * Sends Mail
   * @method sendMail
   * @memberof Mailer
   * @param {string} to
   * @param {string} subject
   * @param {string} message
   * @returns {nothing} returns nothing
   */
  static sendMail({ email, subject, content }) {
    // create reusable transporter object
    const transporter = nodemailer.createTransport({
      service: process.env.service,
      auth: {
        user: process.env.user,
        pass: process.env.pass
      }
    });

    // setup email data
    const mailOptions = {
      from: email,
      to: process.env.user,
      subject,
      html: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(info);
    });
  }

  /**
   * Sends Mail after user succesfully creates an account
   * @method createMessage
   * @memberof Mailer
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static createMessage(name, subject, email, message) {
    return Mailer.sendMail({
      email,
      subject,
      content: `
        <div>
          <h4>Name: ${name}</h4>
          <h4>Email: ${email}</h4>
          <h4>Message: ${message}<h4>
        </div>
      `
    });
  }

  /**
   * Sends Mail after user succesfully creates an account
   * @method createMessage
   * @memberof Mailer
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static newsletter(email) {
    return Mailer.sendMail({
      email,
      subject: "Add me to your subscribers' list",
      content: `
        <div>
          Kindly add my email, ${email}, to your list for future newsletters
        </div>
      `
    });
  }

  /**
   * Sends Mail after user succesfully creates an account
   * @method createMessage
   * @memberof Mailer
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static createMessageOrder(name, reference, phone, email, address, product, quantity) {
    return Mailer.sendMail({
      email,
      subject: 'New Order',
      content: `
        <div>
          <h4>Ref: ${reference}</h4>
          <h4>Name: ${name}</h4>
          <h4>Phone Number: ${phone}<h4>
          <h4>Email: ${email}</h4>
          <h4>Address: ${address}</h4>
          <h4>Product: ${product}</h4>
          <h4>Quantity: ${quantity}<h4>
        </div>
      `
    });
  }

  /**
   * Sends Mail for user to verify account
   * @method verifyAccount
   * @memberof Mailer
   * @param {string} token
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static verifyAccount( url, firstname, lastname, email, token ) {
    const message = `<div>
      <p style="text-transform: capitalize;">Hi, ${firstname} ${lastname}</p>
      <p>Thank you for opening an account with WizzyAgro Farms</p>
      <p>You can click on or copy this link: <a href='${url}'>
      ${url}</a> and paste this ${token} to verify your account</p>
      <p>Have a great day.</p>
      </div>`;

    return Mailer.sendVerificationMail({
      to: email,
      subject: 'Verify Account',
      message,
    });
  }

  /**
   * Sends Mail for user to welcome user
   * @method welcomeUser
   * @memberof Mailer
   * @param {string} token
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static welcomeUser( email ) {
    const message = `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>Your profile has been verified.</p>
      <p>Welcome to WizzyAgro Farms.</p>
      <p>Have a great day.</p>
      </div>`;

    return Mailer.sendVerificationMail({
      to: email,
      subject: 'Welcome Message',
      message,
    });
  }

  /**
   * Sends Mail
   * @method sendMail
   * @memberof Mailer
   * @param {string} to
   * @param {string} subject
   * @param {string} message
   * @returns {nothing} returns nothing
   */
  static sendVerificationMail({ to, subject, message }) {

    // create reusable transporter object
    const transporter = nodemailer.createTransport({
      service: process.env.service,
      auth: {
        user: process.env.user,
        pass: process.env.pass
      }
    });

    // setup email data
    const mailOptions = {
      from: `"WizzyAgro Farms" ${process.env.user}`,
      to,
      subject,
      html: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(info);
    });
  }

  /**
   * Sends Mail for user to use to reset his password
   * @method forgotPasswordMail
   * @memberof Mailer
   * @param {string} token
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static forgotPasswordMail(token, email) {
    const message = `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>You recently requested to reset your password. If this wasn't you, please ignore this mail.</p>
      <p>You can click on or copy this link: <a href='https://${url}/reset_password?token=${token}'>
      https://${url}/reset_password?token=${token}</a> to reset your password</p>
      <p>This link expires in 1 hour.</p>
      <p>Have a great day.</p>
      </div>`;

    return Mailer.sendMail({
      to: email,
      subject: 'Reset Password',
      message,
    });
  }

  /**
   * Sends Mail after user succesfully reset his password
   * @method resetPasswordMail
   * @memberof Mailer
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static resetPasswordMail(email) {
    const message = `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>Your password was reset succesfully.</p>
      <p><a href='https://${url}/signin'>Login</a> to your account.</p>
      </div>`;

    return Mailer.sendMail({
      to: email,
      subject: 'Password Reset Successful',
      message,
    });
  }
}

export default Mailer;
