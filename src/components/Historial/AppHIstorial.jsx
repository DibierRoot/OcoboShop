import Header from "./Header"
import Main from "./Main"

const AppHistorial = () => {
    return (
        <>
            <div className="bg-black">
                <div className="bg-[url('/src/assets/image/Logo.jpeg')] static bg-no-repeat bg-contain bg-center h-dvh">
                    <Header />

                    <Main />
                </div>
            </div>
        </>
    )
}

export default AppHistorial;