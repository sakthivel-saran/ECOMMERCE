const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = require('./app');
const connectDatabase = require('./config/connectDatabase');

connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
});

module.exports = server;