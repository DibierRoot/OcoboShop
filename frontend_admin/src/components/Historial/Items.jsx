const Items = ({abrirModal, index, cliente}) => {
    return (
        <div>
            <div key={index} className="relative bg-NegroSuave sm:w-96 md:w-anchoEspecial p-2">
              <h1 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">{cliente.nombre}</h1>
              <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">{cliente.correo}</p>
              <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">{cliente.numeroCelular}</p>
              <button className="mt-2 text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium hover:text-RosadoOcobo hover:duration-300" onClick={() => abrirModal(cliente.facturas)}>Ver Todas las Facturas</button>
            </div>
            <hr className="mb-5" />
        </div>

    )
}

export default Items