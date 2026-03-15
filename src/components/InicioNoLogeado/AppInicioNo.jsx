import Header from "./Header.jsx"
import Main from "./Main.jsx"

const AppInicioNo = ({login}) => {
  return (
    <div className="text-white">

      <Header login={login} />

      <Main />

    </div>
  )
}

export default AppInicioNo