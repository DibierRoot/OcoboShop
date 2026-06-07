import EyeToggle from "../common/Icons/EyeToggle";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Main = ({addCliente}) => {

  const [verContrasena, setVerContrasena] = useState(false);

  const verOcultarContrasena = () => {
    setVerContrasena(!verContrasena);
  };

  const navigate = useNavigate();

  const [cliente, setCliente] = useState ({
    nombre: "",
    correo: "",
    contrasena: "",
  });

  const [cargando, setCargando] = useState(false)

  const [mensaje, setMensaje] = useState("");

  const {nombre, correo, contrasena} = cliente;

  const click = async (e) => {
    e.preventDefault();

    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!nombre.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Escribe algun nombre para que podamos indentificarte!",
        iconColor: "#E96BA3",
        confirmButtonColor: "#E96BA3",
        background: "#1C1C1C"
      });
      return;
    }

    // Validación del formato de correo
    if (!regexEmail.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡El correo electrónico no es válido!",
        iconColor: "#E96BA3",
        confirmButtonColor: "#E96BA3",
        background: "#1C1C1C"
      });
      return;
    }
    // Validación de contraseña (mínimo 8 caracteres)
    if (contrasena.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡La contraseña debe tener como mínimo 8 dígitos!",
        iconColor: "#E96BA3",
        confirmButtonColor: "#E96BA3",
        background: "#1C1C1C"
      });
      return;
    }

    // Añadir los datos del cliente al estado global (si se usa alguno)
    addCliente ({
      ...cliente,
    });

  try {
      // Enviar solicitud de registro al backend
      const response = await axios.post(
        "http://localhost:8080/CRUD/",
        {
          action: "register",
          nombre,
          correo,
          contrasena,
        },
        { 
          withCredentials: true,  // Permitir el envío de cookies de sesión
        }
      );

      const mensajeRespuesta = response.data.message;
      setMensaje(mensajeRespuesta);
      const id = response.data.idCliente;
      console.log(response.data)

      // Si el registro fue exitoso
      if (mensajeRespuesta === "Registro exitoso") {
        localStorage.setItem("idCliente", id)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1500,
          iconColor: "#E96BA3",
          confirmButtonColor: "#E96BA3",
          background: "#1C1C1C"
        });
        navigate("/Inicio/Productos/");
      } 
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Error! No se pudo completar el registro.",
      });
    } finally {
      setCargando(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setCliente ({
      ...cliente,
      [name]: value,
    });
  }

  const [productos, setVerProductos] = useState([])

    return (
      <main className="pb-10">

        <form onSubmit={click}>
          <div className="bg-NegroSuave relative max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-5xl items-center rounded-lg my-10 mx-auto flex flex-col gap-7 -mt-36 py-24">
            <h1 className="text-4xl">¡HOLA!</h1>
            <label htmlFor="nombre">Nombre <span className="text-RosadoOcobo">*</span> <br /> <input onChange={handleChange} id="nombre" name="nombre" value={nombre} className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
            <label htmlFor="correo">Correo Electronico <span className="text-RosadoOcobo">*</span> <br /> <input onChange={handleChange} id="correo" name="correo" value={correo} className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
            <label className="relative" htmlFor="contrasena">Contraseña <span className="text-RosadoOcobo">*</span> <br /><EyeToggle visible={verContrasena} onClick={verOcultarContrasena} className="absolute right-2 mt-1" /> <input onChange={handleChange} id="contrasena" name="contrasena" value={contrasena} className="rounded-md h-9 text-black outline-none p-2" type={verContrasena ? "text" : "password"} /></label>
            <button className="bg-RosadoOcobo p-3 rounded-md" disabled={cargando} >
              {cargando ? "Registrando..." : "Crear Cuenta"}
            </button>
            <p>{mensaje}</p>
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