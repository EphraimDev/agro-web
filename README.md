# Agro-Web
    

### API Deployment
API is deployed at [https://ephaig-web.herokuapp.com/api/v1](https://ephaig-web.herokuapp.com/api/v1)


## Technologies

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework
* [NPM](https://www.npmjs.com/) - Dependency Manager


## Features

### Users
* Signup and Login
* Create Profile
* Modify Profile
* Get Profile
* Create Article
* Modify Article
* Get an Article
* Get all Articles
* Make an Order
* Get an Order
* Get all Orders
* Modify Order
* Delete Order

## Getting Started

### Testing

#### Prerequisites

* [Postman](https://getpostman.com/) - API Toolchain


### Endpoints to test for
* Sign Up - https://ephaig-web.herokuapp.com/api/v1/register-user
* Login - https://ephaig-web.herokuapp.com/api/v1/login
* Update Profile - https://ephaig-web.herokuapp.com/api/v1/user/:userId/edit-profile
* Get Profile - https://ephaig-web.herokuapp.com/api/v1/user/:userId
* Post Article - https://ephaig-web.herokuapp.com/api/v1/article
* Update Article - https://ephaig-web.herokuapp.com/api/v1/update-article/:articleId
* Get an Article - https://ephaig-web.herokuapp.com/api/v1/article/:title
* Get All Articles - https://ephaig-web.herokuapp.com/api/v1/articles
* Post an Order - https://ephaig-web.herokuapp.com/api/v1/:userId/order-produce
* Get All Orders - https://ephaig-web.herokuapp.com/api/v1/:userId/products-ordered
* Get An Order - https://ephaig-web.herokuapp.com/api/v1/:orderId
* Delete An Order - https://ephaig-web.herokuapp.com/api/v1/order/:orderId
* Update an Order - https://ephaig-web.herokuapp.com/api/v1/orders/:orderId
