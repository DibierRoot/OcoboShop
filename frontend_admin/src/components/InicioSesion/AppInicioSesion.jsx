import Header from "./Header.jsx"
import Main from "./Main.jsx"

const AppInicioSesion = ({addCliente}) => {
    return (
        <div className="bg-black h-dvh text-white">
            
            <Header />

            <Main addCliente={addCliente} />

        </div>
    )
}

export default AppInicioSesion;