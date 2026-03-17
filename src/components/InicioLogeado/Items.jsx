import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Items = ({setCantidad, setVerDetalles, verDetalles, setProductoSeleccionado, manejarCarrito, index, producto, abrirModal}) => {

    const hoy = new Date().toLocaleDateString("sv-SE");
    const [verProductosTalla, setVerProductosTalla] = useState([])

    const abrirModalTalla = (verProductoTalla) => {
      setCantidad(1);
      setProductoSeleccionado(verProductoTalla) // guarda el producto que se seleccione
      setVerDetalles(!verDetalles)
    }

    /**
      * Función que se ejecuta al hacer clic en el botón de búsqueda.
      * Hace una solicitud al backend para buscar productos basados en el filtro (puede ser categoria).
      * Si se encuentran resultados, se muestran en pantalla; de lo contrario, se lanza una alerta.
    */
    const obtenerProductoPorTalla = async () => {
        try {
            const response = await axios.post('http://localhost/OcoboBack-end/Filtros/', {
                action: "obtenerProductoPorTalla", // Acción en el backend para buscar productos
                filtro: producto.nombre           // Filtro de búsqueda (nombre o correo)
            });

            if (response.data.length > 0) {
                setVerProductosTalla(response.data); // Actualizar el estado con los resultados
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Productos encontrados',
                    showConfirmButton: false,
                    timer: 1500,
                    iconColor: "#E96BA3",
                    confirmButtonColor: "#E96BA3",
                    background: "#1C1C1C"
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se encontraron productos con ese filtro',
                    iconColor: "#F28B82",
                    confirmButtonColor: "#E96BA3",
                    background: "#1C1C1C"
                });
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Error al realizar la búsqueda!'
            });
        }
    };

    useEffect(() => {
      obtenerProductoPorTalla();
    }, [])

    const milesSeleccionado = (productoSeleccionado) => {
      return Number(productoSeleccionado)?.toLocaleString('es-CO');
    }

    return (
      <form>
        <article className="text-white p-5 rounded-md" key={index}>
          <div className="group cursor-pointer" >
            <img className="z-20 w-36 md:w-48 lg:w-56 xl:w-64 h-52 md:h-64 lg:h-72 xl:h-80" src={producto.imagen} alt="ImagenProducto" onClick={() => abrirModal()} />
          <div className="relative cursor-pointer bg-black z-40">
            {/* <p className={producto.fechaPublicacion?.split('-')[1] == hoy?.split('-')[1] || producto.cantidad <= 0 ? "absolute -mt-6 bg-RosadoOcobo font-medium text-center md:w-48 w-36 lg:w-56 xl:w-64" : "hidden"}>{producto.cantidad <= 0 ? "AGOTADO" : "NUEVO"}</p> */}
            <p className="text-sm md:text-base text-white">{producto.nombre.length > 25 ? producto.nombre?.substring(0, 25) + "..." : producto.nombre}</p>
            <p className="text-sm md:text-base">${milesSeleccionado(producto.precio)} COP</p>
          </div>
          <div className={producto.idTalla == 7 ? "hidden" : "hidden z-30 lg:flex absolute px-2 gap-2 ease-in-out duration-200 -translate-y-10 group-hover:-translate-y-24"}>
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
          </div>
        </article>
      </form>
    )
}

export default Items;