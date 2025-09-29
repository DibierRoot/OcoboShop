import AppInicioNo from "./components/InicioNoLogeado/AppInicioNo"
import AppRegistro from "./components/Registro/AppRegistro"
import AppInicio from "./components/InicioLogeado/AppInicio"
import AppCuenta from "./components/Cuenta/AppCuenta"
import AppCompra from "./components/Compra/AppCompra"
import AppOlvideContrasena from "./components/OlvideContrasena/AppOlvideContrasena"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppHistorial from "./components/Historial/AppHIstorial"
import AppMetodosDePago from "./components/MetodosDePago/AppMetodosDePago"

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
      <Route path="/Inicio/Productos" element={<AppInicio />} />
      <Route path="/Inicio/HistorialdeCompras" element={<AppHistorial />} />
      <Route path="/Inicio/Cuenta" element={<AppCuenta />} />
      <Route path="/Inicio/Productos/Compra" element={<AppCompra />} />
      <Route path="/Inicio/MetodosDePago" element={<AppMetodosDePago />} />
    </Routes>
  )
}

export default App