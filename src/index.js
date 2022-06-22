import express from 'express';
import morgan from 'morgan';
import baseRouter from './routes/api.router.js';
import db from './configs/db/index.js'
import cors from 'cors';

//config
const app = express();
const port = 8080;
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

//CONNECT TO DB
db.connect();

//HTTP logger
app.use(morgan('combined'));

//for parsing application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors(corsOption));

//Route init
app.use('/api', baseRouter);

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});