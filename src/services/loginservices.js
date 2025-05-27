const { getCollection } = require("../models/mongo");
const bcrypt = require("bcrypt");

async function verificarlogin(inputuser, senha) {
  const collection = await getCollection();
  //console.log("Dados recebidos:", inputuser, senha);
  const founduser = await collection.findOne({
    $or: [{ nome: inputuser }, { celular: inputuser }, { email: inputuser }],
  });
  try {
    if (!senha) {
      if (founduser) {
        return { status: 200, msg: "Usuário encontrado" };
      } else {
        return { status: 409, msg: "Usuario nao encontrado" };
      }
    } else {
      const foundsenha = await bcrypt.compare(senha, founduser.senha);
      if (foundsenha) {
        return { status: 200, msg: "Login bem-sucedido" };
      } else {
        return { status: 409, msg: "Senha incorreta" };
      }
    }
  } catch (erro) {
    console.error("erro no findOne login", erro);
    return { status: 500, msg: "Erro interno do servidor" };
  }
}
module.exports = { verificarlogin };
