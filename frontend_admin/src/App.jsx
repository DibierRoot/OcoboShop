import AppInicioSesion from "./components/InicioSesion/AppInicioSesion";
import AppInicio from "./components/Productos/AppProductos";
import AppCuenta from "./components/Cuenta/AppCuenta";
import AppAgregar from "./components/Agregar/AppAgregar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppHistorial from "./components/Historial/AppHistorial";
import AppPQRs from "./components/PQRs/AppPQRs";

const App = () => {

  const [clientes, setClientes] = useState('');

  const addCliente = (cliente) => {
    setClientes ([...clientes, cliente]);
  }

  const [productos, setProductos] = useState('')

  const addProducto = (producto) => {
    setProductos([...productos, producto])
  }



  return (
    <Routes>
      <Route path="/" element={<AppInicioSesion addCliente={addCliente} />} />
      <Route path="/Colaboradores/Inicio" element={<AppInicio />} />
      <Route path="/Colaboradores/Inicio/Cuenta" element={<AppCuenta />} />
      <Route path="/Colaboradores/Inicio/Agregar" element={<AppAgregar addProducto={addProducto} />}/>
      <Route path="/Colaboradores/Inicio/Historial" element={<AppHistorial />} />
      <Route path="/Colaboradores/Inicio/PQRs" element={<AppPQRs />} />
    </Routes>
  )
}

export default App