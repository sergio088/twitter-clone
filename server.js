const express = require("express");
const app = express();
const fs = require("fs");
const { MongoClient } = require("mongodb");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const bcrypt = require("bcrypt");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "views", ".ejs"));
liveReloadServer.watch(path.join(__dirname, "views"));
liveReloadServer.watch(path.join(__dirname, "public"));

app.set("view engine", "ejs");
app.set("views", "./X/views");

app.use(connectLivereload());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const url = "mongodb://localhost:27017/";
const mongodb = new MongoClient(url);

async function conectar() {
  try {
    await mongodb.connect();
    const db = mongodb.db("Banco-X");
    const collection = db.collection("Usuarios");
    console.log("Conectado ao MongoDB!");
  } catch (erro) {
    console.error("Erro ao conectar ao MongoDB:", erro.message);
  }
}

conectar();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "homepage.html"));
});

app.get("/Criarconta", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cadastro.html"));
});
app.get("/Entrar", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "logar.html"));
});

app.post("/verificarcadastro", async (req, res) => {
  const { nome, celular, email, senha, nascdata } = req.body;

  const db = mongodb.db("Banco-X");
  const collection = db.collection("Usuarios");

  try {
    const foundUser = await collection.findOne({ nome });
    const foundCell = await collection.findOne({
      celular,
    });
    if (foundUser) {
      return res.status(409).send("Falha no login, usuario ja existe");
    }
    if (foundCell) {
      return res
        .status(409)
        .send("Falha no login, celular ou Email ja existentes");
    }
    if (!foundCell && !foundUser) {
      return res.status(200).send("sucesso");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/Criarconta", async (req, res) => {
  const { nome, senha, celular, nascdata, email } = req.body;

  const db = mongodb.db("Banco-X");
  const collection = db.collection("Usuarios");

  const senhahash = await bcrypt.hash(senha, 10);
  collection.insertOne({
    nome: nome,
    celular: celular,
    email: email,
    senha: senhahash,
    datanascimento: nascdata,
  });
  return res.send("Usuario salvo com sucesso");
});

app.post("/verificarlogin", async (req, res) => {
  const { input1 } = req.body;
  const db = mongodb.db("Banco-X");
  const collection = db.collection("Usuarios");

  try {
    const foundlogin = await collection.findOne({
      $or: [{ nome: input1 }, { celular: input1 }, { email: input1 }],
    });

    if (foundlogin) {
      return res.status(200).send("Usuarios encontrado");
    } else {
      return res.status(409).send("Falha em encontrar usuario");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro no servidor");
  }
});

app.post("/verificarsenha", async (req, res) => {
  const { input1, inputsenha } = req.body;
  const db = mongodb.db("Banco-X");
  const collection = db.collection("Usuarios");

  try {
    const foundsenha = await collection.findOne({
      $or: [{ nome: input1 }, { celular: input1 }, { email: input1 }],
      senha: inputsenha,
    });
    const isvalid =
      foundsenha && (await bcrypt.conpare(inputsenha, foundsenha.senha));

    if (isvalid) {
      return res.status(200).send("Login feito com sucesso");
    } else {
      return res.status(409).send("senha incorreta");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro no servidor");
  }
});

app.get("/X", (req, res) => {
  res.render(path.join(__dirname, "views", "X.ejs"));
});

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
    liveReloadServer.refresh("/Criarconta");
    liveReloadServer.refresh("/Entrar");
  });
});

app.listen(3000, () => {
  console.log("server aberto");
});
