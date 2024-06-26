const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');

const app = express();
const api = process.env.API_URL;
const PORT = process.env.PORT;
const itemsRouter = require('./routes/items')
const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')
const orderItemsRouter = require('./routes/orderItems')

//middleware
app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(morgan('tiny'));


//routes
app.use(`${api}/items`,itemsRouter)
app.use(`${api}/users`,usersRouter)
app.use(`${api}/orders`, ordersRouter)
app.use(`${api}/orderitems`, orderItemsRouter)

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