const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    fecha: String,
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    rut: String,
    rol: String,
    campus: String,
    anno_ingreso_carrera: Number,
    anno_ingreso_universidad: Number,
    anno_retiro_universidad: Number,
    razones: [String],
    SEF: [String], // Arreglar estos  y pasarlos a arreglos de strigngs
    OTHER_SEF : String,
    VOC: [String],
    OTHER_VOC : String,
    Detail_VOC : String,
    RA1: [String],
    OTHER_RA1 : String,
    RA2: [String],
    OTHER_RA2 : String,
    AU: [String],
    OTHER_AU : String,
    Detail_AU : String,
    otro_motivo: String
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

const Survey = mongoose.model('Encuesta', surveySchema, 'respuestas');

module.exports = Survey;