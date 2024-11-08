const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();
const api = process.env.API_URL;
const PORT = process.env.PORT;
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const orderItemsRouter = require('./routes/orderItems');
const cartRouter = require('./routes/cart');
// const {imagesRouter} = require('./routes/images')
const {errorHandler} = require('./helpers/error-handlers');

//middleware
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(morgan('tiny'));
app.use('/images',express.static(__dirname+'/images'));
app.use(errorHandler);


//routes
app.use(`${api}/items`,itemsRouter);
app.use(`${api}/users`,usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/orderitems`, orderItemsRouter);
app.use(`${api}/cart`,cartRouter);
// app.use(`${api}/images`,imagesRouter);


//database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database connected....')
}).catch((err)=>{
    console.log(err);
})

//server
app.listen(PORT, ()=>{
    console.log(`App listening in port: ${PORT}`);
})