const express = require('express');

const app = express();
const port = 5005;

// DB Connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/memoria', { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('Database connected'));
mongoose.connection.on('error', (err) => console.log('Connection failed with - ', err));


//Model
const Encuesta = require('./Models/Encuesta.model');

// Routing
app.get('/api/encuestas', (req, res) => {
    Encuesta
        .find()
        .then((allEncuestas => res.json(allEncuestas)));
});
// app.get('/seguimiento');
// app.get('/modificar_encuesta');
// app.get('/encuesta');

app.listen(port, () => console.log('Server up at port ' + port));