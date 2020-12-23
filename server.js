const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
let dotenv = require('dotenv').config();

//handling the users routing
const users = require('./routes/api/users');

//initialize express into a variable called app
const app = express();

//BodyParser has a piece of middleware that we need to add 
app.use(express.json());

//importing the MONGO_URI
const db = process.env.MONGO_URI;

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("Connected Successfully to MongoDB");
    })
    .catch(err => {
        console.error(err);
    })


//Requests for /api/users
app.use('/api/users', users);


/* Modification to do if we are in production */
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //1-set static folder 
    app.use(express.static('client/build'));

    //2-For any path we get we will serve our single page index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    })
}
/* ---------------------End Modifications------------------------------ */


//Our server start listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})