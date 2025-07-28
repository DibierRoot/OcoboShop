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
                    <button className={`mx-5 my-36 w-5 h-5 rounded-full border-2 ${productosSeleccionados.includes(producto.id) ? "flex justify-center items-center bg-RosadoOcobo" : "inline-block"}`} name="check-carrito" id="check-carrito" type="button" onClick={() => manejarSeleccionProducto(producto.id)}>{productosSeleccionados.includes(producto.id) && <IconCheck /> }</button>
                </div>
                <item key={producto.id} className="flex mt-3">
                    <img className="h-72 w-56" src={producto.imagen} alt="ImagenProducto" />
                    <div className="ml-3">
                        <h1 className="mt-2 text-2xl">{producto.nombre}</h1>
                        <p>{producto.descripcion}</p>
                        <p className={producto.idTalla == 7 ? "hidden" : "text-xl font-medium"}>Talla: </p>
                        <input className={producto.idTalla == 7 ? "hidden" : "bg-RosadoOcobo p-3 w-14 h-14 text-center"} readOnly disabled value={producto.idTalla == 1 ? "XS" : producto.idTalla == 2 ? "S" : producto.idTalla == 3 ? "M" : producto.idTalla == 4 ? "L" : producto.idTalla == 5 ? "XL" : producto.idTalla == 6 ? "XXL" : "error"} />
                        <p className="mt-2 text-xl font-medium">Cantidad: </p>
                        <p className="text-xl">{producto.cantidad}</p>
                        <div className="text-xl mt-2 flex gap-2">
                            <p className="font-medium">Precio total:</p>
                            <p className="">{miles(producto.precio * producto.cantidad)}</p>
                        </div>
                    </div>
                </item>
            </div>
            <hr className="border-dashed mt-10"/>
        </div>

    )
}

export default ItemsCarrito;