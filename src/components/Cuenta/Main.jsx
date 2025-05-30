import { useState, useEffect } from "react";
import Logo from "/src/assets/image/Logo.jpeg"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Main = () => {

      // Estados para manejar los valores de edición
    const [nombre, setNombre] = useState(""); // Para almacenar el nombre del usuario
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [direccion, setDireccion] = useState("");
    const [numeroCelular, setNumeroCelular] = useState("");
    const [correoRecuperacion, setCorreoRecuperacion] = useState("");
    const [puntoReferencia, setPuntoReferencia] = useState("");

    const idCliente = localStorage.getItem('idCliente')

      // Estados para habilitar y deshabilitar los campos de edición
    const [editNombre, setEditNombre] = useState(false); // Editar nombre
    const [editCorreo, setEditCorreo] = useState(false);
    const [editContrasena, setEditContrasena] = useState(false);
    const [editDireccion, setEditDireccion] = useState(false);
    const [editCorreoRecuperacion, setEditCorreoRecuperacion] = useState(false);
    const [editPuntoReferencia, setEditPuntoReferencia] = useState(false);

    // Obtener información del cliente al cargar el componente
    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch("http://localhost/OcoboBack-end/CRUD/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        action: "getCliente",
                        idCliente: idCliente, // Cambia este valor por el ID correcto del cliente
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error en el servidor:", errorText);
                    return;
                }

                const data = await response.json();
                console.log("Respuesta del servidor:", data); // Debug

                if (data) {
                    setNombre(data.nombre || ""); // Inicializar el nombre del usuario
                    setCorreo(data.correo || "");
                    setContrasena(data.contrasena || ""); // Nunca mostramos la contraseña real
                    setNumeroCelular(data.numeroCelular || "");
                    setDireccion(data.direccion || "");
                    setCorreoRecuperacion(data.correoRecuperacion || "")
                    setPuntoReferencia(data.puntoReferencia || "")
                } else {
                    console.error("Datos de cliente no encontrados o inválidos.");
                }
            } catch (error) {
              console.error("Error al obtener los datos del cliente:", error);
            }
        };

        fetchClientData();
    }, []);

    const click = async (e) => {

      e.preventDefault();

      let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

        try {
        const response = await axios.post("http://localhost/OcoboBack-end/CRUD/", {
            action: "edit",
            idCliente, // Cambia por el ID correcto del cliente
            nombre, // Enviar nombre
            correo,
            contrasena, // Solo envía si fue editada
            direccion,
            correoRecuperacion,
            puntoReferencia
        });
        const mensajeRespuesta = response.data.message;
        if (mensajeRespuesta === 'Datos actualizados correctamente') {
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Datos actualizados correctamente',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            console.log(mensajeRespuesta)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Error al editar!',
                // footer: '<a href="">Why do I have this issue?</a>'
            });
        }

            // Resetear los estados de edición
            setEditNombre(false);
            setEditCorreo(false);
            setEditContrasena(false);
            setEditDireccion(false);
            setEditCorreoRecuperacion(false)
            setEditPuntoReferencia(false)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Error!',
                // footer: '<a href="">Why do I have this issue?</a>'
            });
            console.log(error)
        }

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

        <form onSubmit={click}>
          <div className="bg-NegroSuave relative max-w-5xl items-center rounded-lg my-10 mx-auto flex flex-col gap-7 -mt-36 py-24">
            <div className="flex gap-56">
              <div>
                <img className="h-52 w-52 rounded-full" src={Logo} alt="" />
                <input id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="placeholder:text-2xl placeholder:text-center placeholder:text-white text-center text-white border-b-2 border-white h-10 p-2 mt-4 outline-none bg-NegroSuave" />
              </div>
              <div className="flex flex-row gap-8">
                <div className="flex flex-col gap-8">
                  <label htmlFor="">Correo Electronico <br /> <input id="correo" name="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
                  <label htmlFor="">Correo Recuperacion <br /> <input id="correoRecuperacion" name="correoRecuperacion" value={correoRecuperacion} onChange={(e) => setCorreoRecuperacion(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
                  <label htmlFor="">Contraseña <br /> <input id="contrasena" name="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
                </div>

                <div className="flex flex-col gap-8">
                  <label htmlFor="">Direccion <br /> <input id="direccion" name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
                  <label htmlFor="">Direccion <br /> <input id="puntoReferencia" name="puntoReferencia" value={puntoReferencia} onChange={(e) => setPuntoReferencia(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
                  <label htmlFor="">Numero telefonico <br /> <input id="numeroCelular" name="numeroCelular" value={numeroCelular} onChange={(e) => setNumeroCelular(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
                </div>
              </div>
            </div>
            <button className="bg-RosadoOcobo p-3 rounded-md">Aceptar Cambios</button>
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