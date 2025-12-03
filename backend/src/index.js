import e from 'Express';
import colorLog, { errorLog } from './utils/logger.js';
import authRouter from './route/authRoutes.js';

const app = Express();
app.use(colorLog);

app.use('/auth', authRouter);


app.get('/healthcheck', (req,res)=>res.status(200).json('Ok'));
app.use(errorLog);

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})