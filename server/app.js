import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

// Set up the express app
const app = express();

import router from './route';

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000 }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   if (req.headers.origin) {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//   }
//   if (req.method === 'OPTIONS') {
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });
app.use(cors());
app.options('*', cors())
app.use(router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Wizzy Agro app starts at port ${PORT}`);
});

export default app;