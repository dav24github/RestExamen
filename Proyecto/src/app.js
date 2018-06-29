var express = require('express');
var app = express();
var db = require('./config/db'); //guarda en la db

var CotizacionController = require('./routes/CotizacionController');

app.use('/cotizaciones', CotizacionController);

module.exports = app;