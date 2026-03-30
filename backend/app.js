const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path')
const connectDatabase = require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname, '.env')})
const cors = require('cors')

const products = require('./routes/product');
const orders = require('./routes/order');
const payment = require('./routes/payment');

connectDatabase();

app.use(express.json())
app.use(cors());

// API routes FIRST (before static files)
app.use('/api/v1', products);
app.use('/api/v1', orders);
app.use('/api/v1', payment);

// Serve static files (CSS, JS bundles)
app.use("/static", express.static(path.join(__dirname, "static")));

// Catch-all: serve React index.html for any non-API route (client-side routing)
app.get("{*path}", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`server listening to ${process.env.PORT} port in ${process.env.NODE_ENV}`)
})