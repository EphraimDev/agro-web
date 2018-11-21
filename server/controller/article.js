import db from '../models';
import config from '../config';
//import moment from '../utils/moment';


require('dotenv').config();
 
/**
 * @exports
 * @class  ArticleController
 */
class ArticleController {
  /**
   * Creates a new article
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static newArticle(req, res, next) {
    const {
      title, article, image
    } = req.body;

    return db.Articles.findOrCreate({
      where: {title},
      defaults: {
        title , 
        image, 
        article
      }
    }).spread((newArticle, created) => {
      if (!created) return res.status(409).send({message: 'Title already in use'})
      
      return res.status(201).json({
        message: 'Successful',
        success: true,
        newArticle: newArticle[0]
      });
    })
  }

  /**
   * Gets an article
   * @method readArticle
   * @memberof ArticleController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static readArticle(req, res) {
    const {title} = req.params;

    console.log(title)

    db.Articles.findOne({ where: { title }})
      .then(article => {
        if(!article) {
          return res.status(400).json({message: "Article does not exist"})
        }

        return res.status(201).json({ 
          article,
          message: "Successful"
        })
      })
      .catch(console.error());
  }

  /**
   * Gets all articles
   * @method readArticle
   * @memberof ArticleController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static allArticles(req, res) {

    db.Articles.findAll()
      .then(articles => {
        if(!articles) {
          return res.status(400).json({message: "Article does not exist"})
        }

        return res.status(201).json({ 
          articles,
          message: "Successful"
        })
      })
      .catch(console.error());
  }

  /**
   * Updates an article
   * @method updateArticle
   * @memberof ArticleController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static updateArticle(req, res) {
    const {articleId} = req.params;

    const {
      title, image, article
    } = req.body;

    db.Articles.findOne({ where: { articleId }})
      .then(foundArticle => {
        if(!foundArticle) {
          return res.status(400).json({message: "Article does not exist"})
        }

        foundArticle.update({
          title, image, article
        })
        .then(() =>  res.status(201).json({
          message: 'Article has been updated',
          foundArticle
        }))
        .catch(err => next(err))
      })
      .catch(console.error());
  }
}

export default ArticleController;
