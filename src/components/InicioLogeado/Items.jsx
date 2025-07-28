const Items = ({manejarCarrito, index, producto, abrirModal}) => {
    return (
      <div className="group">
        <form>
          <article className="text-white p-8 rounded-md" key={index} onClick={() => abrirModal()}>
            <img className="h-96 w-80" src={producto.imagen} alt="ImagenProducto" />
            <p className="text-white">{producto.nombre}</p>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}COP</p>
          </article>
          {/* <button className="absolute -mt-40 ml-24 bg-black p-3 rounded-md border border-white opacity-0 group-hover:opacity-100 transition-opacity hover:transition-colors hover:bg-RosadoOcobo duration-700 hover:duration-500" type="button" onClick={manejarCarrito}>Agregar al carrito</button> */}
        </form>
      </div>

    )
}

export default Items;