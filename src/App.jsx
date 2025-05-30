import AppInicioNo from "./components/InicioNoLogeado/AppInicioNo"
import AppRegistro from "./components/Registro/AppRegistro"
import AppInicio from "./components/InicioLogeado/AppInicio"
import AppCuenta from "./components/Cuenta/AppCuenta"
import AppOlvideContrasena from "./components/OlvideContrasena/AppOlvideContrasena"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

const App = () => {

  const [clientes, setClientes] = useState('');

  const addCliente = (cliente) => {
    setClientes ([...clientes, cliente]);
  }

    const [clientesLogin, setClientesLogin] = useState ('');

  const login = (clienteLogin) => {
    setClientesLogin([...clientesLogin, clienteLogin])
  }

  return (
    <Routes>
      <Route path="/" element={<AppInicioNo login={login} />} />
      <Route path="/olvidemicontrasena" element={<AppOlvideContrasena />} />
      <Route path="/Registro" element={<AppRegistro addCliente={addCliente} />} />
      <Route path="/Inicio" element={<AppInicio />} />
      <Route path="/Inicio/Cuenta" element={<AppCuenta />} />
    </Routes>
  )
}

export default App