import cookieParser from 'cookie-parser';
import * as path from 'path';
import express from 'express';

var app = express();
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// include api product file
// var products = require('./api/controllers/products');
// app.use('/api/products', products);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Sample Using Swagger by Irfan Maulana'
    });
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}



export default app; // for testing