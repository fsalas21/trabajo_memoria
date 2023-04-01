const express = require('express');

const app = express();
const port = 5005;

// DB Connection
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/memoria', { useNewUrlParser: true });
// mongoose.connect("mongodb+srv://Dr4gonFour:2015730296Cuatro@cluster0.hhaw2ck.mongodb.net/memoria?retryWrites=true&w=majority", { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('Database connected'));
mongoose.connection.on('error', (err) => console.log('Connection failed with - ', err));


//Model
const Encuesta = require('./Models/Encuesta.model');
const Informacion = require('./Models/Informacion.model');

//CORS
const cors = require('cors');
app.use(cors());

// Routing
app.get('/api/encuestas', (req, res) => {
    Encuesta.find().then((allEncuestas => res.json(allEncuestas)));
});
app.get('/api/seguimiento', (req, res) => {
    Informacion.find().then((allInformation => res.json(allInformation)));
});
// app.get('/modificar_encuesta');
// app.get('/encuesta');

app.listen(port, () => console.log('Server up at port ' + port));