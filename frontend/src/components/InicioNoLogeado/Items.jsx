import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Tallas from "./Tallas";

const Items = ({setCantidad, setVerDetalles, verDetalles, setProductoSeleccionado, manejarCarrito, index, producto, abrirModal}) => {

    const [verProductosTalla, setVerProductosTalla] = useState([])

    const hoy = new Date().toLocaleDateString("sv-SE");
    const abrirModalTalla = (verProductoTalla) => {
      setCantidad(1);
      setProductoSeleccionado(verProductoTalla)
      setVerDetalles(!verDetalles)
    }

    const obtenerProductoPorTalla = async () => {
        try {
            const response = await axios.post('http://localhost:8080/Filtros/', {
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
      setVerProductosTalla([]);
      obtenerProductoPorTalla();
    }, [producto])

    const milesSeleccionado = (productoSeleccionado) => {
      return Number(productoSeleccionado)?.toLocaleString('es-CO');
    }

    const totalInventario = verProductosTalla.reduce((acc, tallas) => acc + (tallas.cantidad || 0), 0);
    const estaAgotado = totalInventario === 0;

    return (
      <form>
        <article className={`text-white p-5 rounded-md ${estaAgotado ? "cursor-not-allowed" : "cursor-pointer"}`} key={index}>
          <div className="group relative">
            {estaAgotado ? (
              <img className={`z-20 w-36 md:w-48 lg:w-56 xl:w-64 h-52 md:h-64 lg:h-72 xl:h-80 ${estaAgotado ? 'opacity-50' : ''}`} src={producto.imagen} alt="ImagenProducto" />
            ) : (
              <img className={`z-20 w-36 md:w-48 lg:w-56 xl:w-64 h-52 md:h-64 lg:h-72 xl:h-80 ${estaAgotado ? 'opacity-50' : ''}`} src={producto.imagen} alt="ImagenProducto" onClick={() => abrirModal()} />
            )}
            {estaAgotado && (
              <div className="absolute z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-RosadoOcobo text-white font-bold py-2 px-4 rounded-md text-center">
                AGOTADO
              </div>
            )}
          <div className="relative bg-black z-40">
            <p className="text-sm md:text-base text-white">{producto.nombre.length > 25 ? producto.nombre?.substring(0, 25) + "..." : producto.nombre}</p>
            <p className="text-sm md:text-base">${milesSeleccionado(producto.precio)} COP</p>
          </div>
          <div className={producto.idTalla == 7 ? "hidden" : "hidden z-30 lg:flex absolute px-2 gap-2"}>
            {verProductosTalla.map((verProductoTalla, index) => (
              <Tallas producto={producto} hoy={hoy} abrirModalTalla={abrirModalTalla} verProductosTalla={verProductosTalla} verProductoTalla={verProductoTalla} key={index} />
            ))}
          </div>
          </div>
        </article>
      </form>
    )
}

export default Items;
