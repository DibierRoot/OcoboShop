import Header from "./Header.jsx"
import Main from "./Main.jsx"

const AppRegistro = ({addCliente}) => {
    return (
        <div className="h-dvh text-white">
            
            <Header />

            <Main addCliente={addCliente} />

        </div>
    )
}

export default AppRegistro;