import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate} from "react-router-dom";
import Carrito from "/src/assets/icons/Carrito.png"
import Logo from "/src/assets/image/Logo.jpeg"
import Producto1 from "/src/assets/image/Producto1.jpeg"
import Swal from "sweetalert2";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Header = () => {

    const idColaborador = localStorage.getItem('idColaborador')

    const [nombre, setNombre] = useState("");
    const [todasFacturas, setTodasFacturas] = useState([]);
    const [todaslasPQRs, setTodaslasPQRs] = useState([]);

    const [MostrarHeader, setMostrarHeader] = useState (true);
    const [ultimoScrollY, setUltimoScrollY] = useState(0);
    const [desplegable, setDesplegable] = useState(false)

    useEffect (() => {
        const handlescroll = () => {
            const scrollY = window.scrollY;

        if (scrollY > ultimoScrollY) {
            setMostrarHeader(false);
        } else {
            setMostrarHeader(true);
        }

        setUltimoScrollY(scrollY);
        }

        window.addEventListener("scroll", handlescroll);

        return () => window.removeEventListener("scroll", handlescroll)
    }, [ultimoScrollY])

    const abrir = () => {
        setDesplegable(!desplegable)
    }

    const navigate = useNavigate();

    const cerrarSesion = async (e) => {
        e.preventDefault();
    
        Swal.fire({
          title: "¿Estas seguro?",
          text: "¿Deseas Cerrar Sesion?",
          icon: "warning",
          iconColor: "#F28B82",
          showCancelButton: true,
          confirmButtonColor: "#E96BA3",
          confirmButtonText: "¡Si, Cerrar Sesion!",
          confirmButtonColor: "#E96BA3",
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#3A3A3A",
          background: "#1C1C1C"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Vuelve pronto!",
              icon: "success",
              iconColor: "#E96BA3",
              confirmButtonColor: "#E96BA3",
              background: "#1C1C1C"
            });
            navigate("/")
          }
        });
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
                    setNombre(data.nombre); // Inicializar el nombre del usuario
                } else {
                    console.error("Datos de cliente no encontrados o inválidos.");
                }
            } catch (error) {
              console.error("Error al obtener los datos del cliente:", error);
            }
        };

        fetchClientData();
    }, []);

    const obtenerTodasLasFacturas = async (estadoFactura = "1") => {
        try {
            const response = await axios.post("http://localhost:8080/VerPedidos/", {
            action: "getFacturaPorClienteAdmin",
            estadoFactura: estadoFactura
            });
            console.log(response.data);
            setTodasFacturas(response.data.clientes || []);
        } catch (error) {
            console.error(error);
        }
    };

    const obtenerTodasLasPQR = async (idEstadoPQR = "2") => {
        try {
            const response = await axios.post("http://localhost:8080/PQRsAdmin/", {
            action: "obtenerPQRsNoLeidos",
            idEstadoPQR: idEstadoPQR
            });
            console.log(response.data);
            setTodaslasPQRs(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const leerTodasLasPQR = async () => {
        try {
            const response = await axios.post("http://localhost:8080/PQRsAdmin/", {
            action: "leerPQRs",
            });
            console.log(response.data);
            setTodaslasPQRs(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const [isOpenAccount, setIsOpenAccount] = useState(false)

    const [isOpenCart, setIsOpenCart] = useState(false)

    const [abrirProducto, setAbrirProducto] = useState(false)

    const abrirModal = () => {
        setAbrirProducto(!abrirProducto)
    }

    useEffect(() => {
        obtenerTodasLasFacturas();
        obtenerTodasLasPQR();
    }, []);

    return (
        <header>
            <div>
                <nav className={`flex items-center justify-between px-6 p-4 fixed top-0 right-0 left-0 transition-transform duration-300 bg-black z-50 ${MostrarHeader ? "translate-y-0" : "-translate-y-full"}`}>
                    <div className="group flex hover:bg-black" onMouseEnter={abrir} onMouseLeave={abrir}>
                        <p className="cursor-default text-sm lg:text-base">¡Hola! {nombre?.split(' ')[0]} <span className="text-xs">{desplegable ? "^" : "v"}</span><span className={todasFacturas.length >= 1 ? "animate-pulse bg-RosadoOcobo p-2 rounded-full absolute -mt-1 ml-2" : ""}></span></p>
                        <div className="fixed top-0 right-0 left-0 w-48 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 group-hover:transition-transform translate-y-14 group-hover:translate-y-16 ease-in-out duration-300">
                            <ul className="p-2">
                                <Link to={"/Colaboradores/Inicio/Cuenta"}>
                                    <li className="hover:bg-RosadoOcobo p-2 rounded cursor-pointer">Cuenta</li>
                                </Link>
                                <Link to={"/Colaboradores/Inicio/Historial"}>
                                    <li className="hover:bg-RosadoOcobo p-2 rounded cursor-pointer">Historial <span className={todasFacturas.length >= 1 ? "animate-pulse bg-white text-black text-textoPequeno p-2 rounded-full absolute ml-2" : ""}>{todasFacturas.length == 0 ? "" : todasFacturas.length}</span></li>
                                </Link>
                                <Link to={"/Colaboradores/Inicio/PQRs"}>
                                    <li className="hover:bg-RosadoOcobo p-2 rounded cursor-pointer" onClick={leerTodasLasPQR}>PQRs <span className={todaslasPQRs.length >= 1 ? "animate-pulse bg-white text-black text-textoPequeno p-2 rounded-full absolute ml-2" : ""}>{todaslasPQRs.length == 0 ? "" : todaslasPQRs.length}</span></li>
                                </Link>
                                <li onClick={cerrarSesion} className="hover:bg-RosadoOcobo p-2 rounded cursor-pointer">Cerrar sesion</li>
                            </ul>
                        </div>
                    </div>

                    <div className="absolute left-[46%] sm:left-[47%] md:left-[41%] cursor-default">
                        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold hidden md:inline">COLABORADOR</h1>
                        <img src={Logo} className="w-10 h-10 md:hidden" />
                    </div>


                    <Link onClick={() => abrirModal()} to={"/Colaboradores/Inicio/Agregar"}>
                        <span className="bg-RosadoOcobo rounded-full inline-flex justify-center items-center h-11 sm:h-11 md:h-12 lg:h-14 xl:h-16 2xl:h-16 w-11 sm:w-11 md:w-12 lg:w-14 xl:w-16 2xl:w-16">
                            +
                        </span>
                    </Link>
                </nav>

            </div>
            <div className="p-5 h-96 bg-cover bg-center bg-no-repeat text-white bg-[url('/src/assets/image/Lettering.jpeg')]">
            </div>
            
        </header>
        
    )
}

export default Header;