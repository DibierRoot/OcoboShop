const Tallas = ({producto, hoy, abrirModalTalla, verProductosTalla, verProductoTalla, index}) => {
    
    return (
        <div key={index}>
            <p className={!verProductoTalla.cantidad ? "absolute z-40 -mt-[4.5rem] bg-RosadoOcobo font-medium text-center md:w-48 w-36 lg:w-56 xl:w-64" : "hidden"}>{producto.cantidad <= 0 && verProductoTalla?.cantidad <= 0 ? "AGOTADO" : "NUEVO"}</p>
            <div className={producto.cantidad <= 0 && verProductoTalla.cantidad <= 0 ? "hidden" : "ease-in-out duration-200 -translate-y-10 group-hover:-translate-y-24"}>
              {verProductoTalla.cantidad <= 0 ? (
                <button onClick={() => abrirModalTalla(verProductoTalla)} type="button" className="text-sm xl:text-base bg-NegroSuave cursor-not-allowed w-7 xl:w-8 h-7 xl:h-8 text-center" disabled>{verProductoTalla.idTalla == 1 ? "XS" : verProductoTalla.idTalla == 2 ? "S" : verProductoTalla.idTalla == 3 ? "M" : verProductoTalla.idTalla == 4 ? "L" : verProductoTalla.idTalla == 5 ? "XL" : verProductoTalla.idTalla == 6 ? "XXL" : ""}</button>
              ) : (
                <button onClick={() => abrirModalTalla(verProductoTalla)} type="button" className="text-sm xl:text-base bg-RosadoOcobo w-7 xl:w-8 h-7 xl:h-8 text-center">{verProductoTalla.idTalla == 1 ? "XS" : verProductoTalla.idTalla == 2 ? "S" : verProductoTalla.idTalla == 3 ? "M" : verProductoTalla.idTalla == 4 ? "L" : verProductoTalla.idTalla == 5 ? "XL" : verProductoTalla.idTalla == 6 ? "XXL" : ""}</button>
              )}
            </div>
        </div>
    )
}

export default Tallas;
