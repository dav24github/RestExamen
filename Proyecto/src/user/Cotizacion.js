
var mongoose = require('mongoose');

var CotizacionSchema = new mongoose.Schema({
    cotizacion: String,
    fecha: String,
});
mongoose.model('Cotizacion', CotizacionSchema);

module.exports = mongoose.model('Cotizacion');