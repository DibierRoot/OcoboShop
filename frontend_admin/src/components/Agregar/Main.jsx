import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Main = ({addProducto}) => {

  // Estados para almacenar los datos de colores, géneros, tallas, categorías y imagenes
  const [colores, setVerColores] = useState([]);
  const [tallas, setVerTallas] = useState([]);
  const [categorias, setVerCategorias] = useState([]);
  const [generos, setVergeneros] = useState([]);

  const [preview, setPreview] = useState(null)

  const [cargando, setCargando] = useState(false)

  const [mensaje, setMensaje] = useState("");


  const [producto, setProducto] = useState({
    imagen: null,
    nombre: "Camiseta con Lettering",
    idColor: "1",
    idTalla: "5",
    precio: "20000",
    descripcion: "Camiseta con Letterin de Ocobo",
    idCategoria: "1",
    idGenero: "1"
  })

  const [cantidad, setCantidad] = useState(1)

  const {imagen, nombre, idColor, idTalla, precio, descripcion, idCategoria, idGenero} = producto;

  const fechaPublicacion = new Date().toLocaleDateString("sv-SE");

  const aumentarCantidad = () => {
      if (cantidad >= 1) {
          setCantidad(cantidad + 1);
      }
  }

  const disminuirCantidad = () => {
      if (cantidad > 1) {
          setCantidad(cantidad - 1);
      }
  }

   // Función para obtener datos desde el backend
   const obtenerDatos = async (accion, setData) => {
       try {
           const response = await axios.post("http://localhost:8080/SubirProducto/", { action: accion });
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
        obtenerDatos("obtenerTodosLosGeneros", setVergeneros)
    }, []);

  const click = async (e) => {
        e.preventDefault();

        // Validación de campos
        if (!nombre.trim() || !descripcion.trim() || !imagen) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Asegúrate de llenar todos los campos y cargar una imagen!",
                iconColor: "#F28B82",
                confirmButtonColor: "#E96BA3",
                background: "#1C1C1C"
            });
            return;
        }

        setCargando(true);


        console.log("fecha: ", fechaPublicacion);

        try {
            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("precio", precio);
            formData.append("descripcion", descripcion);
            formData.append("cantidad", cantidad);
            formData.append("idTalla", idTalla);
            formData.append("idColor", idColor);
            formData.append("idCategoria", idCategoria);
            formData.append("idGenero", idGenero);
            formData.append("imagen", imagen);
            formData.append("fechaPublicacion", fechaPublicacion);

        // Registrar el producto con la imagen
        const productoResponse = await axios.post("http://localhost:8080/Imagen/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const mensajeRespuesta = productoResponse.data.message;
        console.log("error: ", productoResponse.data);
        setMensaje(mensajeRespuesta);
        console.log(mensajeRespuesta)

        if (mensajeRespuesta === "Producto registrado correctamente") {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Producto publicado correctamente",
                showConfirmButton: false,
                timer: 1500,
                iconColor: "#E96BA3",
                confirmButtonColor: "#E96BA3",
                background: "#1C1C1C"
            });
            addProducto({ ...producto });
        } else {
            console.log(mensajeRespuesta)
            throw new Error(mensajeRespuesta || "¡Error desconocido al registrar el producto!");
        }
        } catch (error) {
            console.error("Error al registrar el producto:", error.response ? error.response.data : error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data : error.message || "¡Error desconocido al registrar el producto!",
                iconColor: "#F28B82",
                confirmButtonColor: "#E96BA3",
                background: "#1C1C1C"
            });
        } finally {
            setCargando(false);
        }
    };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProducto ({
      ...producto,
      [name]: value,
    });
  }

  // Función para manejar el cambio de imagen
  const onFileChange = (e) => {
      const file = e.target.files[0];
      setProducto({
          ...producto,
          imagen: file
      });
      setPreview(URL.createObjectURL(file))
  };

  console.log([imagen, nombre, idColor, idTalla, idGenero, precio, cantidad, descripcion]);

    return (
      <main className="outline-none pb-8 flex inset-0 items-center justify-center bg-opacity-50">
        <div className="relative bg-NegroSuave py-14 -mt-48 md:max-w-3xl text-white p-6 rounded-lg">
          <form encType="multipart/form-data">
            <div className="relative flex flex-col md:flex-row sm:gap-3 md:gap-5 lg:gap-9 xl:gap-9 2xl:gap-9">
                <div className="flex flex-col justify-center items-center md:justify-normal md:items-start gap-7">
                    {preview && (
                    <div>
                        <img className="relative w-36 md:w-48 lg:w-56 xl:w-64 h-48 md:h-64 lg:h-72 xl:h-80" src={preview} alt="Imagen Genial" />
                    </div>
                    )}
                    <input className="hidden" type="file" onChange={onFileChange} id="imagen" name="imagen" />
                    <label className={preview ? "absolute rounded-md p-40 text-8xl" : "w-36 md:w-48 lg:w-56 xl:w-64 h-48 md:h-64 lg:h-72 xl:h-80 text-6xl xl:text-8xl rounded-md border-2 border-dashed border-white"} htmlFor="imagen">
                        {
                        preview ? "" : 
                        <p className="relative flex justify-center items-center h-full w-full">+</p>
                        }
                    </label>
                    <div className="mb-5 flex flex-col gap-2">
                    <input className="text-white border-b-2 border-white h-10 p-2 outline-none bg-NegroSuave" placeholder="Nombre" type="text" onChange={handleChange} value={nombre} maxLength="20" name="nombre" id="nombre" />
                    <textarea className="bg-NegroSuave outline-none" maxLength="45" onChange={handleChange} value={descripcion} name="descripcion" id="descripcion"></textarea>
                    </div>
                </div>

                <div className="flex flex-col gap-7">
                  <div className="flex gap-7">
                      <div className="flex gap-7 md:flex-col md:gap-2">
                          <div className="flex flex-col gap-2">
                              <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Color:</h2>
                              <select onChange={handleChange} className="bg-RosadoOcobo text-center w-16 lg:w-24 h-9 sm:h-10 md:h-12 lg:h-14" value={idColor} name="idColor" id="idColor">
                              {colores.map((color) => (
                                  <option value={color.idColor} key={color.idColor}>{color.color}</option>
                              ))}
                              </select>
                          </div>
                          <div className="flex flex-col gap-2">
                              <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Talla:</h2>
                              <select onChange={handleChange} className="bg-RosadoOcobo text-center w-16 lg:w-24 h-9 sm:h-10 md:h-12 lg:h-14" value={idTalla} name="idTalla" id="idTalla">
                                  {tallas.map((talla) => (
                                  <option value={talla.idTalla} key={talla.idTalla}>{talla.talla}</option>
                                  ))}
                              </select>
                          </div>
                      </div>
                      <div className="flex gap-7 md:flex-col md:gap-2">
                          <div className="flex flex-col gap-2">
                              <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Categoria:</h2>
                              <select onChange={handleChange} className="bg-RosadoOcobo text-center w-16 lg:w-24 h-9 sm:h-10 md:h-12 lg:h-14" value={idCategoria} name="idCategoria" id="idCategoria">
                                  {categorias.map((categoria) => (
                                      <option value={categoria.idCategoria} key={categoria.idCategoria}>{categoria.categoria}</option>
                                  ))}
                              </select>
                          </div>
                          <div className="flex flex-col gap-2">
                          <h2 className="text-base md:text-base lg:text-lg xl:text-xl 2xl:text-xl font-medium">Genero:</h2>
                              <select onChange={handleChange} className="bg-RosadoOcobo text-center w-16 lg:w-24 h-9 sm:h-10 md:h-12 lg:h-14" value={idGenero} name="idGenero" id="idGenero">
                              {generos.map((genero) => (
                                  <option value={genero.idGenero} key={genero.idGenero}>{genero.genero}</option>
                              ))}
                              </select>
                          </div>
                      </div>
                  </div>
                

                  <div className="font-bold flex text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                      <p>$</p>
                      <input className="bg-NegroSuave w-16 xl:w-24 outline-none" onChange={handleChange} value={precio} name="precio"  type="text" />
                      <p>COP</p>
                  </div>
                    
                  <div>
                      <h2 className="font-medium">Ingrese la cantidad que desea Agregar:</h2>
                      <button className="bg-RosadoOcobo p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 rounded-full" type="button" onClick={disminuirCantidad}>-</button>
                      <input className="bg-NegroSuave w-10 text-center outline-none" value={cantidad} readOnly disabled type="text" onChange={(e) => handleChange(e, setCantidad)} />
                      <button className="bg-RosadoOcobo p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 rounded-full" type="button" onClick={aumentarCantidad}>+</button>
                  </div>

                </div>
            </div>
            <div className="mt-5 md:mt-8 flex flex-row md:flex-col gap-8">
              <button className="bg-RosadoOcobo mt-5 right-8 p-3 rounded-md" onClick={click} type="submit">Publicar</button>
            </div>
          </form>
        </div>
      </main>
    )
}

export default Main;