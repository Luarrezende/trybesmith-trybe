import express from 'express';
import products from './routes/products';
import orders from './routes/orders';

const app = express();

app.use(express.json());

app.use('/products', products);
app.use('/orders', orders);

export default app;
