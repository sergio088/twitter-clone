const express = require("express");
const app = express();
const fs = require("fs");
const { MongoClient } = require("mongodb");
const path = require("path");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 5000;
const db = require("./models/firebase.js");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { conectar, getCollection } = require("./models/mongo.js");

const {
  verificarcadastrobody,
  enviarcadastromongo,
} = require("./controllers/usuarioscontroller.js");
const { verificarloginbody } = require("./controllers/logincontroller.js");

async function startServer() {
  await conectar(); // garante que o Mongo está conectado
  app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
  });
}

startServer();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.post("/api/verificarcadastro", verificarcadastrobody);
app.post("/api/cadastro", enviarcadastromongo);
app.post("/api/verificarlogin", verificarloginbody);
