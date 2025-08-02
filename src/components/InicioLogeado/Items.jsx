const Items = ({manejarCarrito, index, producto, abrirModal}) => {
    return (
      <div className="relative group">
        <form>
          <article className="text-white p-5 rounded-md" key={index} onClick={() => abrirModal()}>
            <img className="w-36 md:w-48 lg:w-56 xl:w-64 h-48 md:h-64 lg:h-72 xl:h-80" src={producto.imagen} alt="ImagenProducto" />
            <p className="text-white">{producto.nombre}</p>
            <input className={producto.idTalla == 7 ? "hidden" : "bg-RosadoOcobo md:p-1 lg:p-2 xl:p-3 2xl:p-3 w-7 sm:w-8 md:w-9 lg:w-10 h-7 sm:h-8 md:h-9 lg:h-10 text-center"} readOnly disabled value={producto.idTalla == 1 ? "XS" : producto.idTalla == 2 ? "S" : producto.idTalla == 3 ? "M" : producto.idTalla == 4 ? "L" : producto.idTalla == 5 ? "XL" : producto.idTalla == 6 ? "XXL" : "error"} />
            <p>${producto.precio} COP</p>
          </article>
        </form>
      </div>

    )
}

export default Items;