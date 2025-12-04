import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorLog, colorLog } from './utils/logger.js';
import { config } from './config/env.js';
import authRouter from './routes/authRoutes.js';
import contentRouter from './routes/contentRoutes.js';


const app = express();
const PORT = config.PORT;
const corsOptions = {
  origin: '*',
  credentials: true,

}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



app.use(colorLog);

app.use('/auth', authRouter);


app.get('/healthcheck', (req, res) => res.status(200).json('Ok'));

app.use(errorLog);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})