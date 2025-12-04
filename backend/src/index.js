import express from 'express';
import { errorLog, colorLog } from './utils/logger.js';
import authRouter from './route/authRoutes.js';
import { config } from './config/env.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = config.PORT;
const corsOptions = {
  origin: '*',

}

app.use(cors(corsOptions));
app.use(express.json());



app.use(colorLog);

app.use('/auth', authRouter);


app.get('/healthcheck', (req, res) => res.status(200).json('Ok'));

app.use(errorLog);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})