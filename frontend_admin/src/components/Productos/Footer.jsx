import Logo from "/src/assets/image/Logo.jpeg"
import { Link } from "react-router-dom";

const Footer = ({obtenerProducto}) => {
    return (
        <footer className="p-5">
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start relative">
                <div className="flex">
                    <div className="m-6">
                        <img className="h-20 sm:h-24 md:h-28 2xl:h-40 w-20 sm:w-24 md:w-28 2xl:w-40" src={Logo} alt="Logo" />
                        <p className="xl:text-xl 2xl:text-xl font-medium mt-8 text-center cursor-pointer">Sobre Ocobo</p>
                    </div>
                    <div className="w-0.5 h-72 bg-white xl:ml-10 2xl:ml-10 my-5"></div>
                    <div className="flex m-6">

                        <div className="flex flex-col gap-5">
                            <h1 className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl font-medium">Redes Sociales</h1>
                            <div className="hover:text-RosadoOcobo duration-300">
                                <a href="https://www.facebook.com/share/15GyFs1qrd/" className="flex gap-3 relative">
                                    <i className="fa-brands fa-facebook text-2xl sm:text-2xl md:text-3xl xl:text-5xl 2xl:text-5xl"></i>
                                    <p className="my-auto">Facebook</p>
                                </a>
                            </div>
                            <div className="hover:text-RosadoOcobo duration-300">
                                <a href="https://www.instagram.com/ocobo_band?igsh=dnM5dTJmNnk0bDB1" className="flex gap-3 relative">
                                    <i className="fa-brands fa-instagram text-2xl sm:text-2xl md:text-3xl xl:text-5xl 2xl:text-5xl"></i>
                                    <p className="my-auto">Instagram</p>
                                </a>
                            </div>
                            <div className="hover:text-RosadoOcobo duration-300">
                                <a href="https://open.spotify.com/intl-es/artist/3VbShXDFGHSDp8BmH6v50u?si=OBAoDnh-REyTXPKT78lcxA" className="flex gap-3 relative">
                                    <i className="fa-brands fa-spotify text-2xl sm:text-2xl md:text-3xl xl:text-5xl 2xl:text-5xl"></i>
                                    <p className="my-auto">Spotify</p>
                                </a>
                            </div>
                            <div className="hover:text-RosadoOcobo duration-300">
                                <a href="https://youtube.com/@ocobo_band?si=AQMrAhY4HAWW-ZE7" className="flex gap-3 relative">
                                    <i className="fa-brands fa-youtube text-2xl sm:text-2xl md:text-3xl xl:text-5xl 2xl:text-5xl"></i>
                                    <p className="my-auto">Youtube</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="hidden md:block w-0.5 h-72 bg-white md:ml-20 2xl:ml-56 md:m-5"></div>
                    <div>
                        <h1 className="text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl mt-6 font-medium">OCOBOSHOP</h1>
                        <div className="mt-5 flex flex-col gap-3">
                            <p className="hover:text-RosadoOcobo duration-300 cursor-pointer" onClick={() => obtenerProducto("1")}>Camisetas</p>
                            <p className="hover:text-RosadoOcobo duration-300 cursor-pointer"onClick={() => obtenerProducto("5")}>Chamarras</p>
                            <p className="hover:text-RosadoOcobo duration-300 cursor-pointer"onClick={() => obtenerProducto("6")}>Esqueletos</p>
                            <p className="hover:text-RosadoOcobo duration-300 cursor-pointer"onClick={() => obtenerProducto("3")}>Picks/Plumillas</p>
                            <p className="hover:text-RosadoOcobo duration-300 cursor-pointer"onClick={() => obtenerProducto("4")}>Accesorios</p>
                        </div>

                    </div>
                    <div className="w-0.5 h-72 bg-white md:ml-20 2xl:ml-56 m-5"></div>
                    <div>
                        <h1 className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl mt-6 font-medium">AYUDA</h1>
                        <div className="mt-5 flex flex-col gap-3">
                            <Link to={"/Inicio/MetodosDePago"}>
                                <p className="hover:text-RosadoOcobo duration-300 cursor-pointer">Metodo de Pago</p>                            
                            </Link>
                            <p className="hover:text-RosadoOcobo duration-300 cursor-pointer">Contacto</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
