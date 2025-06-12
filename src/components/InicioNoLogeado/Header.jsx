import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Carrito from "/src/assets/icons/Carrito.png"
import ojito from "/src/assets/icons/IconOculto.png";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Header = ({login}) => {

  const navigate = useNavigate();

    const [cliente, setCliente] = useState({
        correo: "",
        contrasena: ""
    })

    const [mensaje, setMensaje] = useState('')

    const [verContrasena, setVerContrasena] = useState(false);

    const verOcultarContrasena = () => {
        setVerContrasena(!verContrasena);
    };

    const [cargando, setCargando] = useState(false);

    const {correo, contrasena} = cliente;

    const [isOpenAccount, setIsOpenAccount] = useState(false)

    const [isOpenCart, setIsOpenCart] = useState(false)

        const click = async (e) => {
        e.preventDefault()

        let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

        if (!correo.trim() || !contrasena.trim()) {
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
          
        setCargando(true);

        login({
            ...cliente,
        })

        try {
            const response = await axios.post('http://localhost/OcoboBack-end/CRUD/', {
                action: "login",
                correo,
                contrasena
            });
            const mensajeRespuesta = response.data.message;
            setMensaje(mensajeRespuesta)
            console.log(response.data)
            const id = response.data.idCliente;

            if (mensajeRespuesta === 'Login exitoso') {
                localStorage.setItem("idCliente", id)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Login exitoso',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/Inicio")
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Error!',
                iconColor: "#E96BA3",
                confirmButtonColor: "#E96BA3",
                background: "#1C1C1C"
            });
        } finally {
            setCargando(false);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target

            setCliente({
                ...cliente,
            [name]: value
            })
    }

    return (
        <header>
            <div className="p-4 relative">

                <nav>

                    <p className="cursor-pointer mt-4 absolute ml-6" onClick={() => setIsOpenAccount(true)}>Cuenta</p>

                    <h1 className="text-5xl my-auto text-center font-bold">OCOBO</h1>


                        <div className="absolute -mt-14 right-3 flex mr-6 gap-7">
                            <input className="text-white border-b-2 border-white h-10 p-2 mt-4 outline-none bg-black" placeholder="Buscar..." type="text" name="" id="" />
                            <span onClick={() => setIsOpenCart(true)}><img className="h-16 w-16" src={Carrito} alt="Carrito" /></span>
                        </div>


                        {/* <a>ABOUT</a> */}


                </nav>

            </div>
            <div className="p-5 h-96 bg-cover bg-center bg-no-repeat text-white bg-[url('/src/assets/image/Lettering.jpeg')]">
                <div className={`fixed bg-Suavizado w-full h-dvh top-0 left-0 transition-all duration-500 ${!isOpenAccount && "invisible"}`}>
                    <form onSubmit={click}>
                        <div className={`w-full bg-black max-w-96 h-dvh relative transition-all duration-500 p-8 ${isOpenAccount ? "w-80" : "w-0"}`}>
                            <label onClick={() => setIsOpenAccount(false)} htmlFor="" className="absolute right-10 cursor-pointer text-xl font-bold">x</label>
                            <div className="mt-8">
                                <label htmlFor="">Correo Electronico <span className="text-RosadoOcobo">*</span> <br /><input id="correo" name="correo" value={correo} onChange={handleChange} className="rounded-md h-9 w-full text-black outline-none p-2" type="text" /></label> <br /> <br />
                                <label htmlFor="">Contraseña <span className="text-RosadoOcobo">*</span>  <br /> <span><img className="absolute right-10 w-8" src={ojito} onClick={verOcultarContrasena} alt="" /></span> <input id="contrasena" name="contrasena" value={contrasena} onChange={handleChange} className="rounded-md h-9 w-full text-black outline-none p-2" type={verContrasena ? "text" : "password"} /></label>
                                
                                <div className="mt-4 flex flex-col gap-3">
                                    <button className="bg-RosadoOcobo p-3 rounded-md">Iniciar Sesion</button>
                                        <Link className="bg-NegroSuave p-3 rounded-md text-center" to={"/Registro"}>
                                            Crear Cuenta
                                        </Link>
                                        <Link className="text-center cursor-pointer hover:text-RosadoOcobo hover:underline" to={"/olvidemicontrasena"}>
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                </div>
                            </div>
                            <div className="absolute flex gap-8 bottom-10 mx-auto">
                                <a href="https://www.facebook.com/share/15GyFs1qrd/" className=""><i className="fa-brands fa-facebook fa-3x"></i></a>
                                <a href="https://www.instagram.com/ocobo_band?igsh=dnM5dTJmNnk0bDB1" className="instagram"><i className="fa-brands fa-instagram fa-3x"></i></a>
                                <a href="https://open.spotify.com/intl-es/artist/3VbShXDFGHSDp8BmH6v50u?si=OBAoDnh-REyTXPKT78lcxA" className=""><i className="fa-brands fa-spotify fa-3x"></i></a>
                                <a href="https://youtube.com/@ocobo_band?si=AQMrAhY4HAWW-ZE7" className=""><i className="fa-brands fa-youtube fa-3x"></i></a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                <div className={`fixed bg-Suavizado w-full h-dvh top-0 left-0 transition-all duration-500 ${!isOpenCart && "invisible"}`}>
                    <div className={`w-full bg-black max-w-96 h-dvh ml-auto relative transition-all duration-500 p-8 ${isOpenCart ? "w-80" : "w-0"}`}>
                        <h1 className="absolute left-10 cursor-pointer text-xl font-bold">Carrito</h1>
                        <label onClick={() => setIsOpenCart(false)} htmlFor="" className="absolute right-10 cursor-pointer text-xl font-bold">x</label>
                        <div className="mt-80">
                            <div className="flex flex-col gap-3">
                                <p className="text-center">¡No hay nada aqui!</p>
                                <button onClick={() => setIsOpenCart(false)} className="bg-RosadoOcobo p-3 rounded-md">Empezar a comprar</button>
                            </div>
                        </div>
                    </div>
                </div>            
        </header>
        
    )
}

export default Header;