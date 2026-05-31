import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const Pendientes = ({pendiente, index}) => {    

    const idFactura = pendiente.idFactura;

    const [actualizarTiempoReal, setActualizarTiempoReal] = useState("")

    const cancelar = 2;
    const entregado = 3;

    console.log("ID:", idFactura)

    const idColaborador = localStorage.getItem("idColaborador");

    const cancelarProducto = async (e) => {
    e.preventDefault()

    try {
          Swal.fire({
            title: "¿Estas seguro?",
            text: "¡Se Cancelara el Pedido!",
            icon: "warning",
            iconColor: "#F28B82",
            showCancelButton: true,
            confirmButtonColor: "#E96BA3",
            confirmButtonText: "¡Si, Cancelar Pedido!",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#3A3A3A",
            background: "#1C1C1C"
          }).then(async(result) => {
            if (result.isConfirmed) {
              console.log(pendiente.idFactura)
              const response = await axios.post('http://localhost:8080/VerPedidos/', {
                action: "cancelarCompra",
                idFactura: idFactura,
                cancelar: cancelar,
                idColaborador: idColaborador
              });
              console.log(response.data.message)
              if (response.data.message) {
                Swal.fire({
                  title: "¡Compra Cancelada con Exito!",
                  icon: "success",
                  iconColor: "#E96BA3",
                  confirmButtonColor: "#E96BA3",
                  background: "#1C1C1C"
                });
                setActualizarTiempoReal(prevActualizar => {
                    const nuevaActualizacion = [...prevActualizar];
                    nuevaActualizacion[index] = {
                        ...nuevaActualizacion[index],
                        idEstadoFactura: 2
                    }
                    return nuevaActualizacion;
                })
              }

            }
          });
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Error al realizar la búsqueda!',
            iconColor: "#F28B82",
            confirmButtonColor: "#E96BA3",
            background: "#1C1C1C"
        });
    }
  }

    const productoEntregado = async (e) => {
    e.preventDefault()

    try {
          Swal.fire({
            title: "¿Estas seguro?",
            text: "¡Despues no podra hacer cambios!",
            icon: "warning",
            iconColor: "#F28B82",
            showCancelButton: true,
            confirmButtonColor: "#E96BA3",
            confirmButtonText: "¡Si, El Producto Se Entrego!",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#3A3A3A",
            background: "#1C1C1C"
          }).then(async(result) => {
            if (result.isConfirmed) {
              console.log(pendiente.idFactura)
              const response = await axios.post('http://localhost:8080/VerPedidos/', {
                action: "cancelarCompra",
                idFactura: idFactura,
                cancelar: entregado,
                idColaborador: idColaborador
              });
              console.log(response.data)
              if (response.data.message) {
                Swal.fire({
                  title: "¡Producto Entregado!",
                  icon: "success",
                  iconColor: "#E96BA3",
                  confirmButtonColor: "#E96BA3",
                  background: "#1C1C1C"
                });
                setActualizarTiempoReal(prevActualizar => {
                    const nuevaActualizacion = [...prevActualizar];
                    nuevaActualizacion[index] = {
                        ...nuevaActualizacion[index],
                        idEstadoFactura: 3
                    }
                    return nuevaActualizacion;
                })
              }

            }
          });
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Error al realizar la búsqueda!',
            iconColor: "#F28B82",
            confirmButtonColor: "#E96BA3",
            background: "#1C1C1C"
        });
    }
  }
  return (
    <div className="bg-NegroSuaveSuavizado md:w-anchoEspecial p-2">
      <div key={index} className="relative md:flex">
        <div>
          <h1 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">{pendiente.nombre}</h1>
          <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">{pendiente.correo}</p>
          <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">{pendiente.numeroCelular}</p>
          <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">{pendiente.fecha}</p>
          {/* <a className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl hover:text-RosadoOcobo hover:duration-300" href={pendiente.ruta_pdf} target="_blank" rel="noopener noreferrer">{pendiente.codigoFactura}hola</a> */}
          <p>{pendiente.estado == 1 ? "Compra Activa" : pendiente.estado == 3 ? "Producto Entregado" : "Compra Cancelada"}</p>
          <p>{pendiente.nombreColaborador}</p>
        </div>

        <div className="md:absolute sm:flex sm:flex-col right-5 mt-2">
          <button className={pendiente.estado == 1 ? "bg-RosadoOcobo rounded-md p-2 h-10 w-44" : "hidden"} onClick={productoEntregado}>Producto entregado</button>
          <button className={pendiente.estado == 1 ? "mt-5 bg-black border-2 rounded-md p-2 w-44" : "hidden"} onClick={cancelarProducto}>Cancelar Compra</button>
        </div>
      </div>

        <hr className="mt-5" />
    </div>
  )
}

export default Pendientes;