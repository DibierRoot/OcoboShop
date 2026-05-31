import { useState, useEffect } from "react";
import Logo from "/src/assets/image/Logo.jpeg"
import { Link } from "react-router-dom";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Swal from "sweetalert2";
import axios from "axios";
import Lapiz from "/src/assets/icons/Lapiz.png"
import ojito from "/src/assets/icons/IconOculto.png";

const Main = () => {

      // Estados para manejar los valores de edición
    const [nombre, setNombre] = useState(""); // Para almacenar el nombre del usuario
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [numeroCelular, setNumeroCelular] = useState("");
    const [correoRecuperacion, setCorreoRecuperacion] = useState("");

    const idColaborador = localStorage.getItem('idColaborador')

      // Estados para habilitar y deshabilitar los campos de edición
    const [editNombre, setEditNombre] = useState(false); // Editar nombre
    const [editCorreo, setEditCorreo] = useState(false);
    const [editContrasena, setEditContrasena] = useState(false);
    const [editDireccion, setEditDireccion] = useState(false);
    const [editCorreoRecuperacion, setEditCorreoRecuperacion] = useState(false);
    const [editPuntoReferencia, setEditPuntoReferencia] = useState(false);
    const [editNumeroCelular, setEditNumeroCelular] = useState(false);

    const [verContrasena, setVerContrasena] = useState(false);

    const verOcultarContrasena = () => {
        setVerContrasena(!verContrasena);
    };

    const [cambiarContrasena, setCambiarContrasena] = useState(false)

    const abrirModal = () => {
        setCambiarContrasena(!cambiarContrasena)
    }

    // Obtener información del cliente al cargar el componente
    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch("http://localhost:8080/CRUDCOLABORADOR/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        action: "getColaborador",
                        idColaborador: idColaborador, // Cambia este valor por el ID correcto del cliente
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
                    setContrasena(data.contrasena || "") // Nunca mostramos la contraseña real
                    setNumeroCelular(data.numeroCelular || "");
                    setCorreoRecuperacion(data.correoRecuperacion || "")
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

      if (!correo.trim()) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Asegurate de llenar todos los campos!',
              iconColor: "#E96BA3",
              confirmButtonColor: "#E96BA3",
              background: "#1C1C1C"
          })
          return
      }

      if (!regexEmail.test(correo)) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡El correo electronico no es valido!',
              // footer: '<a href="">Why do I have this issue?</a>'
          })
          return
      }

      if (contrasena.length < 8) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡La contraseña debe tener como minimo 8 digitos!',
              iconColor: "#E96BA3",
              confirmButtonColor: "#E96BA3",
              background: "#1C1C1C"
          })
          return
        }

        try {
        const response = await axios.post("http://localhost:8080/CRUDCOLABORADOR/", {
            action: "edit",
            idColaborador, // Cambia por el ID correcto del cliente
            nombre, // Enviar nombre
            correo,
            numeroCelular,
            contrasena,
        });

        const mensajeRespuesta = response.data.message;
        console.log("error ", response.data);

        if (mensajeRespuesta === 'Datos actualizados correctamente') {
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
                    }). then(() => {
                          setCambiarContrasena(false);
                    })
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
            setEditNumeroCelular(false);
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
  }

    return (
      <main className="pb-10">

        <form onSubmit={click}>
          <div className="bg-NegroSuave relative max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-5xl items-center rounded-lg my-10 mx-auto flex flex-col gap-7 -mt-36 py-24">
            <div className="flex flex-col md:flex-row items-center gap-10 sm:gap-10 md:gap-16 lg:gap-24 xl:gap-52 2xl:gap-56">
              <div className="flex justify-center items-center flex-col">
                <img className="h-36 sm:h-52 w-36 sm:w-52 rounded-full" src={Logo} alt="" />
                <input id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="placeholder:text-2xl placeholder:text-center placeholder:text-white text-center text-white border-b-2 border-white h-10 p-2 mt-4 outline-none bg-NegroSuave" />
              </div>

              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col gap-8">
                  <label htmlFor="">Correo Electronico <br /> 
                    <input id="correo" name="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type="text" />
                  </label>

                  {/* <label htmlFor="">Correo Recuperacion <br />
                    <input id="correoRecuperacion" name="correoRecuperacion" value={correoRecuperacion} onChange={(e) => setCorreoRecuperacion(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type="text" />
                  </label> */}

                  <label className="relative" htmlFor="">Contraseña <br />
                    <input id="contrasena" name="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type="password" disabled />
                    <img className="absolute right-0 rounded-e-md top-6 h-9 w-9 cursor-pointer" src={Lapiz} alt="" onClick={() => abrirModal()} />
                  </label>
                </div>

                <div className="flex flex-col gap-8">
                  <label htmlFor="">Numero telefonico <br /> <input id="numeroCelular" name="numeroCelular" value={numeroCelular} onChange={(e) => setNumeroCelular(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
                </div>
              </div>
            </div>
            <button className="bg-RosadoOcobo p-3 rounded-md">Aceptar Cambios</button>
            <p className="absolute left-10 bottom-10 cursor-pointer hover:text-RosadoOcobo hover:duration-300">
              <Link to={"/Colaboradores/Inicio"}>
                ← Volver al Inicio
              </Link>
              </p>
          </div>

        <Modal className="fixed inset-0 z-50 flex items-center justify-center bg-Suavizado bg-opacity-50" isOpen={cambiarContrasena} centered>
          <ModalBody>
            <form onSubmit={click}>
              <div className="bg-NegroSuave text-white max-w-5xl w-full p-6 rounded-t-lg">
                <h1 className="text-3xl font-semibold pb-12">INGRESE SU NUEVA CONTRASEÑA</h1>
                <div className="items-center flex flex-col gap-11">
                  <div className="relative">
                    <label>Contraseña <span className="text-RosadoOcobo">*</span> <br /> <span> <img className="absolute right-1 mt-0.5 w-8" src={ojito} onClick={verOcultarContrasena} alt="" /></span> <input id="contrasena" name="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="rounded-md h-9 text-black outline-none p-2" type={verContrasena ? "text" : "password"} /></label>
                  </div>
                  <div>
                    <button className="bg-RosadoOcobo p-3 rounded-md">Continuar</button>
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <div className="bg-NegroSuave text-white max-w-5xl w-full p-6 rounded-b-lg">
              <p onClick={() => abrirModal()} className="cursor-pointer hover:text-RosadoOcobo hover:duration-300">
                  ← Atras
              </p>
            </div>
          </ModalFooter>
        </Modal>
          
        </form>

      </main>
    )
}

export default Main;