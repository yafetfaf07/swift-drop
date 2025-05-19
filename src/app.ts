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

// import multer from 'multer';
import path from 'path';
import { DeliverPersonnelService } from './services/DeliverPersonnelService';
import { DeliverPersonnelController } from './controllers/deliverPersonnelController';
import { DeliverPersonnelRouter } from './routes/deliverpersonnelrouter';
import { OrderService } from './services/OrderService';
import { OrderController } from './controllers/orderController';
import { OrderRouter } from './routes/orderrouter';
import { CommentService } from './services/CommentService';
import { CommentController } from './controllers/commentController';
import { CommentRouter } from './routes/commentroutes';

// Ensure the upload directory exists
// const uploadDir = path.join(process.cwd(), 'uploads'); // Relative to project root
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
    //     cb(null, uploadDir); // Use the verified directory
    //   },
    //   filename: function (req, file, cb) {
//     cb(null, file.originalname); 
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Optional: limit file size to 5MB
// }).single('file');

// Express route with error handling


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

// This for Deliver Personnel (This is where DI is happening)

const DeliverPersonnelServices=new DeliverPersonnelService();
const DeliverPersonnelControllers=new DeliverPersonnelController(DeliverPersonnelServices);
const DeliverPersonnelRoutes=new DeliverPersonnelRouter(DeliverPersonnelControllers);

//  This is for Order (This is where DI is happening)
const OrderServices = new OrderService();
const OrderControllers = new OrderController(OrderServices);
const OrderRouters = new OrderRouter(OrderControllers);

//This is for Comments (This is where DI is happening)

const CommentServices = new CommentService();
const CommentControllers = new CommentController(CommentServices);
const CommentRoutes = new CommentRouter(CommentControllers);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/order', OrderRouters.registerRoutes());
app.use('/api/deliver',DeliverPersonnelRoutes.registerRoutes());
app.use('/api/users', UserRouters.registerRoutes())
app.use('/api/merchant',MerchantRoutes.registerRoutes());
app.use('/api/product',ProductRouters.registerRoutes());
app.use('/api/comments', CommentRoutes.registerRoutes())

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
