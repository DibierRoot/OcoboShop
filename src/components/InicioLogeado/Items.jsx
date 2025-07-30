const Items = ({manejarCarrito, index, producto, abrirModal}) => {
    return (
      <div className="group">
        <form>
          <article className="text-white p-5 rounded-md" key={index} onClick={() => abrirModal()}>
            <img className="w-40 md:w-48 lg:w-56 xl:w-64 h-56 md:h-64 lg:h-72 xl:h-80" src={producto.imagen} alt="ImagenProducto" />
            <p className="text-white">{producto.nombre}</p>
            <p>${producto.precio} COP</p>
          </article>
          {/* <button className="absolute -mt-40 ml-24 bg-black p-3 rounded-md border border-white opacity-0 group-hover:opacity-100 transition-opacity hover:transition-colors hover:bg-RosadoOcobo duration-700 hover:duration-500" type="button" onClick={manejarCarrito}>Agregar al carrito</button> */}
        </form>
      </div>

    )
}

export default Items;