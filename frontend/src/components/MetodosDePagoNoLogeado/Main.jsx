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
          const response = await axios.post('http://localhost:8080/Filtros/', {
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
        axios.get('http://localhost:8080/VerProductos/')  // Ruta del archivo PHP
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
            <main className="text-center">
                <h1 className="mt-5 text-2xl font-bold">Metodos de pago</h1>
                <p className="text-xs lg:text-sm xl:text-base mt-4">
                   Actualmente la Pagina oficial de <strong>OCOBO</strong> cuenta con un unico metodo de pago que es el pago contra entrega.
                   ¿Como funciona este metodo de pago? <br />
                   El pago contra entrega es un metodo de pago donde el cliente realiza el pedido por medio de la pagina. <br />
                   Luego de que se haya notificado la compra nos comunicaremos con usted y iremos al destino indicado en el apartado de
                   <Link to={"/Registro"}>
                   <strong className="hover:text-RosadoOcobo duration-300 ease-in-out"> Cuenta.</strong> <br />       
                   </Link>
                   En caso de no obtener respuesta en tres intentos de llamada, el pedido será <strong>CANCELADO</strong> automaticamente. <br />
                   Cuando recibas el producto debes pagar el monto acordado en la factura del pedido. El pago puede ser en efectivo o por transferencia. <br />
                   ¡NO SE ACEPTAN DEVOLUCIONES NI CANCELACIONES DE PEDIDO CUANDO EL PRODUCTO YA HA SIDO ENTREGADO AL MENOS QUE HAYA TENIDO DESPERFECTO DE FABRICA!
                </p>
            </main>
            

        <Footer obtenerProducto={obtenerProducto} />

      </div>


    )
}

export default Main;