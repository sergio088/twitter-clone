const {
  verificarcadastro,
  enviarcadastro,
} = require("../services/usuarioservice");

async function verificarcadastrobody(req, res) {
  const { nome, celular, email } = req.body;
  try {
    const result = await verificarcadastro(nome, celular, email);
    return res.status(result.status).send(result.msg);
  } catch (erro) {
    console.error("Erro no verificarcadastro");
    return res.status(500).send("Erro no servidor");
  }
}

async function enviarcadastromongo(req, res) {
  const { nome, celular, email, senha, nascdata } = req.body;
  console.log(nome, celular, email, senha, nascdata);

  try {
    const enviar = await enviarcadastro(nome, celular, email, nascdata, senha);

    return res.send("enviado pro mongo");
  } catch (erro) {
    console.error("Erro no enviarcadastro", erro);
  }
}
module.exports = { verificarcadastrobody, enviarcadastromongo };
