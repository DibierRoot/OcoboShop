import ojito from "/src/assets/icons/IconOculto.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Main = ({addCliente}) => {

    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación del correo
        let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

        if (!correo.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Asegúrate de llenar el campo de correo!',
            });
            return;
        }

        if (!regexEmail.test(correo)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡El correo electrónico no es válido!',
            });
            return;
        }

        setCargando(true);

        try {
            const response = await axios.post('http://localhost:8080/RecuperarContrasena/', {
                action: "sendCode",
                correo
            });

            const { success, message } = response.data;

            Swal.fire({
                position: "center",
                icon: success ? "success" : "error",
                title: message,
                confirmButtonColor: "#E96BA3",
                background: "#1C1C1C",
                iconColor: "#E96BA3"
            });

            if (success) {
                navigate("/");
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Error en la solicitud!',
            });
        } finally {
            setCargando(false);
        }
    };

    const handleChange = (e) => {
        setCorreo(e.target.value);
    };

    return (
      <main className="pb-10">

        <form onSubmit={handleSubmit}>
          <div className="bg-NegroSuave relative max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-5xl items-center rounded-lg my-10 mx-auto flex flex-col gap-7 -mt-36 py-24">
            <h1 className="text-4xl">¡OLVIDE MI CONTRASEÑA!</h1>
            <p className="text-center">Escribe el correo electrónico con el que te registraste para recuperar tu cuenta y recibir las instrucciones para restablecerla.</p>
            <label htmlFor="correo">Correo Electronico <span className="text-RosadoOcobo">*</span> <br /> <input onChange={handleChange} id="correo" name="correo" value={correo} className="rounded-md h-9 text-black outline-none p-2" type="text" /></label>
            <button className="bg-RosadoOcobo p-3 rounded-md" disabled={cargando} >
              {cargando ? "Recuperando..." : "Recuperar"}
            </button>
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