const dotEnv = require('dotenv');
dotEnv.config();

const ccokieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const { db, connectDB } = require('./config/db');
const routes = require('./routes/index');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);

const PORT = 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
});