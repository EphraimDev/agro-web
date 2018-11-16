import UUID from 'uuid';
import express from 'express';
import user from '../controller/userController';
import message from '../controller/message';
import article from '../controller/article';
import produce from '../controller/products';
import Auth from '../middleware/auth';
import Validator from '../middleware/validator';
import multer from 'multer';

let storage = multer.diskStorage({
     destination: function(req, file, cb) {
         cb(null, './uploads/');
     },
     filename: function(req, file, cb){
        let uuid = UUID.v4();
       cb(null, uuid + file.originalname);
     }
   })

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}   

//const upload = multer({dest: './uploads/'});
const upload = multer({storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter 
})
const router = express.Router();

router.post('/api/v1/register-user', Validator.validateSignUp, user.signup);
router.post('/api/v1/login', Validator.validateLogin, user.login);
router.get('/api/v1/user/:userId', Auth.authorize, user.userProfile);
router.post('/api/v1/contact-us', message.createNewMessage);
router.post('/api/v1/verify-user', user.verifyAccount);
router.put('/api/v1/user/:userId/edit-profile', Auth.authorize, user.editProfile);
router.post('/api/v1/article', Auth.authorize, upload.single('image'), article.newArticle);
router.put('/api/v1/update-article/:articleId', Auth.authorize, article.updateArticle);
router.get('/api/v1/articles', article.allArticles);
router.get('/api/v1/article/:title', article.readArticle);
router.post('/api/v1/:userId/order-produce', Auth.authorize, produce.newOrder);
router.get('/api/v1/:userId/products-ordered', Auth.authorize, produce.getAllOrders);
router.put('/api/v1/orders/:orderId', Auth.authorize, produce.updateOrder);
router.get('/api/v1/:orderId', Auth.authorize, produce.getOrder);
router.delete('/api/v1/order/:orderId', Auth.authorize, produce.deleteOrder);

export default router;
