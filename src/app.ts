import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import createHttpError, {isHttpError}from 'http-errors';
import  { UserRouter } from "./routes/userrouter";
import { MerchantService } from './services/MerchantService';
import { MerchantController } from './controllers/merchantController';
import { MerchantRouter } from './routes/merchantrouter';
import { UserService } from './services/UserService';
import { UserController } from './controllers/userController';
import { ProductService } from './services/ProductService';
import { ProductController } from './controllers/productController';
import { ProductRouter } from './routes/productrouter';
const app = express();

app.use(morgan('dev')); // used for better debugging for mongodb databases

// this is used for sending json data to our server mostly for our headers
app.use(express.json());

// This is for merchant (This is where DI is happening)
const MerchantServices = new MerchantService();
const MerchantControllers = new MerchantController(MerchantServices);
const MerchantRoutes = new MerchantRouter(MerchantControllers);

// This is for User (This is where DI is happening)

const UserServices = new UserService();
const UserControllers = new UserController(UserServices);
const UserRouters = new UserRouter(UserControllers);

// This is for Product (This is where DI is happening)

const ProductServices = new ProductService();
const ProductControllers = new ProductController(ProductServices);
const ProductRouters = new ProductRouter(ProductControllers);


app.use('/api/users', UserRouters.registerRoutes())
app.use('/api/merchant',MerchantRoutes.registerRoutes());
app.use('/api/product',ProductRouters.registerRoutes());

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
