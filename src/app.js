import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';


// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())



//import routes
import userRouter from './routes/user.routes.js'


app.use('/api/v1/user', userRouter)



export default app;
