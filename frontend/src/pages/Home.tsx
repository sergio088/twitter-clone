import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  return (
    <div className="flex bg-black">
      <div className="flex items-center justify-center h-screen">
        <img
          src="https://play-lh.googleusercontent.com/XyI6Hyz9AFg7E_joVzX2zh6CpWm9B2DG2JuEz5meCFVm4-wTKTnHgqbmg62iFKe4Gzca=w240-h480-rw"
          alt="X"
          className="w-120"
        />
      </div>
      <div className="flex flex-col justify-center h-screen px-6 py-4 text-center space-y-4">
        <h1 className="text-gray-100 text-6xl font-bold py-2 leading-tight text-left">
          Acontecendo agora
        </h1>
        <div className="flex flex-col max-w-60 w-full">
          <p className="text-gray-100 font-bold py-4 text-3xl text-center">
            Inscreva-se hoje
          </p>

          <Link
            to="/Cadastro"
            state={{ backgroundLocation: location }}
            className="bg-blue-500 text-white rounded-2xl py-1 hover:bg-blue-600 transition"
          >
            Criar conta
          </Link>

          <div className="flex items-center m-2 justify-center gap-2 text-gray-400">
            <span className="flex-1 h-px bg-gray-700"></span>
            <span>ou</span>
            <span className="flex-1 h-px bg-gray-700"></span>
          </div>

          <Link
            to="/login"
            state={{ backgroundLocation: location }}
            className="border border-gray-500 text-blue-500 rounded-2xl py-1 hover:bg-gray-700 transition"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
