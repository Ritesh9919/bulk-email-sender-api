
import express from 'express';
import cors from 'cors';

import userRouter from './routes/user.route.js';
import sendMailRouter from './routes/sendmail.route.js'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


app.use('/api/user', userRouter);
app.use('/api/email', sendMailRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export {app}
