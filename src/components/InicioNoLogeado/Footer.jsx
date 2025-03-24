import Logo from "/src/assets/image/Logo.jpeg"

const Footer = () => {
    return (
        <footer className="p-5">
            <div className="flex justify-center relative">
                <div className="m-6">
                    <img className="h-40 w-40" src={Logo} alt="Logo" />
                    <p className="text-xl font-medium mt-8 text-center cursor-pointer">Sobre Ocobo</p>
                </div>
                <div className="w-0.5 h-72 bg-white ml-10 m-5"></div>
                <div className="flex m-6">

                    <div className="flex flex-col gap-8">
                        <div>
                            <a href="https://www.facebook.com/share/15GyFs1qrd/" className="flex gap-3 relative">
                                <i className="fa-brands fa-facebook fa-3x"></i>
                                <p className="my-auto">Facebook</p>
                            </a>
                        </div>
                        <div>
                            <a href="https://www.instagram.com/ocobo_band?igsh=dnM5dTJmNnk0bDB1" className="flex gap-3 relative">
                                <i className="fa-brands fa-instagram fa-3x"></i>
                                <p className="my-auto">Instagram</p>
                            </a>
                        </div>
                        <div>
                            <a href="https://open.spotify.com/intl-es/artist/3VbShXDFGHSDp8BmH6v50u?si=OBAoDnh-REyTXPKT78lcxA" className="flex gap-3 relative">
                                <i className="fa-brands fa-spotify fa-3x"></i>
                                <p className="my-auto">Spotify</p>
                            </a>
                        </div>
                        <div>
                            <a href="https://youtube.com/@ocobo_band?si=AQMrAhY4HAWW-ZE7" className="flex gap-3 relative">
                                <i className="fa-brands fa-youtube fa-3x"></i>
                                <p className="my-auto">Youtube</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-0.5 h-72 bg-white ml-60 m-5"></div>
                <div>
                    <h1 className="text-2xl mt-6 font-medium">OCOBOSHOP</h1>
                    <div className="mt-5 flex flex-col gap-3">
                        <p>Camisetas</p>
                        <p>Chamarras</p>
                        <p>Esqueletos</p>
                        <p>Puas</p>
                    </div>

                </div>
                <div className="w-0.5 h-72 bg-white ml-60 m-5"></div>
                <div>
                    <h1 className="text-2xl mt-6 font-medium">AYUDA</h1>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
