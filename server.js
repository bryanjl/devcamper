const express = require('express');
const dotenv = require('dotenv');

//load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

//finds the port from dotenv OR uses port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`));