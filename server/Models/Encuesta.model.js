const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    fecha: String,
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    rut: String,
    rol_usm: String,
    campus: String,
    anno_ingreso_carrera: Number,
    anno_ingreso_universidad: Number,
    anno_retiro_universidad: Number,
    razones: String,
    SEF: String,
    V1: String,
    V2: String,
    RA1: String,
    RA2: String,
    AU1: String,
    AU2: String,
    otro_motivo: String
});

const Survey = mongoose.model('Encuesta', surveySchema, 'memoria');

module.exports = Survey;