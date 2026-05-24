import AppInicioNo from "./components/InicioNoLogeado/AppInicioNo"
import AppRegistro from "./components/Registro/AppRegistro"
import AppInicio from "./components/InicioLogeado/AppInicio"
import AppCuenta from "./components/Cuenta/AppCuenta"
import AppCompra from "./components/Compra/AppCompra"
import AppOlvideContrasena from "./components/OlvideContrasena/AppOlvideContrasena"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppHistorial from "./components/Historial/AppHistorial"
import AppMetodosDePagoNoLogeado from "./components/MetodosDePagoNoLogeado/AppMetodosDePagoNoLogeado"
import AppMetodosDePagoLogeado from "./components/MetodosDePagoLogeado/AppMetodosDePagoLogeado"
import AppContactoLogeado from "./components/ContactoLogeado/AppContactoLogeado"
import AppContactoNoLogeado from "./components/ContactoNoLogeado/AppContactoNoLogeado"

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
      <Route path="/MetodosDePago" element={<AppMetodosDePagoNoLogeado login={login} />} />
      <Route path="/Inicio/MetodosDePago" element={<AppMetodosDePagoLogeado />} />
      <Route path="/Contacto" element={<AppContactoNoLogeado login={login} />} />
      <Route path="/Inicio/Contacto" element={<AppContactoLogeado />} />
    </Routes>
  )
}

export default App