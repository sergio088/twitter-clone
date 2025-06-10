import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";

export default function Cadastro() {
  const navigate = useNavigate();
  const [nome, setnome] = useState<string>("");
  const [celular, setcelular] = useState<string>("");
  const [senha, setsenha] = useState<string>("");
  const nomeref = useRef<HTMLInputElement>(null);
  const refcelular = useRef<HTMLInputElement>(null);
  const senharef = useRef<HTMLInputElement>(null);
  const refh2 = useRef<HTMLHeadingElement>(null);
  const div1ref = useRef<HTMLDivElement>(null);
  const div2ref = useRef<HTMLDivElement>(null);
  const openeyeref = useRef<SVGSVGElement>(null);
  const closeeyeref = useRef<SVGSVGElement>(null);

  async function Avançar() {
    if (div2ref.current?.classList.contains("hidden")) {
      if (nome.trim() === "" || celular.trim() === "") {
        if (nome.trim() === "") {
          nomeref.current?.classList.remove(
            "border-gray-500",
            "focus:border-blue-500"
          );
          nomeref.current?.classList.add(
            "border-red-500",

            "placeholder:text-red-500"
          );
          setTimeout(() => {
            nomeref.current?.classList.remove(
              "border-red-500",
              "focus:border-red-500",
              "placeholder:text-red-500"
            );
            nomeref.current?.classList.add(
              "border-gray-500",
              "focus:border-blue-500"
            );
          }, 3000);
        }
        if (celular.trim() === "") {
          refcelular.current?.classList.remove(
            "border-gray-500",
            "focus:border-blue-500"
          );
          refcelular.current?.classList.add(
            "border-red-500",

            "placeholder:text-red-500"
          );
          setTimeout(() => {
            refcelular.current?.classList.remove(
              "border-red-500",
              "focus:border-red-500",
              "placeholder:text-red-500"
            );
            refcelular.current?.classList.add(
              "border-gray-500",
              "focus:border-blue-500"
            );
          }, 3000);
        }
      } else {
        const result = await fetch(
          "http://localhost:5000/api/verificarcadastro",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, celular }),
          }
        );
        if (result.status === 200) {
          div1ref.current?.classList.add("hidden");
          div2ref.current?.classList.remove("hidden");
          refh2.current!.textContent = "Criar senha";
        } else {
          alert("usuario ou celular ja existe");
          setnome("");
          setcelular("");
        }
      }
    } else {
      if (senha.trim() === "") {
        senharef.current?.classList.remove(
          "border-gray-500",
          "focus:border-blue-500"
        );
        senharef.current?.classList.add(
          "border-red-500",

          "placeholder:text-red-500"
        );

        setTimeout(() => {
          senharef.current?.classList.remove(
            "border-red-500",
            "placeholder:text-red-500"
          );
          senharef.current?.classList.add(
            "border-gray-500",

            "focus:border-blue-500"
          );
        }, 3000);
      } else {
        const res = await fetch("http://localhost:5000/api/cadastro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, celular, senha }),
        });
        if (res.status === 200) {
          alert("Bem-vindo ao X");
          navigate("/X-clone");
        }
      }
    }
  }
  function ocultarsenha() {
    if (!closeeyeref.current?.classList.contains("hidden")) {
      senharef.current!.type = "text";
      closeeyeref.current?.classList.add("hidden");
      openeyeref.current?.classList.remove("hidden");
    } else {
      senharef.current!.type = "password";
      closeeyeref.current?.classList.remove("hidden");
      openeyeref.current?.classList.add("hidden");
    }
  }
  return (
    <div className="fixed inset-0  bg-white/10 flex items-center justify-center z-50">
      <div className="bg-black text-white p-6 rounded-md w-[500px] h-[500px] flex justify-center items-center">
        <div className="w-[300px] space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 ref={refh2} className="text-3xl font-bold">
              Criar sua conta
            </h2>
            <button className="cursor-pointer" onClick={() => navigate(-1)}>
              ✕
            </button>
          </div>
          <div ref={div1ref}>
            <div>
              <input
                placeholder="Nome"
                ref={nomeref}
                value={nome}
                onChange={(e) => setnome(e.target.value)}
                className="w-full mb-2 p-2 bg-black text-white border border-gray-500 focus:border-blue-500 outline-none "
              />
              <input
                placeholder="Celular"
                ref={refcelular}
                value={celular}
                onChange={(e) => setcelular(e.target.value)}
                className="w-full mb-2 p-2 bg-black text-white  border border-gray-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div ref={div2ref} className="hidden ">
            <div className="relative">
              <input
                type="password"
                ref={senharef}
                onChange={(e) => setsenha(e.target.value)}
                placeholder="Senha"
                className="w-full mb-2 p-2 bg-black text-white  border border-gray-500 focus:border-blue-500 outline-none"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                ref={openeyeref}
                onClick={ocultarsenha}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="hidden size-6 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={ocultarsenha}
                ref={closeeyeref}
                className="size-6 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </div>
          </div>
          <button
            className="w-full bg-blue-600 p-2 rounded-3xl"
            onClick={Avançar}
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}
