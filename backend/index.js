const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');

const api = process.env.API_URL;
const PORT = process.env.PORT;
const itemsRouter = require('./routes/items')

//middleware
const app = express();
app.use(express.json());
app.use(morgan('tiny'))

//routes
app.get(`${api}/items`,itemsRouter)
app.post(`${api}/items`,itemsRouter)

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