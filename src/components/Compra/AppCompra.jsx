import Header from "./Header"
import Main from "./Main"

const AppCompra = () => {
    return (
        <>
            <div className="bg-black">
                <div className="bg-[url('/src/assets/image/Logo.jpeg')] bg-no-repeat bg-contain bg-center h-dvh">
                    <Header />

                    <Main />
                </div>
            </div>
        </>
    )
}

export default AppCompra