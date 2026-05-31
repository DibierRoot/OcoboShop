const Tallas = ({producto, hoy, abrirModalTalla, verProductosTalla, verProductoTalla, index}) => {
    
    return (
        <div key={index} className="relative">
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
