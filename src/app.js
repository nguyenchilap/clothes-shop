import express from 'express';
import morgan from 'morgan';
import baseRouter from './routes/api.router.js';
import db from './configs/db/index.js'
import cors from 'cors';
import helmet from 'helmet';

/***********************************************************************************
 *                                  Config constants
 **********************************************************************************/
const app = express();
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

//CONNECT TO DB
db.connect();


/***********************************************************************************
 *                                  HTTP Logger
 **********************************************************************************/

//Development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Production
if (process.env.NODE_ENV === 'production') {
  console.log('a');
  app.use(helmet());
}

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors(corsOption));

/***********************************************************************************
 *                                  Routes
 **********************************************************************************/
app.use('/api', baseRouter);

export default app;