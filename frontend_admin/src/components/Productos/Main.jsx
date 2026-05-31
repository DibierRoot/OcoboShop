import { useState, useEffect } from "react";
import Items from "./Items"
import Footer from "./Footer";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Main = () => {

  const [verDatos, setVerDatos] = useState([])
  const [productos, setVerProductos] = useState([])

  // Obtener los productos desde el backend
    const obtenerDatos = async () => {
        axios.get('http://localhost:8080/VerProductosAdmin/')  // Ruta del archivo PHP
        .then(response => {
          setVerProductos(response.data);  // Guardamos los datos de los productos en el estado
        })
        .catch(error => {
          console.error("Hubo un error al obtener las imágenes: ", error);
        });
  }

  const eliminarProductoEnTiempoReal = (idProducto) => {
      setVerDatos(verDatos.filter(producto => producto.idProducto !== idProducto))
  }


  const actualizarProductoEnTiempoReal = (productoActualizado) => {
      setVerProductos(prevProducto => 
          prevProducto.map(producto => 
              producto.idProducto === productoActualizado.idProducto ? productoActualizado : producto
          )
      );
  };

  useEffect(() => {
      obtenerDatos();
  }, [])

  console.log("length", productos)

    return (
      <main className="">
        <div className="flex justify-center items-center">
          <section className="rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 2xl:grid-cols-4">
            {productos.length < 1 ? (
              <div>
                <p className="text-center">¡No hay nada aqui!</p>
                <Link to={"/Colaboradores/Inicio/Agregar"}>
                  <button className="bg-RosadoOcobo p-3 rounded-md">Publicar Producto</button>
                </Link>
              </div>
              ) : (
                productos.map((producto, index) => (
                  <Items key={index} eliminarProductoEnTiempoReal={eliminarProductoEnTiempoReal} actualizarProductoEnTiempoReal={actualizarProductoEnTiempoReal} producto={producto} abrirModal={() => abrirModal(productoSeleccionado)} />
                ))
              )
            }
          </section>
        </div>

        <Footer />

      </main>
    )
}

export default Main;