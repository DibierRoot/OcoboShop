import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
    }, [producto.nombre])

    const milesSeleccionado = (productoSeleccionado) => {
      return Number(productoSeleccionado)?.toLocaleString('es-CO');
    }

    return (
      <form>
        <article className="text-white p-5 rounded-md" key={index}>
          <div className="group cursor-pointer" >
            <img className="z-20 w-36 md:w-48 lg:w-56 xl:w-64 h-52 md:h-64 lg:h-72 xl:h-80" src={producto.imagen} alt="ImagenProducto" onClick={() => abrirModal()} />
          <div className="relative cursor-pointer bg-black z-40">
            <p className="text-sm md:text-base text-white">{producto.nombre.length > 25 ? producto.nombre?.substring(0, 25) + "..." : producto.nombre}</p>
            <p className="text-sm md:text-base">${milesSeleccionado(producto.precio)} COP</p>
          </div>
          <div className="">
            {verProductosTalla.map((verProductoTalla, index) => (
              <div key={index}>
                  <p className={producto.fechaPublicacion?.split('-')[1] == hoy?.split('-')[1] || producto.cantidad <= 0 && verProductoTalla.cantidad <= 0 ? "absolute z-50 -mt-[4.5rem] bg-RosadoOcobo font-medium text-center md:w-48 w-36 lg:w-56 xl:w-64" : "hidden"}>{producto.cantidad <= 0 ? "AGOTADO" : "NUEVO"}</p>
                  <div className={producto.idTalla == 7 || producto.cantidad <= 0 && verProductoTalla.cantidad <= 0 ? "hidden" : "hidden z-30 lg:flex absolute px-2 gap-2 ease-in-out duration-200 -translate-y-10 group-hover:-translate-y-24"}>
                    {verProductoTalla.cantidad <= 0 ? (
                      <button onClick={() => abrirModalTalla(verProductoTalla)} type="button" className="text-sm xl:text-base bg-NegroSuave cursor-not-allowed w-7 xl:w-8 h-7 xl:h-8 text-center" disabled>{verProductoTalla.idTalla == 1 ? "XS" : verProductoTalla.idTalla == 2 ? "S" : verProductoTalla.idTalla == 3 ? "M" : verProductoTalla.idTalla == 4 ? "L" : verProductoTalla.idTalla == 5 ? "XL" : verProductoTalla.idTalla == 6 ? "XXL" : ""}</button>
                    ): (
                      <button onClick={() => abrirModalTalla(verProductoTalla)} type="button" className="text-sm xl:text-base bg-RosadoOcobo w-7 xl:w-8 h-7 xl:h-8 text-center">{verProductoTalla.idTalla == 1 ? "XS" : verProductoTalla.idTalla == 2 ? "S" : verProductoTalla.idTalla == 3 ? "M" : verProductoTalla.idTalla == 4 ? "L" : verProductoTalla.idTalla == 5 ? "XL" : verProductoTalla.idTalla == 6 ? "XXL" : ""}</button>
                    )}
                  </div>
              </div>
            ))}
          </div>
          </div>
        </article>
      </form>
    )
}

export default Items;