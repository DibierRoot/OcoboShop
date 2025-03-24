import { useState, useEffect } from "react";
import Producto1 from "/src/assets/image/Producto1.jpeg"
import Producto2 from "/src/assets/image/Producto3.jpeg"
import { Link } from "react-router-dom";

const Main = () => {

  const [productos, setVerProductos] = useState([])

    return (
      <main>

        <form action="">
          <div className="bg-NegroSuave relative max-w-4xl items-center rounded-lg my-10 mx-auto flex flex-col gap-7 -mt-36 py-24">
            <h1 className="text-4xl">¡HOLA!</h1>
            <label htmlFor="">Nombre <span className="text-RosadoOcobo">*</span> <br /> <input className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
            <label htmlFor="">Correo Electronico <span className="text-RosadoOcobo">*</span> <br /> <input className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
            <label htmlFor="">Contraseña <span className="text-RosadoOcobo">*</span> <br /> <input className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
            <button className="bg-RosadoOcobo p-3 rounded-md">Crear Cuenta</button>
            <p className="absolute left-10 bottom-10 cursor-pointer hover:text-RosadoOcobo hover:duration-300">
              <Link to={"/"}>
                ← Atras
              </Link>
              </p>
          </div>
        </form>
          

      </main>
    )
}

export default Main;