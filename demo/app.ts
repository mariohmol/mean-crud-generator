import cookieParser from 'cookie-parser';
import * as path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

var app = express();
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// include api product file
// var products = require('./api/controllers/products');
// app.use('/api/products', products);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Sample Using Swagger'
    });
});


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    const result = {
        message: err.message,
        error: err
    };
    if (app.get('env') !== 'development') {
        delete result.error;
    }
    res.render('error');
});




export default app; // for testing