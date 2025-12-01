import { useState, useEffect } from "react";
import Items from "./Items"
import Footer from "./Footer.jsx"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Swal from "sweetalert2";
import { Link, useNavigate} from "react-router-dom";
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

    const [nombre, setNombre] = useState(""); // Para almacenar el nombre del usuario
    const [correo, setCorreo] = useState(""); // Para almacenar el correo del usuario
    const [numeroCelular, setNumeroCelular] = useState(""); // Para almacenar el numero telefonico del usuario
    const [mensaje, setMensaje] = useState(""); // Para almacenar el mensaje escrito por el usuario

    const idCliente = localStorage.getItem('idCliente')

    const navigate = useNavigate();

    const [productos, setVerProductos] = useState([])

    const [verDetalles, setVerDetalles] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [filtro, setFiltro] = useState("")

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

    if (idCliente) {
        // Obtener información del cliente al cargar el componente
        useEffect(() => {
            const fetchClientData = async () => {
                try {
                    const response = await fetch("http://localhost/OcoboBack-end/CRUD/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            action: "getCliente",
                            idCliente: idCliente, // Cambia este valor por el ID correcto del cliente
                        }),
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error("Error en el servidor:", errorText);
                        return;
                    }

                    const data = await response.json();
                    console.log("Respuesta del servidor:", data); // Debug

                    if (data) {
                        setNombre(data.nombre || ""); // Inicializar el nombre del usuario
                        setCorreo(data.correo || "");
                        setNumeroCelular(data.numeroCelular || "");
                    } else {
                        console.error("Datos de cliente no encontrados o inválidos.");
                    }
                } catch (error) {
                console.error("Error al obtener los datos del cliente:", error);
                }
            };

            fetchClientData();
        }, []);
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

    return (

        <div>
            <main className="ml-96">
                <h1 className="mt-5 text-2xl font-bold">Contacto</h1>
                <p className="text-xs lg:text-sm xl:text-base mt-4">Cualquier duda, pregunta, queja que tenga se le respondera. Recuerde estamos para ayudar en todo lo posible.</p>
                <div className="mt-5 flex flex-col gap-4">
                    <label htmlFor="">Nombre <span className="text-RosadoOcobo">*</span> <br /> <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="rounded-md h-9 w-52 sm:w-44 md:w-48 lg:w-52 xl:w-56 text-black outline-none p-2" type="text" /></label>
                    <label htmlFor="">Correo Electrónico <span className="text-RosadoOcobo">*</span> <br /> <input value={correo} onChange={(e) => setCorreo(e.target.value)} className="rounded-md h-9 w-52 sm:w-44 md:w-48 lg:w-52 xl:w-56 text-black outline-none p-2" type="text" /></label>
                    <label htmlFor="">Número Telefónico <span className="text-RosadoOcobo">*</span> <br /> <input value={numeroCelular} onChange={(e) => setNumeroCelular(e.target.value)} className="rounded-md h-9 w-52 sm:w-44 md:w-48 lg:w-52 xl:w-56 text-black outline-none p-2" type="text" /></label>
                    <label htmlFor="">Mensaje <span className="text-RosadoOcobo">*</span> <br /><textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} name="" id="" className="rounded-md text-black outline-none p-2"></textarea></label>
                </div>

            </main>
            

        <Footer obtenerProducto={obtenerProducto} />

      </div>


    )
}

export default Main;