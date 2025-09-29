import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

const Items = ({clienteId, fechas, setFechas, index, factura}) => {

    const idFactura = fechas[index]?.idFactura;
    const estado = fechas[index]?.idEstadoFactura
    const cancelar = 2;
    const hoy = new Date().toLocaleDateString("sv-SE");
    console.log(hoy)
    console.log(Date())

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
              console.log(fechas[index]?.idFactura)
              const response = await axios.post('http://localhost/OcoboBack-end/CRUD/', {
                action: "cancelarCompra",
                idFactura: idFactura,
                cancelar: cancelar
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
                setFechas(prevFechas => {
                    const nuevasFechas = [...prevFechas];
                    nuevasFechas[index] = {
                        ...nuevasFechas[index],
                        idEstadoFactura: 2
                    }
                    return nuevasFechas;
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
        <div key={index} className="bg-NegroSuave p-2">
                <div className="">
                  <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Factura: {factura.codigoFactura}</p>
                  <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Fecha: {fechas[index]?.fechaCompra}</p> 
                  <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Metodo de Pago: {fechas[index]?.metodoPago}</p> 
                </div>

                <div className="flex flex-col gap-3">
                  <a href={factura.ruta_pdf} target="_blank" rel="noopener noreferrer" className="visualizar-factura">
                    <button className="mt-2 text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium hover:text-RosadoOcobo hover:duration-300">Visualizar factura</button>
                  </a>
                  <p>{fechas[index]?.idEstadoFactura == 1 ? "Compra Activa" : "Compra Cancelada"}</p>
                  <button className={fechas[index]?.idEstadoFactura == 1 && fechas[index]?.fechaCompra == hoy ? "bg-RosadoOcobo rounded-md p-3" : "hidden"} onClick={cancelarProducto}>Cancelar Compra</button>

                </div>
                <hr className="mt-5" />
        </div>
    )
}

export default Items