const { getCollection } = require("../models/mongo.js");
const bcrypt = require("bcrypt");

async function verificarcadastro(nome, celular, email) {
  const collection = getCollection();
  console.log(nome, celular, email);
  try {
    const foundUser = await collection.findOne({ nome });
    const foundCell = await collection.findOne({ celular });
    if (foundUser) {
      return { status: 409, msg: "Usuario ja existe" };
    }
    if (foundCell) {
      return { status: 409, msg: "Celular ou Email ja existem" };
    }
    return { status: 200, msg: "Sucesso" };
  } catch (erro) {
    console.error("Erro no servidor");
  }
}

async function enviarcadastro(nome, celular, email, nascdata, senha) {
  try {
    console.log(nome, celular, email, nascdata, senha);
    const collection = getCollection();
    const senhahash = await bcrypt.hash(senha, 10);
    collection.insertOne({
      nome: nome,
      celular: celular,
      email: email,
      senha: senhahash,
      data_de_nascimento: nascdata,
    });
  } catch (erro) {
    console.error("Erro no insertOne", erro);
  }
}

module.exports = { verificarcadastro, enviarcadastro };
