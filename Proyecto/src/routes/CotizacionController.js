//NodeJs trabaja asincronamente
//REST
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //todo el obj se convierte en json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Cotizacion = require('../user/Cotizacion'); //modelo mongo

//Recurso->user(REST->Recursos)
// CREATES A NEW USER
router.post('/', function(req, res) { //se hace un POST a user (Request, Responce) http con EXPRESS->Request= a un obj
    Cotizacion.create({ //se usa user
            cotizacion: req.body.cotizacion,
            fecha: req.body.fecha,
        },
        function(err, cotizaciones) { //funcion asincrona que se ejecuta si hay error al grabar
            if (err) return res.status(500).send("There was a problem registering the user.")
            res.status(200).send({ mensaje: "usuario registrado" });
            //500 error, 400 no found, 200 ok
        });
});
//Es asincrona
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function(req, res, next) {
    Cotizacion.find({}, function(err, cotizaciones) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(cotizaciones);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:fecha', function(req, res) {
        Cotizacion.findById(req.params.fecha, function(err, cotizaciones) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!cotizaciones) return res.status(404).send("No user found.");
        res.status(200).send(cotizaciones);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:fecha', function(req, res, next) {
    Cotizacion.findByIdAndRemove(req.params.fecha, function(err, cotizaciones) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + cotizaciones.name + " was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:fecha', function(req, res) {
    Cotizacion.findByIdAndUpdate(req.params.fecha, req.body, { new: true }, function(err, cotizaciones) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(cotizaciones);
    });
});

module.exports = router;