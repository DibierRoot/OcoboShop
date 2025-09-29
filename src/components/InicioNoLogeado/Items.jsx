import { useNavigate } from "react-router-dom";

const Items = ({index, producto, manejarCarrito, abrirModal}) => {

  const navigate = useNavigate();

  const Redireccionar = () => {
    e.preventDefault();

    navigate("/Inicio");
  }

    return (
      <div className="relative group">
        <form>
          <article className="text-white p-5 rounded-md" key={index} onClick={() => abrirModal()}>
            <img className="w-36 md:w-48 lg:w-56 xl:w-64 h-48 md:h-64 lg:h-72 xl:h-80" src={producto.imagen} alt="ImagenProducto" />
            <p className="text-white">{producto.nombre.length > 25 ? producto.nombre?.substring(0, 25) + "..." : producto.nombre}</p>
            <input className={producto.idTalla == 7 ? "hidden" : "bg-RosadoOcobo w-9 lg:w-10 h-9 lg:h-10 text-center"} readOnly disabled value={producto.idTalla == 1 ? "XS" : producto.idTalla == 2 ? "S" : producto.idTalla == 3 ? "M" : producto.idTalla == 4 ? "L" : producto.idTalla == 5 ? "XL" : producto.idTalla == 6 ? "XXL" : "error"} />
            <p>${producto.precio} COP</p>
          </article>
        </form>
      </div>
    )
}

export default Items;