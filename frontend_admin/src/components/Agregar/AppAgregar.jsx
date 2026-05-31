import Header from "./Header.jsx"
import Main from "./Main.jsx"

const AppAgregar = ({addProducto}) => {
    return (
        <div className="bg-[url('/src/assets/image/Logo.jpeg')] static bg-no-repeat bg-contain bg-center h-dvh">
            
            <Header />

            <Main addProducto={addProducto} />

        </div>
    )
}

export default AppAgregar;