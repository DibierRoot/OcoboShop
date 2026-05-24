import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="p-5 h-64 sm:h-80 md:h-96 bg-cover bg-center bg-no-repeat text-white bg-[url('/src/assets/image/Lettering.jpeg')]">

            <div className="top-10">

                <nav className="flex justify-between m-4">

                    <div className="text-center">

                        <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
                            <Link to={"/Inicio/Productos"}>
                                Cuenta
                            </Link>
                        </h1>

                        {/* <a>ABOUT</a> */}

                    </div>

                </nav>

            </div>

        </header>
    )
}

export default Header;