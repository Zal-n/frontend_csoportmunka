import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import { errorLog, colorLog } from './utils/logger.js';
import { config } from './config/env.js';
import { swaggerSpec } from './config/swagger.js';
import authRouter from './routes/authRoutes.js';
import contentRouter from './routes/contentRoutes.js';



const app = express();
const PORT = config.PORT;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,

}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



app.use(colorLog);

app.use('/auth', authRouter);
app.use('/content', contentRouter);

if(config.NODE_ENV === 'dev'){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.get('/healthcheck', (req, res) => res.status(200).json('Ok'));

app.use(errorLog);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
