import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Items = ({onclick, index, eliminarProductoEnTiempoReal, actualizarProductoEnTiempoReal, producto, manejarCarrito}) => {
  
  const [verDetalles, setVerDetalles] = useState(false);

  const [preview, setPreview] = useState (false)

  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  // Estado que almacena las tallas de la búsqueda de los colores
  const [colores, setVerColores] = useState([]);
    
  // Estado que almacena las tallas de la búsqueda de las categorias
  const [categorias, setVerCategorias] = useState([]);

  // Estado que almacena las tallas de la búsqueda de los generos
  const [generos, setVerGeneros] = useState([]);

  // Estado que almacena las tallas de la búsqueda de las tallas
  const [tallas, setVerTallas] = useState([]); 

  const [idProducto, setIdProducto] = useState(producto?.idProducto || "");
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [cantidad, setCantidad] = useState(producto?.cantidad || 1);
  const [precio, setPrecio] = useState(producto?.precio || "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion || "");
  const [imagen, setImagen] = useState(producto?.imagen)
  const [idTalla, setIdTalla] = useState(producto?.idTalla);
  const [idColor, setIdColor] = useState(producto?.idColor);
  const [idCategoria, setIdCategoria] = useState(producto?.idCategoria);
  const [idGenero, setIdGenero] = useState(producto?.idGenero);

  const hoy = new Date().toLocaleDateString("sv-SE");


  const abrirModal = (producto) => {
      setProductoSeleccionado(producto) // guarda el producto que se seleccione
      setVerDetalles(!verDetalles)
  }

  const aumentarCantidad = () => {
      if (cantidad > -1) {
          setCantidad(Number(cantidad) + 1);
      }
  }

  const disminuirCantidad = () => {
      if (cantidad > 0) {
          setCantidad(cantidad - 1);
      }
  }

  useEffect(() => {
    if (verDetalles) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    return () => {
        document.body.style.overflow = '';
    }
  }, [verDetalles])

  // Función para obtener datos desde el backend
  const obtenerDatos = async (accion, setData) => {
      try {
          const response = await axios.post("http://localhost:8080/configProducto/", { action: accion });
          if (response.data.length > 0) {
              setData(response.data);
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Opciones cargadas exitosamente",
                  showConfirmButton: false,
                  timer: 1500,
                  iconColor: "#E96BA3",
                  confirmButtonColor: "#E96BA3",
                  background: "#1C1C1C"
              });
          }
      } catch (error) {
        console.log(error)
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "¡Error al cargar los datos!",
              iconColor: "#F28B82",
              confirmButtonColor: "#E96BA3",
              background: "#1C1C1C"
          });
      }
  };

  // useEffect para cargar los datos cuando se monta el componente
  useEffect(() => {
      obtenerDatos("obtenerTodosLosColores", setVerColores);
      obtenerDatos("obtenerTodasLasCategorias", setVerCategorias);
      obtenerDatos("obtenerTodasLasTallas", setVerTallas);
      obtenerDatos("obtenerTodosLosGeneros", setVerGeneros)
  }, []);

    const editarDatos = async () => {
            try {
                const formData = new FormData();
                formData.append("action", "editarProductos")
                formData.append("idProducto", producto.idProducto)
                formData.append("nombre", nombre);
                formData.append("precio", precio);
                formData.append("descripcion", descripcion);
                formData.append("cantidad", cantidad);
                formData.append("idTalla", idTalla);
                formData.append("idColor", idColor);
                formData.append("idCategoria", idCategoria);
                formData.append("idGenero", idGenero);
                if (imagen instanceof File) {
                    formData.append("imagen", imagen);
                }
                // console.log("Tipo de imagen:", typeof imagen, "Es file?", imagen instanceof File, imagen)

                // Mostrar el diálogo de confirmación antes de enviar la petición
                const result = await Swal.fire({
                    title: "¿Deseas guardar los cambios?",
                    icon: "question",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Guardar",
                    denyButtonText: "No guardar",
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: "#E96BA3",
                    cancelButtonColor: "#3A3A3A",
                    background: "#1C1C1C"
                });
        
                // Revisar la acción tomada por el usuario
                if (result.isConfirmed) {
                    // Enviar la solicitud al servidor
                    const response = await axios.post("http://localhost:8080/editarProducto/", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    });

                    console.log("la supuesta imagen: ", imagen, nombre)
                    console.log(response.data.message)
        
                    // Manejar la respuesta del servidor
                    if (response.data.message === "Producto actualizado exitosamente") {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Producto actualizado exitosamente",
                            showConfirmButton: false,
                            timer: 1500,
                            iconColor: "#E96BA3",
                            confirmButtonColor: "#E96BA3",
                            background: "#1C1C1C"
                        });
                        setVerDetalles(false);
        
                        actualizarProductoEnTiempoReal({
                            idProducto: producto.idProducto,
                            imagen,
                            nombre,
                            cantidad,
                            precio,
                            descripcion,
                            idTalla,
                            idColor,
                            idCategoria,
                        });
                    } else {
                        console.log(response.data)
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "¡Error al actualizar los datos!",
                            iconColor: "#F28B82",
                            confirmButtonColor: "#E96BA3",
                            background: "#1C1C1C"
                        });
                    }
                } else if (result.isDenied) {
                    Swal.fire("Los cambios no fueron guardados", "", "info");
                    setVerDetalles(!verDetalles)
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "¡Error al actualizar los datos!",
                    iconColor: "#F28B82",
                    confirmButtonColor: "#E96BA3",
                    background: "#1C1C1C"
                });
            }
        };

    const click = async () => {
        try {

            const result2 = await Swal.fire({
                title: "¿Estas seguro?",
                text: "¡No podras revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminarlo",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#E96BA3",
                cancelButtonColor: "#3A3A3A",
                background: "#1C1C1C"
            });

            if (result2.isConfirmed) {
                const response = await axios.post('http://localhost:8080/configProducto/', {
                    action: "eliminarProductos",
                    idProducto: producto.idProducto
                });
                console.log(response.data.message)
                if (response.data.message === "Producto eliminado exitosamente") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'Producto eliminado exitosamente',
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: "#E96BA3",
                        confirmButtonColor: "#E96BA3",
                        background: "#1C1C1C"
                    });
                    eliminarProductoEnTiempoReal(producto.idProducto)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al eliminar el producto',
                        iconColor: "#F28B82",
                        confirmButtonColor: "#E96BA3",
                        background: "#1C1C1C"
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Error al realizar la búsqueda!',
                iconColor: "#F28B82",
                confirmButtonColor: "#E96BA3",
                background: "#1C1C1C"
            });
        }
    };

  // Función para manejar el cambio de imagen
  const onFileChange = (e) => {
      const file = e.target.files[0];
      setProductoSeleccionado({
          ...producto,
          imagen: file
      });
      setPreview(URL.createObjectURL(file))
      setImagen(file)
  };

    const handleChange = (e, setFunc) => {
        setFunc(Number(e.target.value))
    }

  const milesSeleccionado = (productoSeleccionado) => {
      return productoSeleccionado?.toLocaleString('es-CO');
  }
        
  const miles = (productos) => {
      return productos.toLocaleString('es-CO');
  }    
  
  return (
      <div>
        <div className={`outline-none flex fixed inset-0 z-50 items-center justify-center bg-Suavizado bg-opacity-50 ${!verDetalles ? "hidden" : ""}`}>
            <div className="bg-NegroSuave md:max-w-3xl text-white p-6 rounded-lg">
                <form>
                    <div className="relative flex flex-col md:flex-row sm:gap-3 md:gap-5 lg:gap-9 xl:gap-9 2xl:gap-9">
                      <div className="flex flex-col justify-center items-center md:justify-normal md:items-start gap-7">
                          <img className="relative w-36 md:w-48 lg:w-56 xl:w-64 h-48 md:h-64 lg:h-72 xl:h-80" src={preview ? preview : imagen} alt="imagen"/>
                          <label className="absolute rounded-md w-36 md:w-48 lg:w-56 xl:w-64 h-48 md:h-64 lg:h-72 xl:h-80" htmlFor="imagen"></label>
                          <input className="hidden" type="file" name="imagen" id="imagen" onChange={onFileChange} />
                          <div className="mb-5 flex flex-col gap-2">
                            <input className="text-white border-b-2 border-white h-10 p-2 outline-none bg-NegroSuave" maxLength="30" placeholder="Nombre" type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                            <textarea className="bg-NegroSuave outline-none" maxLength="45" onChange={(e) => setDescripcion(e.target.value)} value={descripcion}>{descripcion}</textarea>
                          </div>
                      </div>
                                
                      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-6">
                        <div className="flex gap-7">
                            <div className="flex gap-7 md:flex-col md:gap-2">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Color:</h2>
                                    <select onChange={(e) => handleChange(e, setIdColor)} className="bg-RosadoOcobo text-center w-16 lg:w-24 h-9 sm:h-10 md:h-12 lg:h-14" value={idColor} name="idColor" id="idColor">
                                    {colores.map((color) => (
                                        <option value={color.idColor} key={color.idColor}>{color.color}</option>
                                    ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Talla:</h2>
                                    <select onChange={(e) => handleChange(e, setIdTalla)} className="bg-RosadoOcobo text-center w-16 lg:w-24 h-9 sm:h-10 md:h-12 lg:h-14" value={idTalla} name="idTalla" id="idTalla">
                                        {tallas.map((talla) => (
                                        <option value={talla.idTalla} key={talla.idTalla}>{talla.talla}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="flex gap-7 md:flex-col md:gap-2">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Categoria:</h2>
                                    <select onChange={(e) => handleChange(e, setIdCategoria)} className="bg-RosadoOcobo text-center w-16 lg:w-24 h-9 sm:h-10 md:h-12 lg:h-14" value={idCategoria} name="idCategoria" id="idCategoria">
                                        {categorias.map((categoria) => (
                                            <option value={categoria.idCategoria} key={categoria.idCategoria}>{categoria.categoria}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Genero:</h2>
                                    <select onChange={(e) => handleChange(e, setIdGenero)} className="bg-RosadoOcobo text-center w-16 lg:w-24 h-9 sm:h-10 md:h-12 lg:h-14" value={idGenero} name="idGenero" id="idGenero">
                                    {generos.map((genero) => (
                                        <option value={genero.idGenero} key={genero.idGenero}>{genero.genero}</option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="font-bold flex text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                            <p>$</p>
                            <input className="bg-NegroSuave w-16 xl:w-24 outline-none" onChange={(e) => setPrecio(e.target.value)} value={milesSeleccionado(precio)} type="text" />
                            <p>COP</p>
                        </div>

                        <div>
                            <h2 className="font-medium">Ingrese la cantidad que desea Agregar:</h2>
                            <button className="bg-RosadoOcobo p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 rounded-full" type="button" onClick={disminuirCantidad}>-</button>
                            <input className="bg-NegroSuave w-10 text-center outline-none" value={cantidad} readOnly disabled type="text" onChange={(e) => handleChange(e, setCantidad)} />
                            <button className="bg-RosadoOcobo p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 rounded-full" type="button" onClick={aumentarCantidad}>+</button>
                        </div>
                    </div>


                    <p className="absolute -mt-1 right-3 cursor-pointer" onClick={() => abrirModal()}>x</p>
                        
                      <div className="mt-5 md:mt-8 flex flex-row md:flex-col gap-8">
                          <button className="bg-RosadoOcobo rounded-md p-3" onClick={editarDatos} type="button">Aceptar Cambios</button>
                          <button className="border-2 bg-NegroSuave rounded-md p-3" type="button" onClick={click}>Eliminar Producto</button>
                      </div>
                  </div>
              </form>
              </div>
        </div>
        
        <div className="relative group">
            <form>
                <article className="text-white p-5 rounded-md" key={index} onClick={() => abrirModal()}>
                    <img className="w-40 md:w-48 lg:w-56 xl:w-64 h-52 md:h-64 lg:h-72 xl:h-80" src={producto.imagen} alt="ImagenProducto" />
                    <p className={producto.fechaPublicacion?.split('-')[1] == hoy?.split('-')[1] || producto.cantidad <= 0 ? "absolute -mt-6 bg-RosadoOcobo font-medium text-center md:w-48 w-36 lg:w-56 xl:w-64" : "hidden"}>{producto.cantidad <= 0 ? "AGOTADO" : "NUEVO"}</p>
                    <p className="text-sm md:text-base text-white">{producto.nombre.length > 25 ? producto.nombre?.substring(0, 25) + "..." : producto.nombre}</p>
                    <p className="text-sm md:text-base">${producto.precio} COP</p>
                    <input className={producto.idTalla == 7 ? "hidden" : "text-sm md:text-base bg-RosadoOcobo w-8 lg:w-10 h-8 lg:h-10 text-center"} readOnly disabled value={producto.idTalla == 1 ? "XS" : producto.idTalla == 2 ? "S" : producto.idTalla == 3 ? "M" : producto.idTalla == 4 ? "L" : producto.idTalla == 5 ? "XL" : producto.idTalla == 6 ? "XXL" : "error"} />
                </article>
            </form>
        </div>
      </div>

    )
}

export default Items;