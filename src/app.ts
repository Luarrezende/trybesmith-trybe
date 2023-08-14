import express from 'express';
import products from './routes/products';
import orders from './routes/orders';
import login from './routes/login';

const app = express();

app.use(express.json());

app.use('/products', products);
app.use('/orders', orders);
app.use('/login', login);

export default app;
