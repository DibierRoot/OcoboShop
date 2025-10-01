import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate} from "react-router-dom";
import Carrito from "/src/assets/icons/Carrito.png"
import Logo from "/src/assets/image/Logo.jpeg"
import Swal from "sweetalert2";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ItemsCarrito from "./ItemsCarrito";

const Header = () => {

    const idCliente = localStorage.getItem('idCliente')
    const [nombre, setNombre] = useState(""); // Para almacenar el nombre del usuario

    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [productosEnCarrito, setProductosEnCarrito] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [desplegable, setDesplegable] = useState(false)
    const productosEnCarritoMemo = useMemo(() => productosEnCarrito, [productosEnCarrito]);

    const [MostrarHeader, setMostrarHeader] = useState (true);
    const [ultimoScrollY, setUltimoScrollY] = useState(0);

    const abrir = () => {
        setDesplegable(!desplegable)
    }

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
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#3A3A3A",
            background: "#1C1C1C"
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                title: "¡Session Cerrada!",
                text: "Vuelve pronto!",
                icon: "success",
                iconColor: "#E96BA3",
                confirmButtonColor: "#E96BA3",
                background: "#1C1C1C"
            });
            // Eliminamos el contenido del localStorage
            localStorage.clear();
            navigate("/")
            }
        });
    }


    const totalProductos = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0); // Total de productos
    const precioTotal = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0); // Precio total

    const procederCompra = () => {
        if (productosEnCarrito.length === 0) {
          mostrarMensaje(
            "Carrito vacío",
            "No puedes proceder sin productos en el carrito.",
            "error"
          );
          return;
        }

        navigate("/Inicio/Productos/Compra", {
          state: {
            productos: productosEnCarrito,
            precioTotal,
          },
        });
    }
    const [isOpenCart, setIsOpenCart] = useState(false)

    useEffect(() => {
        if (isOpenCart) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        }
    }, [isOpenCart])

    if (!open) return null;

    return (
        <header>
            <div>

                <nav className={`flex items-center justify-between px-6 p-4 fixed top-0 right-0 left-0 transition-transform duration-300 bg-black z-50 ${MostrarHeader ? "translate-y-0" : "-translate-y-full"}`}>
                    <div className="group flex hover:bg-black" onMouseEnter={abrir} onMouseLeave={abrir}>
                        <p className="cursor-default text-sm lg:text-base">¡Hola! {nombre?.split(' ')[0]} <span className="text-xs">{desplegable ? "^" : "v"}</span></p>
                        <div className="fixed top-0 right-0 left-0 w-48 bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 group-hover:transition-transform translate-y-14 group-hover:translate-y-16 ease-in-out duration-300">
                            <ul className="p-2">
                                <Link to={"/Inicio/Cuenta"}>
                                    <li className="hover:bg-RosadoOcobo p-2 rounded cursor-pointer">Cuenta</li>
                                </Link>
                                <Link to={"/Inicio/HistorialdeCompras"}>
                                    <li className="hover:bg-RosadoOcobo p-2 rounded cursor-pointer">Historial</li>
                                </Link>
                                <li onClick={cerrarSesion} className="hover:bg-RosadoOcobo p-2 rounded cursor-pointer">Cerrar sesion</li>
                            </ul>
                        </div>
                    </div>

                    <h1 className="cursor-default text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold">OCOBO</h1>


                        <div onClick={() => setIsOpenCart(true)}>
                            <img className="h-11 sm:h-11 md:h-12 lg:h-14 xl:h-16 2xl:h-16 w-11 sm:w-11 md:w-12 lg:w-14 xl:w-16 2xl:w-16" src={Carrito} alt="Carrito" />
                        </div>


                        {/* <a>ABOUT</a> */}


                </nav>

            </div>
            <div className="p-5 h-96 bg-cover bg-center bg-no-repeat text-white bg-[url('/src/assets/image/Lettering.jpeg')]">
            </div>
                <div className={`fixed z-50 bg-Suavizado w-full h-dvh top-0 left-0 transition-all duration-500 ${!isOpenCart && "invisible"}`}>
                    <div className={`bg-black h-dvh ml-auto fixed top-0 left-0 right-0 transition-transform duration-300 ease-in-out sm:carrito p-8 ${isOpenCart ? "translate-x-0" : "translate-x-full"}`}>
                        <h1 className="absolute left-10 cursor-pointer text-xl font-bold">Carrito</h1>
                        <label onClick={() => setIsOpenCart(false)} htmlFor="" className="absolute right-10 cursor-pointer text-xl font-bold">x</label>
                        <div className="mt-10 overflow-y-auto h-[calc(100vh-64px)]">
                            <section className="flex flex-col gap-7">
                                {!productosEnCarrito.length ?
                                <div className="mt-80">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-center">¡No hay nada aqui!</p>
                                        <button onClick={() => setIsOpenCart(false)} className="bg-RosadoOcobo p-3 rounded-md">Empezar a comprar</button>
                                    </div>
                                </div>

                                :
                                
                                productosEnCarritoMemo.map ((producto) => (
                                    <ItemsCarrito key={producto.id} productosSeleccionados={productosSeleccionados} setProductosSeleccionados={setProductosSeleccionados} productosEnCarrito={productosEnCarrito} setProductosEnCarrito={setProductosEnCarrito} producto={producto} />
                                ))}

                            </section>

                            <div className={!productosEnCarrito.length ? "hidden" : "my-10 flex flex-col sm:flex-row gap-5"}>
                                <button className="bg-RosadoOcobo rounded-md p-3" onClick={procederCompra}>Comprar</button>
                                <button className="border-2 bg-NegroSuave rounded-md p-3" type="button" onClick={eliminarSeleccionados}>Eliminar Seleccionados</button>
                                <button className="border-2 bg-black rounded-md p-3" type="button" onClick={borrarTodoCarrito}>Eliminar Todo</button>
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