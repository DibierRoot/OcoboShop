import { useState, useEffect } from "react";
import Logo from "/src/assets/image/Logo.jpeg"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Main = () => {

  const click = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      titleColor: "#FFFFFF",
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonColor: "#3A3A3A",
      confirmButtonText: "Guardar",
      confirmButtonColor: "#E96BA3",
      denyButtonText: "No guardar",
      denyButtonColor: "#F28B82",
      background: "#1C1C1C"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Cambios guardados!",
          icon: "success",
          iconColor: "#E96BA3",
          confirmButtonColor: "#E96BA3",
          background: "#1C1C1C"
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: "Cambios no guardados",
          icon: "info",
          iconColor: "#F28B82",
          confirmButtonColor: "#E96BA3",
          background: "#1C1C1C"
        });
      }
    });
  }

  const [productos, setVerProductos] = useState([])

    return (
      <main>

        <form action="">
          <div className="bg-NegroSuave relative max-w-4xl items-center rounded-lg my-10 mx-auto flex flex-col gap-7 -mt-36 py-24">
            <div className="flex gap-56">
              <div>
                <img className="h-52 w-52 rounded-full" src={Logo} alt="" />
                <input className="placeholder:text-2xl placeholder:text-center placeholder:text-white text-center text-white border-b-2 border-white h-10 p-2 mt-4 outline-none bg-NegroSuave" placeholder="Cristian" />
              </div>
              <div className="flex flex-col gap-8">
                <label htmlFor="">Correo Electronico <span className="text-RosadoOcobo">*</span> <br /> <input className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
                <label htmlFor="">Correo Recuperacion <span className="text-RosadoOcobo">*</span> <br /> <input className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
                <label htmlFor="">Contraseña <span className="text-RosadoOcobo">*</span> <br /> <input className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
              </div>
            </div>
            <button onClick={click} className="bg-RosadoOcobo p-3 rounded-md">Aceptar Cambios</button>
            <p className="absolute left-10 bottom-10 cursor-pointer hover:text-RosadoOcobo hover:duration-300">
              <Link to={"/Inicio"}>
                ← Atras
              </Link>
              </p>
          </div>
        </form>
          

      </main>
    )
}

export default Main;