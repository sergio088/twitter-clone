let dados = {};

async function Cadastro() {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  if (!step1.classList.contains("hidden")) {
    const nome = document.getElementById("Nome").value;
    const celular = document
      .getElementById("Celular")
      .classList.contains("hidden")
      ? ""
      : document.getElementById("Celular").value;
    const email = document.getElementById("Email").classList.contains("hidden")
      ? ""
      : document.getElementById("Email").value;
    const nascdata = document.getElementById("datanascimento").value;

    dados = { nome, celular, email, nascdata };

    const nomeerr = document.getElementById("nomeerro");
    const cellerr = document.getElementById("celularerro");
    const dataerr = document.getElementById("dataerro");
    const emailerr = document.getElementById("emailerro");

    if (nome == "" || celular == "" || nascdata == "") {
      if (nome == "") {
        nomeerr.classList.remove("hidden");
      }
      if (celular == "") {
        cellerr.classList.remove("hidden");
      }
      if (nascdata == "") {
        dataerr.classList.remove("hidden");
      }
    } else {
      await fetch("http://localhost:5000/api/verificarcadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      })
        .then((res) => {
          if (res.status === 409) {
            nomeerr.classList.remove("hidden");
            nomeerr.textContent = "Nome ja existe";
            cellerr.classList.remove("hidden");
            cellerr.textContent = "Celular ja exixte";
          } else if (res.status === 200) {
            step1.classList.add("hidden");
            step2.classList.remove("hidden");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } else {
    const passerr = document.getElementById("passerro");
    const senha = document.getElementById("senha").value;
    dadosfinais = { ...dados, senha };

    if (senha == "") {
      passerr.classList.remove("hidden");
    } else {
      await fetch("http://localhost:5000/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosfinais),
      });
      window.location.href = "http://localhost:5173/src/views/logar";
    }
  }
}

function trocar() {
  const email = document.getElementById("Email");
  const celular = document.getElementById("Celular");
  const botao = document.getElementById("botao");

  email.classList.toggle("hidden");
  celular.classList.toggle("hidden");

  if (celular.classList.contains("hidden")) {
    botao.textContent = "Usar o celular";
  } else {
    botao.textContent = "Usar o e-mail";
  }
}
