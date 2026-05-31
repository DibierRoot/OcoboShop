const ListaFacturas = ({index, factura}) => {

    return (
        <div>
            <li key={index}>
                <div className="flex gap-2">
                    <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl">{"factura " + (index+1) + ": "}</p>
                    <a className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl hover:text-RosadoOcobo hover:duration-300" href={factura.ruta_pdf} target="_blank" rel="noopener noreferrer">{factura.codigoFactura}</a>
                    <p className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl">{factura.estado}</p>
                </div>
            </li>
        </div>                            
    )
}

export default ListaFacturas