import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="p-5 h-96 bg-cover bg-center bg-no-repeat sm:text-white bg-[url('src/assets/image/Lettering.jpeg')]">

            <div className="sticky top-10">

                <nav className="flex justify-between m-4">

                    <div className="text-center">

                        <h1 className="text-5xl font-bold">
                            <Link to={"/"}>
                                OCOBO
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