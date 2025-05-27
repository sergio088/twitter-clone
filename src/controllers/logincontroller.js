const { verificarlogin } = require("../services/loginservices");

async function verificarloginbody(req, res) {
  const { inputuser, senha } = req.body;

  try {
    const resultado = await verificarlogin(inputuser, senha);
    if (inputuser) {
      return res.status(resultado.status).send(resultado.msg);
    }
    if (senha) {
      return res.status(resultado.status).send(resultado.msg);
    }
  } catch (erro) {
    console.error("Erro no verificar login", erro);
  }
}

module.exports = { verificarloginbody };
