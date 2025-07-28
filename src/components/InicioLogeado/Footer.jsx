import Logo from "/src/assets/image/Logo.jpeg"

const Footer = ({obtenerProducto}) => {
    return (
        <footer className="p-5">
            <div className="flex justify-center relative">
                <div className="m-6">
                    <img className="sm:h-24 md:h-28 xl:h-40 2xl:h-40 sm:w-24 md:w-28 xl:w-40 2xl:w-40" src={Logo} alt="Logo" />
                    <p className="xl:text-xl 2xl:text-xl font-medium mt-8 text-center cursor-pointer">Sobre Ocobo</p>
                </div>
                <div className="w-0.5 h-72 bg-white xl:ml-10 2xl:ml-10 my-5"></div>
                <div className="flex m-6">

                    <div className="flex flex-col gap-8">
                        <div className="hover:text-RosadoOcobo duration-300">
                            <a href="https://www.facebook.com/share/15GyFs1qrd/" className="flex gap-3 relative">
                                <i className="fa-brands fa-facebook fa-3x"></i>
                                <p className="my-auto">Facebook</p>
                            </a>
                        </div>
                        <div className="hover:text-RosadoOcobo duration-300">
                            <a href="https://www.instagram.com/ocobo_band?igsh=dnM5dTJmNnk0bDB1" className="flex gap-3 relative">
                                <i className="fa-brands fa-instagram fa-3x"></i>
                                <p className="my-auto">Instagram</p>
                            </a>
                        </div>
                        <div className="hover:text-RosadoOcobo duration-300">
                            <a href="https://open.spotify.com/intl-es/artist/3VbShXDFGHSDp8BmH6v50u?si=OBAoDnh-REyTXPKT78lcxA" className="flex gap-3 relative">
                                <i className="fa-brands fa-spotify fa-3x"></i>
                                <p className="my-auto">Spotify</p>
                            </a>
                        </div>
                        <div className="hover:text-RosadoOcobo duration-300">
                            <a href="https://youtube.com/@ocobo_band?si=AQMrAhY4HAWW-ZE7" className="flex gap-3 relative">
                                <i className="fa-brands fa-youtube fa-3x"></i>
                                <p className="my-auto">Youtube</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-0.5 h-72 bg-white md:ml-20 xl:ml-52 2xl:ml-56 m-5"></div>
                <div>
                    <h1 className="text-2xl mt-6 font-medium">OCOBOSHOP</h1>
                    <div className="mt-5 flex flex-col gap-3">
                        <p className="hover:text-RosadoOcobo duration-300 cursor-pointer" onClick={() => obtenerProducto("1")}>Camisetas</p>
                        <p className="hover:text-RosadoOcobo duration-300 cursor-pointer"onClick={() => obtenerProducto("5")}>Chamarras</p>
                        <p className="hover:text-RosadoOcobo duration-300 cursor-pointer"onClick={() => obtenerProducto("6")}>Esqueletos</p>
                        <p className="hover:text-RosadoOcobo duration-300 cursor-pointer"onClick={() => obtenerProducto("3")}>Picks/Plumillas</p>
                        <p className="hover:text-RosadoOcobo duration-300 cursor-pointer"onClick={() => obtenerProducto("4")}>Accesorios</p>
                    </div>

                </div>
                <div className="w-0.5 h-72 bg-white md:ml-20 xl:ml-52 2xl:ml-56 m-5"></div>
                <div>
                    <h1 className="text-2xl mt-6 font-medium">AYUDA</h1>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
