import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const Main = () => {
  const [datosCompra, setDatosCompra] = useState(null);
  const [metodoPago, setMetodoPago] = useState("");
  const navigate = useNavigate();
  const location = useLocation();  // Nuevo hook para obtener la ubicación

  useEffect(() => {
    if (location.state) {
      console.log("Datos de compra cargados:", location.state);
      setDatosCompra(location.state);
    } else {
      console.error("No hay datos de compra disponibles");
      navigate("/Inicio/Carrito"); // Redirigir al carrito si no hay datos de compra
    }
  }, [location.state, navigate]);

  const generarFactura = async () => {
    if (!metodoPago) {
        Swal.fire({
          icon: 'warning',
          title: 'Selecciona un método de pago',
          text: 'Por favor selecciona un método de pago antes de continuar.',
          iconColor: "#E96BA3",
          confirmButtonColor: "#E96BA3",
          background: "#1C1C1C"
        });
        return;
    }

    const clienteId = localStorage.getItem('idCliente');
    if (!clienteId) {
        Swal.fire({
          icon: 'warning',
          title: 'No se encontró el ID del cliente',
          text: 'Por favor, inicia sesión para continuar.',
          iconColor: "#E96BA3",
          confirmButtonColor: "#E96BA3",
          background: "#1C1C1C"
        });
        return;
    }

    try {
        const response = await fetch("http://localhost/OcoboBack-end/GenerarFactura/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "generarFactura",
                productos: datosCompra.productos,
                metodoPago,
                idCliente: clienteId,
            }),
        });

        const data = await response.json();

        console.log(data)

        if (data.status === "success") {
            Swal.fire({
              icon: 'success',
              title: 'Factura generada correctamente',
              text: 'La factura se ha generado exitosamente.',
              iconColor: "#E96BA3",
              confirmButtonColor: "#E96BA3",
              background: "#1C1C1C"
            });
            window.open(data.invoiceUrl, "_blank"); // Abre el PDF en nueva pestaña
            localStorage.removeItem("carrito");
            navigate("/Inicio/Productos");
        } else {
            console.log(data.message)
            throw new Error(data.message || "Hubo un error al generar la factura.");
        }
    } catch (error) {
        console.error("Error al generar la factura:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error al generar la factura',
          text: error.message,
          iconColor: "#E96BA3",
          confirmButtonColor: "#E96BA3",
          background: "#1C1C1C"
        });
    }
};

  return (
    <main className="text-white pb-8">
      <form className="compra-formulario">
        <div className="bg-NegroSuaveSuavizado relative max-w-xs sm:max-w-xl md:max-w-3xl text-center rounded-lg my-10 mx-auto -mt-36 py-24">
            <h1 className="text-2xl font-bold"> Seleccione su método de pago</h1>
            <div className="mt-10">
            <select className="bg-RosadoOcobo p-2 rounded-md" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                <option value="">Seleccionar método</option>
                <option value="ContraEntrega">Contra Entrega</option>
            </select>
            </div>
            {datosCompra && (
            <div className="mt-4">
                <h2>Resumen de la compra:</h2>
                <ul>
                {datosCompra.productos.map((producto, index) => (
                    <li key={index}>
                    {producto.nombre} - {producto.cantidad} unidad(es) - $ {(producto.precio * producto.cantidad).toLocaleString("es-CO")}
                    </li>
                ))}
                </ul>
                <p className="text-lg font-bold">
                Total: ${datosCompra.precioTotal.toLocaleString("es-CO")}
                </p>
            </div>
            )}
            <button type="button" onClick={generarFactura} className="mt-4 bg-RosadoOcobo rounded-md p-3">
            Generar Factura
            </button>
            <p className="absolute left-10 bottom-10 cursor-pointer hover:text-RosadoOcobo hover:duration-300">
              <Link to={"/Inicio/Productos"}>
                ← Cancelar
              </Link>
            </p>
        </div>
      </form>
    </main>
  );
};

export default Main;