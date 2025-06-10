import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Xclone from "./pages/X-clone";

function Approutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      {/* Sempre renderiza a Home, com location original OU do background */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
      </Routes>

      {/* Só renderiza o modal por cima se houver um backgroundLocation */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      )}

      <Routes>
        <Route path="/X-clone" element={<Xclone />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Approutes />
    </Router>
  );
}

export default App;
