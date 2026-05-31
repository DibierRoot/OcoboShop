const Tallas = ({producto, hoy, abrirModalTalla, verProductosTalla, verProductoTalla, index, estaAgotado}) => {
    
    const esNuevoTalla = () => {
      if (!verProductoTalla.fechaPublicacion || estaAgotado) return false;
      const fechaPub = new Date(verProductoTalla.fechaPublicacion);
      const hoyDate = new Date();
      const diffTime = hoyDate - fechaPub;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    };

    console.log(esNuevoTalla())

    return (
        <div key={index}>
            {esNuevoTalla() && (
              <div className="absolute z-40 top-0 right-5 bg-RosadoOcobo text-white text-[9px] md:text-xs font-bold py-1 text-center tracking-wider transform w-16 md:w-24 mt-1.5 md:-mt-[22.5rem]">
                Nuevas Tallas
              </div>
            )}
            <div className={producto.cantidad <= 0 && verProductoTalla.cantidad <= 0 ? "hidden" : "ease-in-out duration-200 -translate-y-10 group-hover:-translate-y-24"}>
              {verProductoTalla.cantidad <= 0 ? (
                <button onClick={() => abrirModalTalla(verProductoTalla)} type="button" className="text-sm xl:text-base bg-NegroSuave cursor-not-allowed w-7 xl:w-8 h-7 xl:h-8 text-center" disabled>{verProductoTalla.idTalla == 1 ? "XS" : verProductoTalla.idTalla == 2 ? "S" : verProductoTalla.idTalla == 3 ? "M" : verProductoTalla.idTalla == 4 ? "L" : verProductoTalla.idTalla == 5 ? "XL" : verProductoTalla.idTalla == 6 ? "XXL" : ""}</button>
              ): (
                <button onClick={() => abrirModalTalla(verProductoTalla)} type="button" className="text-sm xl:text-base bg-RosadoOcobo w-7 xl:w-8 h-7 xl:h-8 text-center">{verProductoTalla.idTalla == 1 ? "XS" : verProductoTalla.idTalla == 2 ? "S" : verProductoTalla.idTalla == 3 ? "M" : verProductoTalla.idTalla == 4 ? "L" : verProductoTalla.idTalla == 5 ? "XL" : verProductoTalla.idTalla == 6 ? "XXL" : ""}</button>
              )}
            </div>
        </div>
    )
}

export default Tallas;