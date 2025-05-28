let dados = {};
async function entrar() {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  if (!step1.classList.contains("hidden")) {
    const inputuser = document.getElementById("inputuser").value;
    const inputerr = document.getElementById("inputerro");
    dados = { inputuser };

    if (inputuser == "") {
      inputerr.classList.remove("hidden");
    } else {
      await fetch("http://localhost:5000/api/verificarlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputuser }),
      }).then((res) => {
        if (res.status === 409) {
          inputerr.classList.remove("hidden");
          inputerr.textContent = "Usuario nao encontrado";
        } else if (res.status === 200) {
          const botaologin = document.getElementById("botaologin");
          const botaocriarconta = document.getElementById("botaocriarconta");

          step1.classList.add("hidden");
          step2.classList.remove("hidden");
          botaocriarconta.classList.add("hidden");
          botaologin.textContent = "Entrar";
        }
      });
    }
  } else {
    const senha = document.getElementById("inputsenha").value;
    const senhaerr = document.getElementById("senhaerro");

    if (senha == "") {
      senhaerr.classList.remove("hidden");
      senhaerr.textContent = "Campo obrigatorio";
    } else {
      await fetch("http://localhost:5000/api/verificarlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, senha }),
      }).then((res) => {
        if (res.status === 409) {
          alert("falha!!");
          senhaerr.classList.remove("hidden");
          senhaerr.textContent = "Senha incorreta";
        } else if (res.status === 200) {
          window.location.href = "http://localhost:5173/src/views/X.ejs";
        }
      });
    }
  }
}
