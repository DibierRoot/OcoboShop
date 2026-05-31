import { useState, useEffect, useMemo, useCallback } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import Items from "./Items";

const Main = () => {
  const [facturas, setFacturas] = useState([]);
  const [fechas, setFechas] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const clienteId = localStorage.getItem("idCliente");


  // Función para cargar el historial de facturas desde el backend
  const cargarFacturasDesdeBackend = async (accion, setData) => {
    try {
      const response = await axios.post("http://localhost:8080/CRUD/", {
        action: accion,
        idCliente: clienteId,
      })
      setData(response.data)
      console.log("error", response.data.message)
      if (!clienteId) {
        Swal.fire({
          title: "Usuario no encontrado",
          text: "Por favor, inicie sesión nuevamente.",
          icon: "warning",
          confirmButtonColor: "#eefb03",
        });
        return [];
      }

      setLoading(true);
      setError(null)      

      console.log(accion, response.data)
      } catch (error) {
      setError(error.message);
      Swal.fire({
        title: "Error de conexión",
        text: error.message || "Hubo un problema al conectar con el servidor.",
        icon: "error",
        confirmButtonColor: "#eefb03",
      });
      return [];
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
      cargarFacturasDesdeBackend("getFacturasPorCliente", setFacturas);
      cargarFacturasDesdeBackend("getFechaFactura", setFechas);
  },
  []); // Solo se ejecuta una vez al montar el componente

    console.log(fechas);

  return (
    <main className="pb-8">
      <div className="text-white bg-NegroSuaveSuavizado relative max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-5xl items-center rounded-lg my-10 mx-auto flex flex-col -mt-36 py-14">
        <h2 className="text-2xl font-semibold">Historial de Compras</h2>
        <div className="mt-9 flex flex-col items-center gap-10 p-7 overflow-y-auto h-[calc(100vh-64px)]">
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : !fechas.length ? (
            <p>No tiene historial de facturas.</p>
          ) : (
            facturas.map((factura, index) => (
              <Items clienteId={clienteId} fechas={fechas} setFechas={setFechas} index={index} factura={factura} key={index} />
            ))
          )}
        </div>
        <div className="mt-6">
          <p className="absolute left-10 bottom-10 cursor-pointer hover:text-RosadoOcobo hover:duration-300">
            <Link to={"/Inicio/Productos"}>
              ← Volver al Inicio
            </Link>
          </p>
        </div>

      </div>

    </main>
  );
};

export default Main;