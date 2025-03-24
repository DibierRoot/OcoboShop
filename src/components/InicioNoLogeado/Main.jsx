import { useState, useEffect } from "react";
import Items from "./Items"
import Producto1 from "/src/assets/image/Producto1.jpeg"
import Producto2 from "/src/assets/image/Producto3.jpeg"

const Main = () => {

  const [productos, setVerProductos] = useState([])

    return (
      <main className="">

          <section className="bg-black h-auto rounded-lg container mx-auto grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 grid">
            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 1</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 2</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 3</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 4</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 5</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 6</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 7</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 8</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 9</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 10</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 11</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 12</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 13</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 14</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 15</p>
              <p>Descripcion</p>
            </item>

            <item className="text-white p-8 rounded-md w-auto">
              <img src={Producto1} alt="ImagenProducto" />
              <p className="text-white">Producto 16</p>
              <p>Descripcion</p>
            </item>
          </section>


      </main>
    )
}

export default Main;