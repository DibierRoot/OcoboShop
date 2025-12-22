import { useNavigate } from "react-router-dom";

const Items = ({index, producto, manejarCarrito, abrirModal}) => {

  const navigate = useNavigate();

  const Redireccionar = () => {
    e.preventDefault();

    navigate("/Inicio");
  }

    const hoy = new Date().toLocaleDateString("sv-SE");

    return (
      <div className="relative group">
        <form>
          <article className="text-white p-5 rounded-md" key={index} onClick={() => abrirModal()}>
            <img className="w-40 md:w-48 lg:w-56 xl:w-64 h-52 md:h-64 lg:h-72 xl:h-80" src={producto.imagen} alt="ImagenProducto" />
            <p className={producto.fechaPublicacion?.split('-')[1] == hoy?.split('-')[1] || producto.cantidad <= 0 ? "absolute -mt-6 bg-RosadoOcobo font-medium text-center md:w-48 w-36 lg:w-56 xl:w-64" : "hidden"}>{producto.cantidad <= 0 ? "AGOTADO" : "NUEVO"}</p>
            <p className="text-sm md:text-base text-white">{producto.nombre.length > 25 ? producto.nombre?.substring(0, 25) + "..." : producto.nombre}</p>
            <p className="text-sm md:text-base">${producto.precio} COP</p>
            <input className={producto.idTalla == 7 ? "hidden" : "text-sm md:text-base bg-RosadoOcobo w-8 lg:w-10 h-8 lg:h-10 text-center"} readOnly disabled value={producto.idTalla == 1 ? "XS" : producto.idTalla == 2 ? "S" : producto.idTalla == 3 ? "M" : producto.idTalla == 4 ? "L" : producto.idTalla == 5 ? "XL" : producto.idTalla == 6 ? "XXL" : "error"} />
          </article>
        </form>
      </div>
    )
}

export default Items;