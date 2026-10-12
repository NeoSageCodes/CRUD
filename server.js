// Loading Express
const express = require('express');

// Importing Middlewares
const router = require('./Router/userRouter');
const errorHandler = require('./Middleware/errorHandler');


// Initializing Express App Instance
const app = express();

// Declaring PORT No
const PORT = 1000;

// CREATING & REGISTERING In-Built Body Parser Middleware at application-lvl
app.use(express.json());

// Registering the router, errorHandler(Route Not Found, serverError) middleware
app.use(router);
app.use(errorHandler.notFound);
app.use(errorHandler.serverError);

// Making the server listen at the declared PORT
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
});