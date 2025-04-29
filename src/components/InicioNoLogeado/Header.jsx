import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Carrito from "/src/assets/icons/Carrito.png"

const Header = () => {

    const [isOpenAccount, setIsOpenAccount] = useState(false)

    const [isOpenCart, setIsOpenCart] = useState(false)

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
                    <div className={`w-full bg-black max-w-96 h-dvh relative transition-all duration-500 p-8 ${isOpenAccount ? "w-80" : "w-0"}`}>
                        <label onClick={() => setIsOpenAccount(false)} htmlFor="" className="absolute right-10 cursor-pointer text-xl font-bold">x</label>
                        <div className="mt-8">
                            <label htmlFor="">Correo Electronico <span className="text-RosadoOcobo">*</span> <br /><input className="rounded-md h-9 w-full text-black outline-none p-2" type="text" /></label> <br /> <br />
                            <label htmlFor="">Contraseña <span className="text-RosadoOcobo">*</span> <br /><input className="rounded-md h-9 w-full text-black outline-none p-2" type="text" /></label>
                            <div className="mt-4 flex flex-col gap-3">
                                <button className="bg-RosadoOcobo p-3 rounded-md">Iniciar Sesion</button>
                                    <Link className="bg-NegroSuave p-3 rounded-md text-center" to={"/Registro"}>
                                        Crear Cuenta
                                    </Link>
                                <p className="text-center cursor-pointer hover:text-RosadoOcobo hover:underline">¿Olvidaste tu contraseña?</p>
                            </div>
                        </div>
                        <div className="absolute flex gap-8 bottom-10 mx-auto">
                            <a href="https://www.facebook.com/share/15GyFs1qrd/" className=""><i className="fa-brands fa-facebook fa-3x"></i></a>
                            <a href="https://www.instagram.com/ocobo_band?igsh=dnM5dTJmNnk0bDB1" className="instagram"><i className="fa-brands fa-instagram fa-3x"></i></a>
                            <a href="https://open.spotify.com/intl-es/artist/3VbShXDFGHSDp8BmH6v50u?si=OBAoDnh-REyTXPKT78lcxA" className=""><i className="fa-brands fa-spotify fa-3x"></i></a>
                            <a href="https://youtube.com/@ocobo_band?si=AQMrAhY4HAWW-ZE7" className=""><i className="fa-brands fa-youtube fa-3x"></i></a>
                        </div>
                    </div>
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