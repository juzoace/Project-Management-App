const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}))

const db = 'mongodb://localhost:27017/Project-Management';
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => { 
    console.log(`Unable to connect with the database ${err}`)
});
