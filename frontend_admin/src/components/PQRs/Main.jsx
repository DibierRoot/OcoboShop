import { useState, useEffect } from "react";
import Footer from "./Footer";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Items from "./Items";
import Recargar from "/src/assets/icons/Recargar.png";

const Main = () => {

  const [PQRs, setPQRs] = useState([]);

  const hoy = new Date().toLocaleDateString("sv-SE");
  const [fecha, setFecha] = useState("");

  const obtenerTodasLasPQR = async () => {
      try {
          const response = await axios.post("http://localhost:8080/PQRsAdmin/", {
          action: "obtenerPQRs",
          });
          setPQRs(response.data);
      } catch (error) {
          console.error(error);
      }
  };

      const obtenerTodasLasPQRFiltradas = async () => {
        try {
            const response = await axios.post("http://localhost:8080/PQRsAdmin/", {
            action: "obtenerPQRFiltrado",
            fecha: fecha
            });
            console.log(response.data);
            setPQRs(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerTodasLasPQR();
    }, [])

  console.log(fecha)

    return (
      <main>
        <div className="overflow-y-auto h-[calc(100vh-64px)] pr-2 text-white bg-NegroSuaveSuavizado relative max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-5xl items-center rounded-lg my-10 mx-auto flex flex-col -mt-36 py-14">
                <div className="flex flex-col lg:flex-row gap-5 mt-3 ">
                    <img src={Recargar} alt="Recargar" className="w-10 h-10 bg-white rounded-full cursor-pointer" onClick={() => obtenerTodasLasPQR()} />
                    <p className="mt-2 cursor-default text-sm lg:text-base">Buscar por Fecha:</p>
                    <input className="text-sm lg:text-base rounded-md h-10 w-32 md:w-38 lg:w-40 text-black outline-none p-2" onChange={(e) => setFecha(e.target.value)} value={fecha} type="date" />
                    <button className="text-sm lg:text-base bg-RosadoOcobo h-10 p-2 rounded-md w-32" onClick={obtenerTodasLasPQRFiltradas}>Buscar</button>
                </div>
            <hr className="mt-10"/>
            {PQRs.length <= 0 ? (
                <p className="text-center py-10">¡Oops! no se Encontraron PQRs con este Filtro</p>
            ) : (
                PQRs.map((PQR, index) => (
                    <Items PQR={PQR} index={index} key={index} />
                    )
                )
            )    
            }
        </div>

        <Footer />

      </main>
    )
}

export default Main;