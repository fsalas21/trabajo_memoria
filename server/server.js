const express = require('express');

const app = express();
const port = 5005;

const mongoose = require('mongoose');
mongoose
    .connect('mongodb://localhost/memoria_v1')
    .then(() => console.log('Database connected'));

app.get('/inicio', (req, res) => res.json({
    message : 'Hola inicio',
    date : new Date(),
    campus : 'USM Casa Central'
}));
// app.get('/seguimiento');
// app.get('/modificar_encuesta');
// app.get('/encuesta');

app.listen(port, () => console.log('Server up at port ' + port));