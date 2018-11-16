/**
 * @exports
 * @class UnitValidation
 */
class UserValidation {
  /**
        * Validate product input
        *
        * @staticmethod
        * @param  {object} req - Request object
        * @param {object} res - Response object
        * @param {function} next - middleware next (for error handling)
        * @return {json} res.json
        */
  static validateSignUp(req, res, next) {
    //const regex = /^(?=.*[a-zA-Z 0-9 (),.'-]).+$/;
    const nameRegex = /^(?=.*[a-zA-Z-]).+$/;
    const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/;
    //const digits = /^(?=.*[0-9]).+$/;
    //const imgRegex = /^https?:\/\/(?:[a-z-]+\.)+[a-z]{2,6}(?:\/[^#?]+)+\.(?:jpe?g|gif|png)$/;
    const regPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/;
    const {firstname, lastname, email, password} = req.body;
    
    if (!firstname || !nameRegex.test(firstname) || !firstname.length > 0 || typeof firstname !== 'string') {
      res.status(400).json({ message: 'Firt name must be added' });
    } else if (!lastname || !nameRegex.test(lastname) || !(lastname.length > 0) || typeof lastname !== 'string') {
      res.status(400).json({ message: 'Last name must be added' });
    } else if (!email || !emailRegex.test(email)) {
      res.status(400).json({ message: 'input valid email' });
    } else if(!password || !regPass.test(password)){
      res.status(400).json({message: 'Password must have at least 8 characters, a upper case letter, a number and a special character'})
    } else {
      next();
    }
  }

  /**
    * Validate product input
    *
    * @staticmethod
    * @param  {object} req - Request object
    * @param {object} res - Response object
    * @param {function} next - middleware next (for error handling)
    * @return {json} res.json
    */
    static validateLogin(req, res, next) {
    const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/;
    //const digits = /^(?=.*[0-9]).+$/;
    //const imgRegex = /^https?:\/\/(?:[a-z-]+\.)+[a-z]{2,6}(?:\/[^#?]+)+\.(?:jpe?g|gif|png)$/;
    const regPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/;
    const {email, password} = req.body;
    
    if (!email || !emailRegex.test(email)) {
      res.status(400).json({ message: 'input valid email' });
    } else if(!password || !regPass.test(password)){
      res.status(400).json({message: 'Password must have at least 8 characters, a upper case letter, a number and a special character'})
    } else {
      next();
    }
  }
}

export default UserValidation;
