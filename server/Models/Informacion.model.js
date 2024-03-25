const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    codigoAcceso: String,
    surveySentDate: String, // fecha de encuesta enviada
    answeredSurvey: Boolean, // Si contestó la encuesta o no
    timesSent: Number // Veces que se le ha enviado el correo
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Informacion', informationSchema, 'informacion');