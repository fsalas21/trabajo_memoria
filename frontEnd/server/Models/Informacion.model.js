const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    codigoAcceso: String,
    surveySentDate: String,
    answeredSurvey: Boolean,
    timesSent: Number
}, {
    versionKey: false // You should be aware of the outcome after set to false
})

module.exports = mongoose.model('Informacion', informationSchema, 'informacion');