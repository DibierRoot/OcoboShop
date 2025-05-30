import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link, useNavigate} from "react-router-dom";
import Carrito from "/src/assets/icons/Carrito.png"
import Logo from "/src/assets/image/Logo.jpeg"
import Producto1 from "/src/assets/image/Producto1.jpeg"
import Swal from "sweetalert2";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Header = () => {

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

    const [isOpenAccount, setIsOpenAccount] = useState(false)

    const [isOpenCart, setIsOpenCart] = useState(false)

    return (
        <header>
            <div className="p-4 relative">

                <nav>
                    <div className="ml-2 flex absolute hover:bg-black transition-all duration-500">
                        <img className="h-12 w-12" src={Logo} alt="" />
                        <p className="cursor-default mt-4 ml-6">¡Hola! Cristian <span className="text-xs">V</span></p>
                        <div className="absolute left-0 ml-10 w-48 mt-10 bg-black text-white rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <ul className="p-2">
                                <Link to={"/Inicio/Cuenta"}>
                                    <li className="hover:bg-RosadoOcobo p-2 rounded cursor-pointer">Cuenta</li>
                                </Link>
                                <li className="hover:bg-RosadoOcobo p-2 rounded cursor-pointer">Historial</li>
                                <li onClick={cerrarSesion} className="hover:bg-RosadoOcobo p-2 rounded cursor-pointer">Cerrar sesion</li>
                            </ul>
                        </div>
                    </div>

                    <h1 className="text-5xl my-auto text-center font-bold">OCOBO</h1>


                        <div className="absolute -mt-14 right-3 flex mr-6 gap-7">
                            <input className="text-white border-b-2 border-white h-10 p-2 mt-4 outline-none bg-black" placeholder="Buscar..." type="text" name="" id="" />
                            <span onClick={() => setIsOpenCart(true)}><img className="h-16 w-16" src={Carrito} alt="Carrito" /></span>
                        </div>


                        {/* <a>ABOUT</a> */}


                </nav>

            </div>
            <div className="p-5 h-96 bg-cover bg-center bg-no-repeat text-white bg-[url('/src/assets/image/Lettering.jpeg')]">
            </div>
                <div className={`fixed z-50 bg-Suavizado w-full h-dvh top-0 left-0 transition-all duration-500 ${!isOpenCart && "invisible"}`}>
                    <div className={`bg-black w-1/3 h-dvh ml-auto relative transition-all duration-500 p-8 ${isOpenCart ? "w-80" : "w-0"}`}>
                        <h1 className="absolute left-10 cursor-pointer text-xl font-bold">Carrito</h1>
                        <label onClick={() => setIsOpenCart(false)} htmlFor="" className="absolute right-10 cursor-pointer text-xl font-bold">x</label>
                        <div className="mt-10 overflow-y-auto h-[calc(100vh-64px)]">
                            <section className="flex flex-col gap-7">
                                <item className="flex mt-3">
                                    <img className="h-48 w-32 " src={Producto1} alt="ImagenProducto" />
                                    <div className="ml-3">
                                        <h1 className="mt-2 text-2xl">Camiseta 1</h1>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe sapiente doloribus, fugiat non eos nulla quod pariatur quis vitae nam facilis ab, dolores nemo architecto in hic nobis porro.</p>
                                        <p className="mt-2">Talla: </p>
                                        <p className="mt-2 text-xl">50.000</p>
                                    </div>
                                </item>
                                <hr className="border-dashed" />
                                <item className="flex mt-3">
                                    <img className="h-48 w-32 " src={Producto1} alt="ImagenProducto" />
                                    <div className="ml-3">
                                        <h1 className="mt-2  text-2xl">Camiseta 2</h1>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe sapiente doloribus, fugiat non eos nulla quod pariatur quis vitae nam facilis ab, dolores nemo architecto in hic nobis porro.</p>
                                        <p className="mt-2">Talla</p>
                                        <p className="mt-2 text-xl">70.000</p>                                    
                                    </div>
                                </item>
                                <hr className="border-dashed" />
                                <item className="flex mt-3">
                                    <img className="h-48 w-32 " src={Producto1} alt="ImagenProducto" />
                                    <div className="ml-3">
                                        <h1 className="mt-2  text-2xl">Camiseta 2</h1>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe sapiente doloribus, fugiat non eos nulla quod pariatur quis vitae nam facilis ab, dolores nemo architecto in hic nobis porro.</p>
                                        <p className="mt-2">Talla</p>
                                        <p className="mt-2 text-xl">70.000</p>                                    
                                    </div>
                                </item>
                                <hr className="border-dashed" />
                                <item className="flex mt-3">
                                    <img className="h-48 w-32 " src={Producto1} alt="ImagenProducto" />
                                    <div className="ml-3">
                                        <h1 className="mt-2  text-2xl">Camiseta 2</h1>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe sapiente doloribus, fugiat non eos nulla quod pariatur quis vitae nam facilis ab, dolores nemo architecto in hic nobis porro.</p>
                                        <p className="mt-2">Talla</p>
                                        <p className="mt-2 text-xl">70.000</p>                                    
                                    </div>
                                </item>
                                <hr className="border-dashed" />
                            </section>
                            {/* <p className="text-center">¡No hay nada aqui!</p>
                            <button onClick={() => setIsOpenCart(false)} className="bg-RosadoOcobo p-3 rounded-md">Empezar a comprar</button> */}
                        </div>
                    </div>
                </div>
            
        </header>
        
    )
}

export default Header;