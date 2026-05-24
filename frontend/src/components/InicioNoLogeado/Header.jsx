import { useState, useEffect, useMemo, useCallback } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Carrito from "/src/assets/icons/Carrito.png"
import ojito from "/src/assets/icons/IconOculto.png";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import ItemsCarrito from "./ItemsCarrito";

const Header = ({login}) => {

  const navigate = useNavigate();

    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [productosEnCarrito, setProductosEnCarrito] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const productosEnCarritoMemo = useMemo(() => productosEnCarrito, [productosEnCarrito]);

    const [MostrarHeader, setMostrarHeader] = useState (true);
    const [ultimoScrollY, setUltimoScrollY] = useState(0);



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

    useEffect(() => {
        if (isOpenAccount || isOpenCart) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        }
    }, [isOpenAccount, isOpenCart])

    if (!open) return null;

    const borrarTodoCarrito = () => {
        Swal.fire({
          title: "¿Estas seguro?",
          text: "¡Se Eliminara Todo lo que Hay en el Carrito de Compras!",
          icon: "warning",
          iconColor: "#F28B82",
          showCancelButton: true,
          confirmButtonColor: "#E96BA3",
          confirmButtonText: "¡Si, Eliminar Todo!",
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#3A3A3A",
          background: "#1C1C1C"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "¡Productos Eliminados con Exito!",
              icon: "success",
              iconColor: "#E96BA3",
              confirmButtonColor: "#E96BA3",
              background: "#1C1C1C"
            });
            // Eliminamos el contenido del carrito en el localStorage
            setProductosEnCarrito([]);
            setProductoSeleccionado(null);
            localStorage.removeItem("carrito");
          }
        });
    };

    const eliminarSeleccionados = useCallback(() => {
        const carritoActualizado = productosEnCarrito.filter(
            (producto) => !productosSeleccionados.includes(producto.id)
        );
        setProductosEnCarrito(carritoActualizado);
        setProductosSeleccionados([]);
        localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
        mostrarMensaje("Productos eliminados correctamente");
    }, [productosEnCarrito, productosSeleccionados]);
    
        const editarProducto = (producto) => {
            setProductoSeleccionado(producto);
            setCantidad(producto.cantidad);
        };
    
        const disminuirCantidad = () => {
            if (productoSeleccionado && cantidad > 1) {
            setCantidad(cantidad - 1);
            }
        };
    
    const manejarCarrito = () => {
        if (!productoSeleccionado) {
        mostrarMensaje("Producto no seleccionado", "Por favor selecciona un producto antes de agregarlo al carrito.", "error");
        return;
        }
    
        const carritoExistente = [...productosEnCarrito];

        const productoExistente = carritoExistente.find(
        (item) => item.id === productoSeleccionado.id
        );
    
        if (productoExistente) {
        if (productoExistente.cantidad + cantidad > productoSeleccionado.cantidadMaxima) {
            mostrarMensaje("Cantidad excedida", 'No puedes agregar más de ${productoSeleccionado.cantidadMaxima} unidades.', "error");
            return;
        }
        productoExistente.cantidad += cantidad;
        } else {
        carritoExistente.push({ ...productoSeleccionado, cantidad });
        }
    
        setProductosEnCarrito(carritoExistente);
        localStorage.setItem("carrito", JSON.stringify(carritoExistente));
        mostrarMensaje("Producto agregado exitosamente");
    
            setProductoSeleccionado(null);
    };
    
    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
        setProductosEnCarrito(carritoGuardado);
    }, []);
    
    useEffect(() => {
        if (productosEnCarrito.length > 0) {
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
        }
    }, [productosEnCarrito]);

    useEffect(() => {
        const syncCarritoConLocalStorage = () => {
            const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
            
            // Solo actualiza si hay cambios reales
            if (JSON.stringify(carritoLocal) !== JSON.stringify(productosEnCarrito)) {
                setProductosEnCarrito(carritoLocal);
            }
        };

        // Revisa cambios cada segundo (ajusta si es necesario)
        const intervalId = setInterval(syncCarritoConLocalStorage, 1000);

        // Escucha cambios en otras pestañas
        const handleStorageChange = (event) => {
            if (event.key === "carrito") {
                syncCarritoConLocalStorage();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [productosEnCarrito]);

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
            const response = await axios.post('http://localhost:8080/CRUD/', {
                action: "login",
                correo,
                contrasena
            });
            const mensajeRespuesta = response.data.message;
            setMensaje(mensajeRespuesta)
            console.log("Aqui el error", response.data);
            console.log("Aqui el error");
            // console.log(response.data)
            const id = response.data.idCliente;

            if (mensajeRespuesta === 'Login exitoso') {
                localStorage.setItem("idCliente", id)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Login exitoso',
                    showConfirmButton: false,
                    timer: 1500,
                    iconColor: "#E96BA3",
                    confirmButtonColor: "#E96BA3",
                    background: "#1C1C1C"
                });
                navigate("/Inicio/Productos")
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
            <div className="p-4">

                    <nav className={`flex items-center justify-between px-6 p-4 fixed top-0 right-0 left-0 transition-transform duration-300 bg-black z-30 ${MostrarHeader ? "translate-y-0" : "-translate-y-full"}`}>


                    <p className="cursor-pointer hover:text-RosadoOcobo duration-300" onClick={() => setIsOpenAccount(true)}>Cuenta</p>

                    <h1 className="cursor-default text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-center font-bold">OCOBO</h1>


                        <div className="" onClick={() => setIsOpenCart(true)}>
                            <img className="h-11 sm:h-11 md:h-12 lg:h-14 xl:h-16 2xl:h-16 w-11 sm:w-11 md:w-12 lg:w-14 xl:w-16 2xl:w-16" src={Carrito} alt="Carrito" />
                        </div>


                        {/* <a>ABOUT</a> */}


                </nav>

            </div>
            <div className="p-5 h-64 sm:h-80 md:h-96 bg-cover bg-center bg-no-repeat text-white bg-[url('/src/assets/image/Lettering.jpeg')]">
                <div className={`fixed z-50 bg-Suavizado ml-auto w-full h-dvh top-0 left-0 transition-all duration-300 ${!isOpenAccount && "invisible"}`}>
                    <form onSubmit={click}>
                        <div className={`bg-black z-50 h-dvh fixed left-0 right-0 top-0 transition-transform duration-300 ease-in-out sm:cuenta p-8 ${isOpenAccount ? "translate-x-0" : "-translate-x-full"}`}>
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
                                <p className="text-center mt-2 text-RosadoOcobo">{mensaje}</p>
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
                <div className={`fixed z-50 bg-Suavizado w-full h-dvh top-0 left-0 transition-all duration-300 ${!isOpenCart && "invisible"}`}>
                    <div className={`bg-black h-dvh ml-auto fixed top-0 left-0 right-0 transition-transform duration-300 ease-in-out sm:carrito p-8 ${isOpenCart ? "translate-x-0" : "translate-x-full"}`}>
                        <h1 className="absolute left-10 cursor-pointer text-xl font-bold">Carrito</h1>
                        <label onClick={() => setIsOpenCart(false)} htmlFor="" className="absolute right-10 cursor-pointer text-xl font-bold">x</label>
                        <div className={!productosEnCarrito.length ? "mt-10" : "mt-10 overflow-y-auto h-[calc(100vh-64px)]"}>
                            <section className="flex flex-col gap-7">
                                {!productosEnCarrito.length ?
                                <div className="flex justify-center items-center h-screen">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-center">¡No hay nada aqui!</p>
                                        <button onClick={() => setIsOpenCart(false)} className="bg-RosadoOcobo p-3 rounded-md">Empezar a Comprar</button>
                                    </div>
                                </div>

                                :
                                
                                productosEnCarritoMemo.map ((producto) => (
                                    <ItemsCarrito key={producto.id} productosSeleccionados={productosSeleccionados} setProductosSeleccionados={setProductosSeleccionados} productosEnCarrito={productosEnCarrito} setProductosEnCarrito={setProductosEnCarrito} producto={producto} />
                                ))}

                            </section>

                            <div className={!productosEnCarrito.length ? "hidden" : "my-10 flex flex-col sm:flex-row gap-5"}>
                                <button className="bg-RosadoOcobo rounded-md p-3" onClick={() => {setIsOpenAccount(true); setIsOpenCart(false)}}>Comprar</button>
                                <button className="border-2 bg-NegroSuave hover:bg-RosadoOcobo duration-500 transition-all ease-in-out rounded-md p-3" type="button" onClick={eliminarSeleccionados}>Eliminar Seleccionados</button>
                                <button className="border-2 bg-black hover:bg-RosadoOcobo duration-500 transition-all ease-in-out rounded-md p-3" type="button" onClick={borrarTodoCarrito}>Borrar Todo</button>
                            </div>

                            {/* <p className="text-center">¡No hay nada aqui!</p>
                            <button onClick={() => setIsOpenCart(false)} className="bg-RosadoOcobo p-3 rounded-md">Empezar a comprar</button> */}
                        </div>
                    </div>
                </div>
        </header>
        
    )
}

export default Header;