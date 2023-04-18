const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    surveySentDate: String,
    answeredSurvey: Boolean,
    timesSent: Number
})

const Information = mongoose.model('Informacion', informationSchema, 'informacion');

module.exports = Information;