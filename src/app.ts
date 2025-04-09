import express, { NextFunction, Request, Response } from 'express';
import routerNotes from './routes/noteroutes';
import morgan from 'morgan';
import createHttpError, {isHttpError}from 'http-errors';
import userRoutes from "./routes/userrouter";
const app = express();

app.use(morgan('dev')); // used for better debugging for mongodb databases

// this is used for sending json data to our server mostly for our headers
app.use(express.json());



app.use('/api/notes', routerNotes);
app.use('/api/users', userRoutes)

app.use((req, res, next) => {
  next(createHttpError(404,'Endpoint not found'));
});
// This middleware also checks for any kind of error status code
//You have to add the types for error handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occured';
  let stausCode=500;
    if(isHttpError(error)) {
      stausCode=error.status;
      errorMessage=error.message
    }
  res.status(stausCode).json({
    error: errorMessage,
  });
});

export default app;
