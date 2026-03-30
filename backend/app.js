const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path')
const connectDatabase = require('./config/connectDatabase');
dotenv.config()
const cors = require('cors')

const products = require('./routes/product');
const orders = require('./routes/order');
const payment = require('./routes/payment');

connectDatabase();

app.use(express.json())
app.use(cors());

// Serve static files
app.use("/static", express.static(path.join(__dirname, "static")));

// Serve React index.html for all routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.use('/api/v1/',products);
app.use('/api/v1/',orders);
app.use('/api/v1/',payment);
app.listen(process.env.PORT, () => {
    console.log(`server listening to ${process.env.PORT} port in ${process.env.NODE_ENV}`)
})