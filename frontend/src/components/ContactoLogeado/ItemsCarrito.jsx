import { useState, useCallback } from "react";
import IconCheck from "../common/Icons/IconCheck";

const ItemsCarrito = ({id, productosSeleccionados, setProductosSeleccionados, productosEnCarrito, setProductosEnCarrito, producto}) => {    

    const miles = (productos) => {
        return productos.toLocaleString('es-CO');
    }

    const manejarSeleccionProducto = (productoId) => {
        setProductosSeleccionados((prevSeleccionados) => {
            if (prevSeleccionados.includes(productoId)) {
                return prevSeleccionados.filter((id) => id !== productoId);
            } else {
                return [...prevSeleccionados, productoId];
            }
        });
    };

    return (
        <div>
            <div className="flex">
                <div>
                    <button className={`mr-2 sm:mx-3 md:mx-4 lg:mx-5 my-36 w-5 h-5 rounded-full border-2 ${productosSeleccionados.includes(producto.id) ? "flex justify-center items-center bg-RosadoOcobo" : "inline-block"}`} name="check-carrito" id="check-carrito" type="button" onClick={() => manejarSeleccionProducto(producto.id)}>{productosSeleccionados.includes(producto.id) && <IconCheck /> }</button>
                </div>
                <div key={producto.id} className="flex gap-3 mt-3">
                    <img className="w-36 md:w-44 h-48 md:h-60" src={producto.imagen} alt="ImagenProducto" />
                    <div className="">
                        <h1 className="text-base sm:text-lg">{producto.nombre.length > 25 ? producto.nombre?.substring(0, 25) + "..." : producto.nombre}</h1>
                        <div className="flex gap-6">
                            <div className="flex gap-6">
                                <input disabled readOnly className={`w-9 sm:w-11 h-9 sm:h-11 ${producto.idColor == 1 ? "rounded-full bg-black border-2": producto.idColor == 2 ? "rounded-full bg-RosadoOcobo border-2" : "error"}`} />
                                <input className={producto.idTalla == 7 ? "hidden" : "bg-RosadoOcobo xl:p-2 w-9 sm:w-11 h-9 sm:h-11 text-center"} readOnly disabled value={producto.idTalla == 1 ? "XS" : producto.idTalla == 2 ? "S" : producto.idTalla == 3 ? "M" : producto.idTalla == 4 ? "L" : producto.idTalla == 5 ? "XL" : producto.idTalla == 6 ? "XXL" : "error"} />
                            </div>
                        </div>
                        <div className="text-base sm:text-lg md:text-lg xl:text-xl mt-2 flex gap-1 sm:gap-2">
                            <p className="">Cantidad: </p>
                            <p>{producto.cantidad}</p>
                        </div>
                        <div className="text-base sm:text-lg md:text-lg xl:text-xl mt-2 flex gap-1 sm:gap-2">
                            <p className="">Total:</p>
                            <p>${miles(producto.precio * producto.cantidad)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-dashed -mt-10 md:mt-0"/>
        </div>
    )
}

export default ItemsCarrito;