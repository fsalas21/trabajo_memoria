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
    anno_retiro_carrera: Number,
    razones: [String], // Lista de razones de retiro.
    SEF: [String], // Lista de razones de Situación económica y familiar.
    OTHER_SEF: String, // Otras razones de lo anterior.
    VOC: [String], // Lista de razones de Vocacionales.
    OTHER_VOC: String, // Otras razones de lo anterior.
    Detail_VOC: String, // Detalles de una de las opciones elegidas anteriormente.
    RA1: [String], // Lista de razones de Rendimiento Académico 1.
    OTHER_RA1: String, // Otras razones de lo anterior.
    RA2: [String], // Lista de razones de Rendimiento Académico 2.
    OTHER_RA2: String, // Otras razones de lo anterior.
    AU: [String], // Lista de razones de Ambiente Universitario.
    OTHER_AU: String, // Otras razones de lo anterior.
    Detail_AU: String, // Detalles de una de las opciones elegidas anteriormente.
    otro_motivo: String // Otras razones generales de retiro.
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

const Survey = mongoose.model('Encuesta', surveySchema, 'respuestas');

module.exports = Survey;