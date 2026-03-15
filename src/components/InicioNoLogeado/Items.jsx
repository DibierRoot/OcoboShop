import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Items = ({index, producto, manejarCarrito, abrirModal, setVerDetalles, setProductoSeleccionado, setCantidad, verDetalles}) => {

  const navigate = useNavigate();
  const [verProductosTalla, setVerProductosTalla] = useState([])

  const abrirModalTalla = (verProductoTalla) => {
    setCantidad(1);
    setProductoSeleccionado(verProductoTalla)
    setVerDetalles(true)
  }

  const Redireccionar = () => {
    e.preventDefault();

    navigate("/Inicio");
  }

  const obtenerProductoPorTalla = async () => {
    try {
        const response = await axios.post('http://localhost/OcoboBack-end/Filtros/', {
            action: "obtenerProductoPorTalla",
            filtro: producto.nombre
        });

        if (response.data.length > 0) {
            setVerProductosTalla(response.data);
        }
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    obtenerProductoPorTalla();
  }, [])

    const hoy = new Date().toLocaleDateString("sv-SE");

    return (
      <div className="group">
        <form>
          <article className="text-white p-5 rounded-md" key={index}>
            <div className="cursor-pointer" onClick={() => abrirModal()}>
              <img className="w-36 md:w-48 lg:w-56 xl:w-64 h-52 md:h-64 lg:h-72 xl:h-80" src={producto.imagen} alt="ImagenProducto" />
            </div>
            <div className="relative cursor-pointer bg-black z-40">
              <p className="text-sm md:text-base text-white">{producto.nombre.length > 25 ? producto.nombre?.substring(0, 25) + "..." : producto.nombre}</p>
              <p className="text-sm md:text-base">${producto.precio} COP</p>
            </div>
            <div className={producto.idTalla == 7 ? "hidden" : "hidden lg:flex absolute px-2 gap-2 ease-in-out duration-200 -translate-y-10 group-hover:-translate-y-24"}>
              {verProductosTalla.map((verProductoTalla, index) => (
                  <div className="" key={index}>
                    {verProductoTalla.cantidad <= 0 ? (
                      <button onClick={() => abrirModalTalla(verProductoTalla)} type="button" className="text-sm xl:text-base bg-NegroSuave cursor-not-allowed w-7 xl:w-8 h-7 xl:h-8 text-center" disabled>{verProductoTalla.idTalla == 1 ? "XS" : verProductoTalla.idTalla == 2 ? "S" : verProductoTalla.idTalla == 3 ? "M" : verProductoTalla.idTalla == 4 ? "L" : verProductoTalla.idTalla == 5 ? "XL" : verProductoTalla.idTalla == 6 ? "XXL" : ""}</button>
                    ): (
                      <button onClick={() => abrirModalTalla(verProductoTalla)} type="button" className="text-sm xl:text-base bg-RosadoOcobo w-7 xl:w-8 h-7 xl:h-8 text-center">{verProductoTalla.idTalla == 1 ? "XS" : verProductoTalla.idTalla == 2 ? "S" : verProductoTalla.idTalla == 3 ? "M" : verProductoTalla.idTalla == 4 ? "L" : verProductoTalla.idTalla == 5 ? "XL" : verProductoTalla.idTalla == 6 ? "XXL" : ""}</button>
                    )}
                  </div>
              ))}
            </div>
          </article>
        </form>
      </div>
    )
}

export default Items;