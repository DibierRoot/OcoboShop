import AppInicioNo from "./components/InicioNoLogeado/AppInicioNo"
import AppRegistro from "./components/Registro/AppRegistro"
import AppInicio from "./components/InicioLogeado/AppInicio"
import AppCuenta from "./components/Cuenta/AppCuenta"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppInicioNo />} />
      <Route path="/Inicio" element={<AppInicio />} />
      <Route path="/Inicio/Cuenta" element={<AppCuenta />} />
      <Route path="/Registro" element={<AppRegistro />} />
    </Routes>
  )
}

export default App