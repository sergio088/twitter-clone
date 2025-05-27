const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/");
let collection;

async function conectar() {
  try {
    await client.connect();
    const db = client.db("Banco-X");
    collection = db.collection("Usuarios");
    await db.createCollection("Usuarios");
    // Agora Banco-X.Usuarios existe (mesmo que vazio) no servidor.

    console.log("Conectado ao MongoDB!");
  } catch (erro) {
    console.error("Erro ao conectar ao MongoDB", erro.message);
  }
}

function getCollection() {
  if (!collection) {
    throw new Error("Coleção não inicializada. Você chamou conectar()?");
  }
  return collection;
}

module.exports = {
  conectar,
  getCollection,
};
