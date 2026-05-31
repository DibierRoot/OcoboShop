import { useState } from "react"

const Items = ({PQR, index}) => {
    return (
        <div key={index}>
            <article className="flex flex-col  gap-8 xl:gap-16 mt-10 md:w-anchoEspecial">
                <div className="flex flex-col text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl">
                    <p className="font-semibold">{PQR.nombre}</p>
                    <p className="hidden md:inline">{PQR.correo}</p>
                    <input className="inline md:hidden bg-NegroSuaveSuavizado outline-none" type="text" value={PQR.correo} />
                    <p className="hidden md:inline">{PQR.numeroCelular}</p>
                    <input className="inline md:hidden bg-NegroSuaveSuavizado outline-none" type="text" value={PQR.numeroCelular} />
                    <p>{PQR.fecha}</p>
                    <p>Mensaje:</p>
                    <textarea className="rounded-md bg-NegroSuaveSuavizado outline-none" readOnly>{PQR.mensaje}</textarea>
                </div>
            <hr />
            </article>
        </div>

    )
}

export default Items;