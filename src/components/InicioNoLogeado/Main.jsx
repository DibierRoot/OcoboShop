import { useState, useEffect } from "react";
import Items from "./Items"
import Footer from "./Footer.jsx"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Swal from "sweetalert2";
import CamisetaIcon from "/src/assets/icons/CamisetaIcon.png"
import CamisetaIconHover from "/src/assets/icons/CamisetaIconHover.png"
import EsqueletoIcon from "/src/assets/icons/EsqueletoIcon.png"
import EsqueletoIconHover from "/src/assets/icons/EsqueletoIconHover.png"
import ChaquetaIcon from "/src/assets/icons/ChaquetaIcon.png"
import ChaquetaIconHover from "/src/assets/icons/ChaquetaIconHover.png"
import PlumillaIcon from "/src/assets/icons/PlumillaIcon.png"
import PlumillaIconHover from "/src/assets/icons/PlumillaIconHover.png"
import CapuchaIcon from "/src/assets/icons/CapuchaIcon.png"
import CapuchaIconHover from "/src/assets/icons/CapuchaIconHover.png"

const Main = () => {

  const [productos, setVerProductos] = useState([])

  const [verDetalles, setVerDetalles] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [filtro, setFiltro] = useState("")

  const [cantidad, setCantidad] = useState(1);

  const abrirModal = (producto) => {
      setCantidad(1);
      setProductoSeleccionado(producto) // guarda el producto que se seleccione
      setVerDetalles(!verDetalles)
  }

  const aumentarCantidad = () => {
      if (cantidad < productoSeleccionado?.cantidad) {
          setCantidad(cantidad + 1);
      }
  }

  const disminuirCantidad = () => {
      if (cantidad > 1) {
          setCantidad(cantidad - 1);
      }
  }

  /**
  * Función que se ejecuta al hacer clic en el botón de búsqueda.
  * Hace una solicitud al backend para buscar productos basados en el filtro (puede ser categoria).
  * Si se encuentran resultados, se muestran en pantalla; de lo contrario, se lanza una alerta.
  */
  const obtenerProducto = async (filtro) => {
      try {
          const response = await axios.post('http://localhost/OcoboBack-end/Filtros/', {
              action: "obtenerProducto", // Acción en el backend para buscar productos
              filtro: filtro             // Filtro de búsqueda (nombre o correo)
          });

          console.log(filtro); // Imprimir el filtro en la consola para depuración

          if (response.data.length > 0) {
              setVerProductos(response.data); // Actualizar el estado con los resultados
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


  // Función para agregar el producto al carrito
  const manejarCarrito = () => {
      const carritoExistente = JSON.parse(localStorage.getItem('carrito')) || [];
      const productoConId = {
          ...productoSeleccionado,
          id: productoSeleccionado.id || uuidv4(),
          cantidad
      };

      // Verificamos si el producto ya está en el carrito usando el idProducto
      const productoExistente = carritoExistente.find(item => item.idProducto === productoConId.idProducto);
    
      if (productoExistente) {
          productoExistente.cantidad = cantidad;
    
          const carritoActualizado = carritoExistente.map(item =>
              item.idProducto === productoExistente.idProducto ? productoExistente : item
          );
    
          localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    
          Swal.fire({
              position: "center",
              icon: "success",
              title: 'Cantidad del producto actualizada',
              showConfirmButton: false,
              timer: 1500,
              iconColor: "#E96BA3",
              confirmButtonColor: "#E96BA3",
              background: "#1C1C1C"
          });
      } else {
          const carritoActualizado = [
              ...carritoExistente,
              productoConId
          ];
    
          localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    
          Swal.fire({
              position: "center",
              icon: "success",
              title: 'Producto agregado exitosamente al carrito',
              showConfirmButton: false,
              timer: 1500,
              iconColor: "#E96BA3",
              confirmButtonColor: "#E96BA3",
              background: "#1C1C1C"
          });
      }
  };
    
  // Función para editar la cantidad en el carrito
  const editarCantidadCarrito = (idProducto, nuevaCantidad) => {
      const carritoExistente = JSON.parse(localStorage.getItem('carrito')) || [];
      const productoExistente = carritoExistente.find(item => item.idProducto === idProducto);
    
      if (productoExistente) {
          productoExistente.cantidad = nuevaCantidad;
    
        const carritoActualizado = carritoExistente.map(item =>
            item.idProducto === idProducto ? productoExistente : item
        );
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    
        Swal.fire({
            position: "center",
            icon: "success",
            title: 'Cantidad actualizada correctamente',
            showConfirmButton: false,
            timer: 1500,
            iconColor: "#E96BA3",
            confirmButtonColor: "#E96BA3",
            background: "#1C1C1C"
        });
      }
  };

  // Obtener los productos desde el backend
  const obtenerDatos = async () => {
      axios.get('http://localhost/OcoboBack-end/VerProductos/')  // Ruta del archivo PHP
        .then(response => {
          setVerProductos(response.data);  // Guardamos los datos de los productos en el estado
        })
        .catch(error => {
          console.error("Hubo un error al obtener las imágenes: ", error);
        });
  }

  useEffect(() => {
      obtenerDatos();
  }, [])

  const milesSeleccionado = (productoSeleccionado) => {
      return productoSeleccionado?.toLocaleString('es-CO');
  }

  const [hoverCategoria1, setHoverCategoria1] = useState(false)

  const [hoverCategoria2, setHoverCategoria2] = useState(false)

  const [hoverCategoria3, setHoverCategoria3] = useState(false)

  const [hoverCategoria4, setHoverCategoria4] = useState(false)

  const [hoverCategoria5, setHoverCategoria5] = useState(false)


    return (

        <div>
            <main>

                <nav>
                    <div className="mt-5">
                        <p className="cursor-pointer hover:text-RosadoOcobo hover:underline duration-300 text-center" onClick={() => obtenerDatos()}>Mostrar Todo</p>
                    </div>

                    <div className="justify-center items-center gap-7 sm:gap-12 md:gap-16 xl:gap-28 2xl:gap-28 flex flex-col md:flex-row">

                        <div className="relative mt-4 flex gap-7 sm:gap-12 md:gap-24 xl:gap-28 2xl:gap-28">
                            {/* <input className="text-white border-b-2 border-white h-10 p-2 outline-none bg-black" placeholder="Buscar..." type="text" name="" id="" /> */}
                            <div className="flex flex-col hover:text-RosadoOcobo hover:underline duration-300 cursor-pointer items-center" onClick={() => obtenerProducto("1")} onMouseEnter={() => setHoverCategoria1(true)} onMouseLeave={() => setHoverCategoria1(false)}>
                                <span><img className="relative h-10 w-10 transition-opacity" src={hoverCategoria1 ? CamisetaIconHover : CamisetaIcon} alt="Carrito" /></span>
                                <p>Camisetas</p>
                            </div>
                            
                            <div className="flex flex-col hover:text-RosadoOcobo hover:underline duration-300 cursor-pointer items-center" onClick={() => obtenerProducto("5")} onMouseEnter={() => setHoverCategoria2(true)} onMouseLeave={() => setHoverCategoria2(false)}>
                                <span><img className="h-10 w-10 transition-opacity" src={hoverCategoria2 ? EsqueletoIconHover : EsqueletoIcon} alt="Carrito" /></span>
                                <p>Esqueletos</p>
                            </div>

                            <div className="flex flex-col hover:text-RosadoOcobo hover:underline duration-300 cursor-pointer items-center" onClick={() => obtenerProducto("6")} onMouseEnter={() => setHoverCategoria3(true)} onMouseLeave={() => setHoverCategoria3(false)}>
                                <span><img className="h-10 w-10 transition-opacity" src={hoverCategoria3 ? ChaquetaIconHover : ChaquetaIcon} alt="Carrito" /></span>
                                <p>Chaquetas</p>
                            </div>
                        </div>

                        <div className="relative mt-4 flex gap-7 sm:gap-12 md:gap-24 xl:gap-28 2xl:gap-28">
                            <div className="flex flex-col hover:text-RosadoOcobo hover:underline duration-300 cursor-pointer items-center" onClick={() => obtenerProducto("3")} onMouseEnter={() => setHoverCategoria4(true)} onMouseLeave={() => setHoverCategoria4(false)}>
                                <span><img className="h-10 w-10 transition-opacity" src={hoverCategoria4 ? PlumillaIconHover : PlumillaIcon} alt="Carrito" /></span>
                                <p>Picks</p>
                            </div>

                            <div className="flex flex-col hover:text-RosadoOcobo hover:underline duration-300 cursor-pointer items-center" onClick={() => obtenerProducto("4")} onMouseEnter={() => setHoverCategoria5(true)} onMouseLeave={() => setHoverCategoria5(false)}>
                                <span><img className="h-10 w-10 transition-opacity" src={hoverCategoria5 ? CapuchaIconHover : CapuchaIcon} alt="Carrito" /></span>
                                <p>Accesorios</p>
                            </div>
                        </div>

                    </div>
                </nav>

            <hr className="mx-14 sm:mx-16 md xl:mx-56 2xl:mx-56 mt-10 mb-5" />

            

            <Modal className="outline-none fixed inset-0 z-50 flex items-center justify-center bg-Suavizado bg-opacity-50" isOpen={verDetalles}>
                <ModalBody className="bg-NegroSuave md:max-w-3xl xl:max-w-4xl 2xl:max-w-4xl text-white p-6 rounded-lg">
                    <form>
                    <div className="relative flex flex-col md:flex-row sm:gap-3 md:gap-5 lg:gap-9 xl:gap-9 2xl:gap-9">
                        <div className="flex flex-col justify-center items-center md:justify-normal md:items-start gap-7">
                            <img className="relative w-40 md:w-48 lg:w-56 xl:w-64 h-56 md:h-64 lg:h-72 xl:h-80" src={productoSeleccionado?.imagen} alt="imagen"/>
                            <div className="mb-5">
                                <h1 className="font-bold text-xl">{productoSeleccionado?.nombre}</h1>
                                <p>{productoSeleccionado?.descripcion}</p>
                            </div>
                        </div>
                                    
                        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-6">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Color:</h2>
                                <input disabled readOnly className={`w-9 sm:w-10 md:w-12 lg:w-14 h-9 sm:h-10 md:h-12 lg:h-14 ${productoSeleccionado?.idColor == 1 ? "rounded-full bg-black border-2": productoSeleccionado?.idColor == 2 ? "rounded-full bg-RosadoOcobo border-2" : "error"}`} />
                            </div>

                            <div>
                                <h2 className={productoSeleccionado?.idTalla == 7 ? "hidden" : "text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium"}>Talla:</h2>
                                <input className={productoSeleccionado?.idTalla == 7 ? "hidden" : "bg-RosadoOcobo md:p-1 lg:p-2 xl:p-3 2xl:p-3 w-9 sm:w-10 md:w-12 lg:w-14 h-9 sm:h-10 md:h-12 lg:h-14 text-center"} readOnly disabled value={productoSeleccionado?.idTalla == 1 ? "XS" : productoSeleccionado?.idTalla == 2 ? "S" : productoSeleccionado?.idTalla == 3 ? "M" : productoSeleccionado?.idTalla == 4 ? "L" : productoSeleccionado?.idTalla == 5 ? "XL" : productoSeleccionado?.idTalla == 6 ? "XXL" : "error"} />
                            </div>

                            <div>
                                <div className="font-bold flex text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                                    <p>$</p>
                                    <p className="bg-NegroSuave pr-1 outline-none" disabled readOnly value={milesSeleccionado(productoSeleccionado?.precio)} type="text" >{milesSeleccionado(productoSeleccionado?.precio)} </p>
                                    <p>COP</p>
                                </div>
                            </div>     

                            <div className="">
                                <h2 className="font-medium">Cantidad disponible: </h2>
                                <p className="mt-2 font-semibold text-lg">{productoSeleccionado?.cantidad}</p>
                            </div>

                            <div className="">
                                <h2 className="font-medium">Ingrese la cantidad que desea comprar:</h2>
                                <button className="bg-RosadoOcobo p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 rounded-full" type="button" onClick={disminuirCantidad}>-</button>
                                <input className="bg-NegroSuave w-10 text-center outline-none" value={cantidad} readOnly disabled type="text" max={productoSeleccionado?.cantidad} />
                                <button className="bg-RosadoOcobo p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 rounded-full" type="button" onClick={aumentarCantidad}>+</button>
                            </div>
                        </div>

                        <p className="absolute right-3 cursor-pointer" onClick={() => abrirModal()}>x</p>
                            
                        <div className="mt-5 md:mt-12 flex flex-row md:flex-col gap-8">
                            <button className="bg-RosadoOcobo rounded-md p-3" type="submit">Comprar</button>
                            <button className="border-2 bg-black rounded-md p-3" type="button" onClick={manejarCarrito}>Agregar al carrito</button>
                        </div>
                    </div>
                </form>
                </ModalBody>
            </Modal>

            <div className="flex justify-center items-center">
                <section className="bg-black rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 2xl:grid-cols-4">
                    {productos.map((producto, index) => (
                    <Items manejarCarrito={manejarCarrito} key={index} producto={producto} abrirModal={() => abrirModal(producto)} />
                    ))}       
                </section>
            </div>


        </main>

        <Footer obtenerProducto={obtenerProducto} />

      </div>


    )
}

export default Main;