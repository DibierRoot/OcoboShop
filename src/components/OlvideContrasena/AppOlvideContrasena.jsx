import Header from "./Header.jsx"
import Main from "./Main.jsx"

const AppOlvideContrasena = ({addCliente}) => {
    return (
        <div className="h-dvh text-white">
            
            <Header />

            <Main addCliente={addCliente} />

        </div>
    )
}

export default AppOlvideContrasena;