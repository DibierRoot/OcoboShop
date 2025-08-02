import { useState, useCallback } from "react";
import IconCheck from "./Icons/IconCheck";

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
                <item key={producto.id} className="flex mt-3">
                    <img className="w-36 md:w-48 lg:w-56 xl:w-64 h-48 md:h-64 lg:h-72 xl:h-80" src={producto.imagen} alt="ImagenProducto" />
                    <div className="ml-3">
                        <h1 className="font-bold text-lg sm:text-xl md:text-xl xl:text-2xl">{producto.nombre}</h1>
                        <p className="text-base sm:text-lg md:text-lg xl:text-xl">{producto.descripcion}</p>
                        <div className="flex gap-6">
                            <div className="flex flex-col">
                                <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Color:</h2>
                                <input disabled readOnly className={`w-9 sm:w-10 md:w-12 lg:w-14 h-9 sm:h-10 md:h-12 lg:h-14 ${producto.idColor == 1 ? "rounded-full bg-black border-2": producto.idColor == 2 ? "rounded-full bg-RosadoOcobo border-2" : "error"}`} />
                            </div>
                            <div>
                                <h2 className={producto.idTalla == 7 ? "hidden" : "text-base sm:text-lg md:text-lg xl:text-xl font-medium"}>Talla: </h2>
                                <input className={producto.idTalla == 7 ? "hidden" : "bg-RosadoOcobo md:p-1 lg:p-2 xl:p-3 2xl:p-3 w-9 sm:w-10 md:w-12 lg:w-14 h-9 sm:h-10 md:h-12 lg:h-14 text-center"} readOnly disabled value={producto.idTalla == 1 ? "XS" : producto.idTalla == 2 ? "S" : producto.idTalla == 3 ? "M" : producto.idTalla == 4 ? "L" : producto.idTalla == 5 ? "XL" : producto.idTalla == 6 ? "XXL" : "error"} />
                            </div>
                        </div>
                        <div className="text-base sm:text-lg md:text-lg xl:text-xl mt-2 flex gap-1 sm:gap-2">
                            <p className="font-medium">Cantidad: </p>
                            <p>{producto.cantidad}</p>
                        </div>
                        <div className="text-base sm:text-lg md:text-lg xl:text-xl mt-2 flex gap-1 sm:gap-2">
                            <p className="font-medium">Total:</p>
                            <p>${miles(producto.precio * producto.cantidad)}</p>
                        </div>
                    </div>
                </item>
            </div>
            <hr className="border-dashed md:mt-10"/>
        </div>
    )
}

export default ItemsCarrito;