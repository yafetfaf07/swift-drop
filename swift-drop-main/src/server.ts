import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const port = process.env.PORT_NUMBER;
mongoose.connect(process.env.MONGO_DB_STRING!).then(() => {
  console.log('Database connected');
  app.listen(port, () => {
    console.log('Server running in port: ', port!);
  });
});
