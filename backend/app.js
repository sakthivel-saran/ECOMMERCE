const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const products = require('./routes/product');
const orders = require('./routes/order');
const payment = require('./routes/payment');

app.use(express.json());
app.use(cors());

app.use('/api/v1', products);
app.use('/api/v1', orders);
app.use('/api/v1', payment);

app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

module.exports = app;