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
  const [contador, setContador] = useState(0);

    useEffect(() => {
      if (verDetalles) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = '';
      }

      return () => {
          document.body.style.overflow = '';
      }
    }, [verDetalles])

  const [categoriaActiva, setCategoriaActiva] = useState("todo");
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

//   <div style="display:flex; justify-content:center;">
//      <video width="400" height="200" autoplay playsinline muted>
//          <source src="/src/assets/video/fondo.mp4" type="video/mp4">
//      </video>
//   </div>

if (contador === 0) {
  Swal.fire({
    title: "¡Pilas!",
    text: "Este sitio web todavia no esta funcionando y esta en periodo de prueba por lo tanto no tendra ninguna funcionalidad, es totalmente ilustrativo y estatico. Agradecemos su visita y esperamos que muy pronto sea el lanzamiento de OCOBOSHOP.",
    imageUrl: "/src/assets/image/Lettering.jpeg",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
    iconColor: "#E96BA3",
    confirmButtonColor: "#E96BA3",
    background: "#1C1C1C"
  });
  setContador(contador + 1);
}

  /**
  * Función que se ejecuta al hacer clic en el botón de búsqueda.
  * Hace una solicitud al backend para buscar productos basados en el filtro (puede ser categoria).
  * Si se encuentran resultados, se muestran en pantalla; de lo contrario, se lanza una alerta.
  */
  const obtenerProducto = async (filtro) => {
      try {
          const response = await axios.post('http://localhost:8080/Filtros/', {
              action: "obtenerProducto", // Acción en el backend para buscar productos
              filtro: filtro             // Filtro de búsqueda (nombre o correo)
          });

          console.log(filtro); // Imprimir el filtro en la consola para depuración

          if (Array.isArray(response.data) && response.data.length > 0) {
              setVerProductos(response.data); // Actualizar el estado con los resultados
              setCategoriaActiva(filtro);
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
    
      if (productoSeleccionado.cantidad <= 0) {
            Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: '¡El producto esta agotado!',
                  iconColor: "#F28B82",
                  confirmButtonColor: "#E96BA3",
                  background: "#1C1C1C"
            });
      } else if (productoExistente) {
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

  const obtenerDatos = async () => {
      setCategoriaActiva("todo");
      axios.get('http://localhost:8080/VerProductos/')
        .then(response => {
          if (Array.isArray(response.data)) {
            setVerProductos(response.data);
          } else {
            setVerProductos([]);
          }
        })
        .catch(error => {
          console.error("Hubo un error al obtener las imágenes: ", error);
          setVerProductos([]);
        });
  }

  useEffect(() => {
      obtenerDatos();
  }, [])

  const milesSeleccionado = (productoSeleccionado) => {
      return productoSeleccionado?.toLocaleString('es-CO');
  }

    return (

        <div>
            <main>

                <nav>
                    <div className="cursor-default justify-center items-center gap-7 text-sm md:text-base sm:gap-12 md:gap-14 lg:gap-24 xl:gap-28 2xl:gap-28 flex flex-col sm:flex-row">

                        <div className="relative mt-4 flex gap-7 sm:gap-12 md:gap-14 lg:gap-24 xl:gap-28 2xl:gap-28">
                            <div className={`group duration-300 flex flex-col items-center cursor-pointer ${categoriaActiva === "todo" ? "text-RosadoOcobo" : "hover:text-RosadoOcobo"}`} onClick={() => obtenerDatos()}>
                                <span className={`relative h-9 w-9 md:h-10 md:w-10 transition-colors duration-500 ${categoriaActiva === "todo" ? "text-RosadoOcobo" : "text-white group-hover:text-RosadoOcobo"}`}>
                                    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="8" height="8" rx="1.5"/>
                                        <rect x="13" y="3" width="8" height="8" rx="1.5"/>
                                        <rect x="3" y="13" width="8" height="8" rx="1.5"/>
                                        <rect x="13" y="13" width="8" height="8" rx="1.5"/>
                                    </svg>
                                </span>
                                <p>Todo</p>
                            </div>
                            <div className={`group duration-300 flex flex-col items-center ${categoriaActiva === "1" ? "text-RosadoOcobo" : "hover:text-RosadoOcobo"}`} onClick={() => obtenerProducto("1")}>
                                <span className="relative h-9 w-9 md:h-10 md:w-10">
                                    <img className={`absolute transition-opacity duration-500 ease-in-out ${categoriaActiva === "1" ? "opacity-0" : "opacity-100"} group-hover:opacity-0`} src={CamisetaIcon} alt="Carrito" />
                                    <img className={`absolute transition-opacity duration-500 ease-in-out ${categoriaActiva === "1" ? "opacity-100" : "opacity-0"} group-hover:opacity-100`} src={CamisetaIconHover} alt="Carrito" />
                                </span>
                                <p>
                                  Camisetas
                                  {categoriaActiva === "1" && (
                                    <span className="ml-1 bg-NegroSuave text-RosadoOcobo text-[10px] rounded-full px-1.5 py-0.5 align-middle">{productos.length}</span>
                                  )}
                                </p>
                            </div>
                            
                            <div className={`group duration-300 flex flex-col items-center ${categoriaActiva === "4" ? "text-RosadoOcobo" : "hover:text-RosadoOcobo"}`} onClick={() => obtenerProducto("4")}>
                                <span className="relative h-9 w-9 md:h-10 md:w-10">
                                    <img className={`absolute transition-opacity duration-500 ease-in-out ${categoriaActiva === "4" ? "opacity-0" : "opacity-100"} group-hover:opacity-0`} src={EsqueletoIcon} alt="Carrito" />
                                    <img className={`absolute transition-opacity duration-500 ease-in-out ${categoriaActiva === "4" ? "opacity-100" : "opacity-0"} group-hover:opacity-100`} src={EsqueletoIconHover} alt="Carrito" />
                                </span>
                                <p>
                                  Esqueletos
                                  {categoriaActiva === "4" && (
                                    <span className="ml-1 bg-NegroSuave text-RosadoOcobo text-[10px] rounded-full px-1.5 py-0.5 align-middle">{productos.length}</span>
                                  )}
                                </p>
                            </div>

                            <div className={`group duration-300 flex flex-col items-center ${categoriaActiva === "5" ? "text-RosadoOcobo" : "hover:text-RosadoOcobo"}`} onClick={() => obtenerProducto("5")}>
                                <span className="relative h-9 w-9 md:h-10 md:w-10">
                                    <img className={`absolute transition-opacity duration-500 ease-in-out ${categoriaActiva === "5" ? "opacity-0" : "opacity-100"} group-hover:opacity-0`} src={ChaquetaIcon} alt="Carrito" />
                                    <img className={`absolute transition-opacity duration-500 ease-in-out ${categoriaActiva === "5" ? "opacity-100" : "opacity-0"} group-hover:opacity-100`} src={ChaquetaIconHover} alt="Carrito" />
                                </span>
                                <p>
                                  Chaquetas
                                  {categoriaActiva === "5" && (
                                    <span className="ml-1 bg-NegroSuave text-RosadoOcobo text-[10px] rounded-full px-1.5 py-0.5 align-middle">{productos.length}</span>
                                  )}
                                </p>
                            </div>
                        </div>

                        <div className="relative mt-4 flex gap-7 sm:gap-12 md:gap-14 lg:gap-24 xl:gap-28 2xl:gap-28">
                            <div className={`group duration-300 flex flex-col items-center ${categoriaActiva === "2" ? "text-RosadoOcobo" : "hover:text-RosadoOcobo"}`} onClick={() => obtenerProducto("2")}>
                                <span className="relative h-9 w-9 md:h-10 md:w-10">
                                    <img className={`absolute transition-opacity duration-500 ease-in-out ${categoriaActiva === "2" ? "opacity-0" : "opacity-100"} group-hover:opacity-0`} src={PlumillaIcon} alt="Carrito" />
                                    <img className={`absolute transition-opacity duration-500 ease-in-out ${categoriaActiva === "2" ? "opacity-100" : "opacity-0"} group-hover:opacity-100`} src={PlumillaIconHover} alt="Carrito" />
                                </span>
                                <p>
                                  Picks
                                  {categoriaActiva === "2" && (
                                    <span className="ml-1 bg-NegroSuave text-RosadoOcobo text-[10px] rounded-full px-1.5 py-0.5 align-middle">{productos.length}</span>
                                  )}
                                </p>
                            </div>

                            <div className={`group duration-300 flex flex-col items-center ${categoriaActiva === "3" ? "text-RosadoOcobo" : "hover:text-RosadoOcobo"}`} onClick={() => obtenerProducto("3")}>
                                <span className="relative h-9 w-9 md:h-10 md:w-10">
                                    <img className={`absolute transition-opacity duration-500 ease-in-out ${categoriaActiva === "3" ? "opacity-0" : "opacity-100"} group-hover:opacity-0`} src={CapuchaIcon} alt="Carrito" />
                                    <img className={`absolute transition-opacity duration-500 ease-in-out ${categoriaActiva === "3" ? "opacity-100" : "opacity-0"} group-hover:opacity-100`} src={CapuchaIconHover} alt="Carrito" />
                                </span>
                                <p>
                                  Accesorios
                                  {categoriaActiva === "3" && (
                                    <span className="ml-1 bg-NegroSuave text-RosadoOcobo text-[10px] rounded-full px-1.5 py-0.5 align-middle">{productos.length}</span>
                                  )}
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center mx-14 sm:mx-16 md:mx-56 xl:mx-56 2xl:mx-56 mt-10 mb-5 gap-3">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-gray-600"></div>
                        <div className="w-2 h-2 bg-RosadoOcobo rotate-45 flex-shrink-0"></div>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-600 to-gray-600"></div>
                    </div>
                </nav>

            

            <div className={`outline-none flex fixed inset-0 z-50 items-center justify-center bg-Suavizado bg-opacity-50 ${!verDetalles ? "hidden" : ""}`}>
                <div className="bg-NegroSuave md:max-w-3xl text-white p-6 rounded-lg">
                    <form>
                    <div className="relative flex flex-col md:flex-row sm:gap-3 md:gap-5 lg:gap-9 xl:gap-9 2xl:gap-9">
                        <div className="flex flex-col justify-center items-center md:justify-normal md:items-start gap-7">
                            <img className="relative w-36 md:w-48 lg:w-56 xl:w-64 h-48 md:h-64 lg:h-72 xl:h-80" src={productoSeleccionado?.imagen} alt="imagen"/>
                            <div className="mb-5">
                                <h1 className="font-bold text-xl">{productoSeleccionado?.nombre}</h1>
                                <p>{productoSeleccionado?.descripcion}</p>
                            </div>
                        </div>
                                    
                        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-6">
                            <div className="flex gap-7 md:flex-col md:gap-2">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Color:</h2>
                                    <input disabled readOnly className={`w-9 sm:w-10 md:w-12 lg:w-14 h-9 sm:h-10 md:h-12 lg:h-14 ${productoSeleccionado?.idColor == 1 ? "rounded-full bg-black border-2": productoSeleccionado?.idColor == 2 ? "rounded-full bg-RosadoOcobo border-2" : "error"}`} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h2 className={productoSeleccionado?.idTalla == 7 ? "hidden" : "text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium"}>Talla:</h2>
                                    <input className={productoSeleccionado?.idTalla == 7 ? "hidden" : "bg-RosadoOcobo md:p-1 lg:p-2 xl:p-3 2xl:p-3 w-9 sm:w-10 md:w-12 lg:w-14 h-9 sm:h-10 md:h-12 lg:h-14 text-center"} readOnly disabled value={productoSeleccionado?.idTalla == 1 ? "XS" : productoSeleccionado?.idTalla == 2 ? "S" : productoSeleccionado?.idTalla == 3 ? "M" : productoSeleccionado?.idTalla == 4 ? "L" : productoSeleccionado?.idTalla == 5 ? "XL" : productoSeleccionado?.idTalla == 6 ? "XXL" : "error"} />
                                </div>
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
                                <button className="bg-RosadoOcobo border-t-2 border-t-RosadoOcobo border-l-2 border-l-RosadoOcobo border-RosadoSuave border-b-2 border-r-2 active:border-NegroSuave active:border-t-2 active:border-l-2 active:border-b-2 active:border-r-2 duration-100 transition-all p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 rounded-full" type="button" onClick={disminuirCantidad}>-</button>
                                <input className="bg-NegroSuave w-10 text-center outline-none" value={cantidad} readOnly disabled type="text" max={productoSeleccionado?.cantidad} />
                                <button className="bg-RosadoOcobo border-t-2 border-t-RosadoOcobo border-l-2 border-l-RosadoOcobo border-RosadoSuave border-b-2 border-r-2 active:border-NegroSuave active:border-t-2 active:border-l-2 active:border-b-2 active:border-r-2 duration-100 transition-all p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 rounded-full" type="button" onClick={aumentarCantidad}>+</button>
                            </div>
                        </div>

                        <p className="absolute -mt-1 right-3 cursor-pointer" onClick={() => abrirModal()}>x</p>
                            
                        <div className="mt-5 md:mt-8 flex flex-row md:flex-col gap-8">
                            <button className="border-2 bg-black rounded-md p-3 hover:bg-RosadoOcobo duration-500 transition-all ease-in-out" type="button" onClick={manejarCarrito}>Agregar al carrito</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <section className="rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4">
                    {productos.map((producto, index) => (
                    <Items manejarCarrito={manejarCarrito} key={index} producto={producto} abrirModal={() => abrirModal(producto)} setVerDetalles={setVerDetalles} setProductoSeleccionado={setProductoSeleccionado} setCantidad={setCantidad} verDetalles={verDetalles} />
                    ))}       
                </section>
            </div>


        </main>

        <Footer obtenerProducto={obtenerProducto} />

      </div>


    )
}

export default Main;