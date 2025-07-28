import { useNavigate } from "react-router-dom";

const Items = ({index, producto, manejarCarrito, abrirModal}) => {

  const navigate = useNavigate();

  const Redireccionar = () => {
    e.preventDefault();

    navigate("/Inicio");
  }

    return (
      <div className="group">
        <article className="text-white p-8 rounded-md w-auto" key={index} onClick={() => abrirModal()}>
          <img className="h-96 w-80" src={producto.imagen} alt="ImagenProducto" />
          <p className="text-white">{producto.nombre}</p>
          <p>{producto.descripcion}</p>
        </article>
      </div>

    )
}

export default Items;