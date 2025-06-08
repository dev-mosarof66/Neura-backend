import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())



import userRouter from './routes/user.routes.js'


app.use('/api/v1/user', userRouter)



export default app;
