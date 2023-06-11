const express = require('express');
const cors = require('cors');


const app = express();
const port = 3030;

app.use(express.json());

// DB Connection
const mongoose = require('mongoose');
const uri = 'mongodb+srv://Dr4gonFour:2015730296Cuatro@cluster0.hhaw2ck.mongodb.net/memoria';
// const uri ='mongodb://atlas-sql-642646075ccb7d0bcc5d5ac2-0i1kv.a.query.mongodb.net/memoria?ssl=true&authSource=admin';

mongoose.set('strictQuery', true);

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, ssl: true });
mongoose.connection.on('connected', () => console.log('Database connected\n'));
mongoose.connection.on('error', (err) => console.log('Connection failed with - ', err));


//Model
const Encuesta = require('./Models/Encuesta.model');
const Informacion = require('./Models/Informacion.model');

//CORS
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Routing
app.get('/api/encuestasRespondidas/', (req, res) => {
    Encuesta.find().then((allEncuestas => res.json(allEncuestas)));
});

app.post('/api/encuestasRespondidas/', (req, res) => {
    console.log('Agregando encuesta');
    let cuestionario = req.body;
    Encuesta.create(cuestionario, (err, result) => {
        if (err) throw new Error(err);
        res.json(result);
        console.log('Encuesta', result);
    });
});

app.get('/api/login', (req, res) => {
    if (req.session.user) {
        res.json({ codeLoggedIn: true, user: req.session.user });
    }
    else {
        res.json({ codeLoggedIn: false });
    }
});

app.post('/api/studentCode', (req, res) => {
    console.log('Body ' + JSON.stringify(req.body) + '\n');
    Informacion.findOne({
        "codigoAcceso": req.body.code,
        "answeredSurvey": req.body.surveyAnswered
    }, (error, result) => {
        if (result) {
            console.log('Result', result);
            res.json(result);
        }
        else {
            console.log('Error', error);
        }
    });
});

app.get('/api/seguimiento/', (req, res) => {
    Informacion.find().then((allInformation => res.json(allInformation)));
});

app.post('/api/seguimiento/', (req, res) => {
    console.log('Agregando estudiantes');
    let estudiante = req.body;
    Informacion.create(estudiante, (err, result) => {
        if (err) throw new Error(err);
        res.json(result);
        console.log('Estudiante', result);
    });
});


app.listen(port, () => console.log('Server up at port ' + port));