import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Items from "./Items";
import ListaFacturas from "./ListaFacturas";
import Pendientes from "./Pendientes";

// Establecemos el contenedor del modal
Modal.setAppElement("#root");

const Main = () => {
    const [clientes, setClientes] = useState([]);
    const [todasFacturas, setTodasFacturas] = useState([]);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [estadoFactura, setEstadoFactura] = useState("")
    const [filtro, setFiltro] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar el modal
    const [facturasCliente, setFacturasCliente] = useState([]); // Estado para almacenar las facturas de un cliente

    const obtenerTodosLosClientes = async () => {
    try {
        const response = await axios.post("http://localhost:8080/VerPedidos/", {
        action: "getFacturasPorClienteAdmin",
        filtro: filtro
        });
        setClientes(response.data.clientes || []);
        setClientesFiltrados(response.data.clientes || []);
    } catch (error) {
        console.error("error", error);
    }
    };

    const obtenerTodasLasFacturas = async (estadoFactura = "1") => {
        try {
            const response = await axios.post("http://localhost:8080/VerPedidos/", {
            action: "getFacturaPorClienteAdmin",
            estadoFactura: estadoFactura
            });
            console.log("estado", estadoFactura);
            setEstadoFactura(estadoFactura);
            setTodasFacturas(response.data.clientes || []);
        } catch (error) {
            console.error(error);
        }
    };

    const filtrarClientes = (valor) => {
        setFiltro(valor);
        if (valor.trim() === "") {
            setClientesFiltrados(clientes);
        } else {
            const resultado = clientes.filter((cliente) =>
                cliente.nombre.toLowerCase().includes(valor.toLowerCase()) ||
                cliente.correo.toLowerCase().includes(valor.toLowerCase())
            );
            setClientesFiltrados(resultado);
        }
    };

    const abrirModal = (facturas) => {
        setFacturasCliente(facturas); // Establecemos las facturas del cliente en el estado
        setModalIsOpen(true); // Abrimos el modal
    };

    const cerrarModal = () => {
        setModalIsOpen(false); // Cerramos el modal
    };

    useEffect(() => {
        obtenerTodosLosClientes();
        obtenerTodasLasFacturas();
    }, []);

    console.log(obtenerTodasLasFacturas)

    return (
        <main className="pb-8">
          <div className="text-white bg-NegroSuaveSuavizado relative max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl items-center rounded-lg my-10 mx-auto flex flex-col -mt-36 py-14">
            <h2 className="text-2xl font-semibold">Historial de Compras</h2>
            <div className="mt-9 items-center gap-10 p-7">
                <div className="flex flex-col 2xl:flex-row md:gap-10">
                    <div className="overflow-y-auto h-[calc(100vh-64px)] pr-2 items-center">
                        <div className="flex gap-2 sm:gap-4 md:gap-10 text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl">
                            <h2 className={estadoFactura == 1 ? "font-medium mb-3 cursor-pointer text-RosadoOcobo duration-300" : "font-medium mb-3 cursor-pointer hover:text-RosadoOcobo duration-300"} onClick={() => obtenerTodasLasFacturas("1")}>Pendientes</h2>
                            <h2 className={estadoFactura == 2 ? "font-medium mb-3 cursor-pointer text-RosadoOcobo duration-300" : "font-medium mb-3 cursor-pointer hover:text-RosadoOcobo duration-300"} onClick={() => obtenerTodasLasFacturas("2")}>Cancelados</h2>
                            <h2 className={estadoFactura == 3 ? "font-medium mb-3 cursor-pointer text-RosadoOcobo duration-300" : "font-medium mb-3 cursor-pointer hover:text-RosadoOcobo duration-300"} onClick={() => obtenerTodasLasFacturas("3")}>Entregados</h2>
                        </div>
                        {todasFacturas.length == 0 ? (
                            <div className="relative bg-NegroSuave sm:w-96 md:w-anchoEspecial md:flex p-2">
                                <p>No se Encontraron Clientes con Este Filtro</p>
                            </div>
                        ) : (
                            todasFacturas.map((pendiente, index) => (
                                <Pendientes pendiente={pendiente} index={index}/>
                            )
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-medium mb-2">Total de Clientes</h2>
                        <div>
                            <input
                            type="text"
                            placeholder="Buscar por nombre o correo"
                            value={filtro}
                            onChange={(e) => filtrarClientes(e.target.value)}
                            className="rounded-md h-9 sm:w-96 md:w-anchoEspecial text-black outline-none p-2"
                            />
                        </div>
                        
                        <div>
                            {clientesFiltrados.map((cliente) => (
                                <Items key={cliente.idCliente} abrirModal={abrirModal} cliente={cliente} />
                            ))}
                        </div>
                    </div>
                </div>

                
                <div className="mt-6">
                    <p className="absolute left-10 bottom-10 cursor-pointer hover:text-RosadoOcobo hover:duration-300">
                    <Link to={"/Colaboradores/Inicio"}>
                        ← Volver al Inicio
                    </Link>
                    </p>
                </div>
            </div>

            <div>
                <div isOpen={modalIsOpen} onRequestClose={cerrarModal} contentLabel="Facturas del Cliente" className={`outline-none flex fixed inset-0 z-50 items-center justify-center bg-Suavizado bg-opacity-50 ${!modalIsOpen ? "hidden" : ""}`} overlayClassName="overlay">
                    <div className="bg-NegroSuave md:max-w-3xl text-white p-6 rounded-lg">
                        <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Facturas del Cliente{" "} {facturasCliente.length > 0 ? facturasCliente[0]?.cliente?.nombre: "Cliente no encontrado"}</h2>                        
                        <ul>
                            {facturasCliente.length > 0 ? (
                                facturasCliente.map((factura, index) => (
                                    <ListaFacturas index={index} factura={factura}/>
                                ))
                            ) : (
                                <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl">No hay facturas disponibles.</p>
                            )}
                        </ul>
                        <button className="mt-2 text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium hover:text-RosadoOcobo hover:duration-300" onClick={cerrarModal}>Cerrar</button>                   
                    </div>
                <hr className="mt-5" />
                </div>
            </div>
          </div>
        </main>
    );
};

export default Main;