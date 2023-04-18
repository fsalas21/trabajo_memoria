from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config["MONGO_URI"] = 'mongodb+srv://Dr4gonFour:2015730296Cuatro@cluster0.hhaw2ck.mongodb.net/memoria?retryWrites=true&w=majority'

mongo = PyMongo(app)

@app.route("/")
def helloWorld():
    return "Hello World"