import Header from "./Header.jsx"
import Main from "./Main.jsx"
import Footer from "./Footer.jsx"

const AppInicioNo = ({login}) => {
  return (
    <div className="bg-black text-white">

      <Header login={login} />

      <Main />

      <Footer />

    </div>
  )
}

export default AppInicioNo