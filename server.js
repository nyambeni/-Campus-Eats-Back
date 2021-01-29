const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// use mysql for development
const mongoose = require('mongoose'); // database for testing purposes 

//const config = require('./config');

const app = express();

// mongoose.connect('databaseName', err => {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log('Database connected');
//     }
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('morgan'));
app.use(cors());


app.get('/', (req, res, next) => {
    res.json({
        user: 'Tebello Maila'
    });
});
app.listen(3030, err => {
    console.log("Application server started on port 3030");
})