# Documentación de Componentes - OcoboShop

## Tabla de Contenidos
1. [InicioNoLogeado](#inicionologeado)
2. [InicioLogeado](#iniciologeado)
3. [Registro](#registro)
4. [OlvideContrasena](#olvidecontrasena)
5. [Cuenta](#cuenta)
6. [Historial](#historial)
7. [Compra](#compra)
8. [MetodosDePagoNoLogeado](#metodosdepagonologeado)
9. [MetodosDePagoLogeado](#metodosdepagologeado)
10. [ContactoNoLogeado](#contactonologeado)
11. [ContactoLogeado](#contactologeado)

---

# InicioNoLogeado

## Descripción
Componente principal del catálogo de productos para usuarios que NO han iniciado sesión. Muestra productos disponibles, permite filtrar por categoría, agregar productos al carrito (localStorage) y abrir modal de detalles del producto.

## Estructura de Archivos
```
InicioNoLogeado/
├── AppInicioNo.jsx      # Componente raíz - contenedor principal
├── Main.jsx             # Lógica del catálogo y modal de productos
├── Header.jsx           # Barra de navegación, login y carrito
├── Footer.jsx           # Redes sociales, categorías y ayuda
├── Items.jsx            # Tarjeta individual de producto
├── ItemsCarrito.jsx     # Item del carrito de compras
└── Icons/
    └── IconCheck.jsx    # Icono de check
```

## Componentes

### 1. AppInicioNo.jsx
**Propiedades:**
- `login` (función): Función para iniciar sesión del usuario

**Descripción:** Contenedor principal que renderiza el Header y Main. Pasa la función `login` como prop.

---

### 2. Main.jsx
**Descripción:** Componente principal que contiene toda la lógica del catálogo.

**Estados (useState):**
- `productos` - Array de productos obtenidos del backend
- `verDetalles` - Boolean para mostrar/ocultar modal de detalles
- `productoSeleccionado` - Producto actualmente seleccionado para ver detalles
- `filtro` - Categoría actual para filtrar productos
- `cantidad` - Cantidad a comprar del producto

**Funciones principales:**
| Función | Descripción |
|---------|-------------|
| `abrirModal(producto)` | Abre el modal de detalles del producto |
| `aumentarCantidad()` | Incrementa la cantidad (máximo stock disponible) |
| `disminuirCantidad()` | Decrementa la cantidad (mínimo 1) |
| `obtenerProducto(filtro)` | Busca productos por categoría via API |
| `manejarCarrito()` | Agrega producto al localStorage, actualiza cantidad si ya existe |
| `editarCantidadCarrito(idProducto, nuevaCantidad)` | Modifica cantidad de un producto en el carrito |
| `obtenerDatos()` | Obtiene todos los productos del backend |
| `milesSeleccionado()` | Formatea números con separador de miles |

**APIs consumidas:**
- `GET http://localhost/OcoboBack-end/VerProductos/` - Obtiene todos los productos
- `POST http://localhost/OcoboBack-end/Filtros/` - Filtra productos por categoría

**Categorías disponibles:**
- Camisetas
- Esqueletos
- Chaquetas
- Picks/Plumillas
- Accesorios

**Dependencias:**
- `axios` - Peticiones HTTP
- `reactstrap` - Modal (importado pero no usado)
- `sweetalert2` - Notificaciones
- `uuid` - IDs únicos para productos

---

### 3. Header.jsx
**Propiedades:**
- `login` (función): Función para iniciar sesión

**Descripción:** Barra de navegación fija con:
- Botón "Cuenta" - Abre modal de login/registro
- Logo "OCOBO" - Título de la tienda
- Icono Carrito - Abre modal del carrito

**Estados:**
- `productosSeleccionados` - IDs de productos seleccionados en el carrito
- `productosEnCarrito` - Productos en el carrito
- `productoSeleccionado` - Producto siendo editado en cantidad
- `cantidad` - Cantidad del producto a editar
- `MostrarHeader` - Controla visibilidad al hacer scroll
- `ultimoScrollY` - Posición anterior del scroll
- `cliente` - Datos del formulario {correo, contrasena}
- `verContrasena` - Toggle mostrar/ocultar contraseña
- `isOpenAccount` - Modal de cuenta abierto/cerrado
- `isOpenCart` - Modal de carrito abierto/cerrado
- `cargando` - Estado de carga del login

**Funciones:**
| Función | Descripción |
|---------|-------------|
| `handleChange(e)` | Actualiza estado del formulario |
| `click(e)` | Envía formulario de login al backend |
| `borrarTodoCarrito()` | Elimina todos los productos del carrito |
| `eliminarSeleccionados()` | Elimina productos marcados |
| `editarProducto(producto)` | Selecciona producto para editar cantidad |
| `disminuirCantidad()` | Decrementa cantidad (mín 1) |
| `manejarCarrito()` | Actualiza cantidad en el carrito |
| `verOcultarContrasena()` | Toggle visibilidad contraseña |

**Validaciones:**
- Email con formato válido
- Contraseña mínimo 8 caracteres

**API:**
- `POST http://localhost/OcoboBack-end/CRUD/` - Login

**Funcionalidades:**
- Sincronización con localStorage cada 1 segundo
- Escucha cambios en otras pestañas del navegador
- Scroll oculta el header al bajar, muestra al subir
- Carrito sincronizado en tiempo real

---

### 4. Footer.jsx
**Propiedades:**
- `obtenerProducto` (función): Función para filtrar productos

**Descripción:** Pie de página con:
- Logo de Ocobo
- Redes sociales (Facebook, Instagram, Spotify, YouTube)
- Links de categorías (filtros)
- Links de ayuda (Métodos de pago, Contacto)

---

### 5. Items.jsx
**Propiedades:**
- `index` (number): Índice del producto
- `producto` (object): Datos del producto
- `manejarCarrito` (función): Agregar al carrito
- `abrirModal` (función): Abrir detalles del producto

**Descripción:** Tarjeta visual de cada producto en el catálogo.

**Datos mostrados:**
- Imagen del producto
- Badge "NUEVO" o "AGOTADO" según corresponda
- Nombre (truncado a 25 caracteres)
- Precio formateado
- Talla (XS, S, M, L, XL, XXL)

---

### 6. ItemsCarrito.jsx
**Propiedades:**
- `productosSeleccionados` - Array de IDs seleccionados
- `setProductosSeleccionados` - Setter para modificar seleccionados
- `productosEnCarrito` - Todos los productos en carrito
- `setProductosEnCarrito` - Setter del carrito
- `producto` - Producto individual a renderizar

**Descripción:** Renderiza un producto dentro del modal del carrito.

**Funcionalidades:**
- Checkbox para seleccionar múltiples productos
- Muestra imagen, nombre, color, talla, cantidad
- Calcula total (precio × cantidad)
- Formatea números con separador de miles

---

### 7. IconCheck.jsx
**Descripción:** Componente de icono check simple para el checkbox del carrito.

---

## Flujo de Usuario

1. Usuario llega a la página y ve el catálogo de productos
2. Puede filtrar por categoría haciendo clic en los iconos
3. Al hacer clic en un producto, se abre el modal de detalles
4. En el modal puede seleccionar cantidad y agregar al carrito
5. El carrito se almacena en localStorage
6. Para comprar debe iniciar sesión (botón "Cuenta")
7. Después del login, navega a `/Inicio/Productos`

---

## Rutas Relacionadas
- `/` - Página principal (InicioNoLogeado)
- `/Registro` - Registro de nuevos clientes
- `/olvidemicontrasena` - Recuperar contraseña
- `/MetodosDePago` - Métodos de pago (sin login)
- `/Contacto` - Formulario de contacto (sin login)

---

# InicioLogeado

## Descripción
Componente del catálogo de productos para usuarios que HAN iniciado sesión. Es similar a InicioNoLogeado pero con navegación a rutas protegidas y verificación de stock.

## Estructura de Archivos
```
InicioLogeado/
├── AppInicio.jsx        # Componente raíz - contenedor principal
├── Main.jsx             # Lógica del catálogo y modal de productos
├── Header.jsx           # Barra de navegación, login y carrito
├── Footer.jsx           # Redes sociales, categorías y ayuda
├── Items.jsx            # Tarjeta individual de producto
├── ItemsCarrito.jsx     # Item del carrito de compras
└── Icons/
    └── IconCheck.jsx    # Icono de check
```

## Componentes

### 1. AppInicio.jsx
**Propiedades:** No recibe props

**Descripción:** Contenedor principal que renderiza el Header y Main. Es la versión logeada del catálogo.

---

### 2. Main.jsx
**Descripción:** Componente principal con lógica del catálogo para usuarios logeados.

**Diferencias con InicioNoLogeado:**
- Usa `useNavigate` de react-router-dom para navegación
- Verifica stock disponible antes de agregar al carrito
- Muestra mensaje "El producto está agotado" si cantidad <= 0
- Renderiza mensaje diferente cuando no hay productos

**Estados (useState):**
- `productos` - Array de productos obtenidos del backend
- `verDetalles` - Boolean para mostrar/ocultar modal de detalles
- `productoSeleccionado` - Producto actualmente seleccionado
- `filtro` - Categoría actual para filtrar
- `cantidad` - Cantidad a comprar

**Funciones principales:**
| Función | Descripción |
|---------|-------------|
| `abrirModal(producto)` | Abre el modal de detalles del producto |
| `aumentarCantidad()` | Incrementa la cantidad |
| `disminuirCantidad()` | Decrementa la cantidad |
| `obtenerProducto(filtro)` | Busca productos por categoría |
| `manejarCarrito()` | Agrega producto verificando stock |
| `editarCantidadCarrito()` | Modifica cantidad en carrito |
| `obtenerDatos()` | Obtiene productos del backend |
| `milesSeleccionado()` | Formatea números |

**APIs:**
- `GET http://localhost/OcoboBack-end/VerProductos/`
- `POST http://localhost/OcoboBack-end/Filtros/`

**Dependencias adicionales:**
- `react-router-dom` - Navegación (Link, useNavigate)

---

### 3. Header.jsx
**Propiedades:** No recibe props (el login ya está hecho)

**Descripción:** Similar a InicioNoLogeado pero sin modal de login.

**Estados:**
- `productosSeleccionados`
- `productosEnCarrito`
- `productoSeleccionado`
- `cantidadrarHeader`
- `ultimoScrollY`
- ``
- `MostisOpenCart`

**Funciones:**
- `borrarTodoCarrito()` - Elimina todo el carrito
- `eliminarSeleccionados()` - Elimina seleccionados
- `editarProducto()` - Editar cantidad
- `disminuirCantidad()` - Decrementa cantidad
- `manejarCarrito()` - Gestiona el carrito

---

### 4. Footer.jsx
**Propiedades:**
- `obtenerProducto` (función): Función para filtrar productos

**Descripción:** Pie de página con redes sociales, categorías y ayuda.

---

### 5. Items.jsx
**Propiedades:**
- `index`, `producto`, `manejarCarrito`, `abrirModal`
- `setCantidad`, `setVerDetalles`, `setProductoSeleccionado` (adicionales)

**Descripción:** Tarjeta de producto con todas las props de control del modal.

---

### 6. ItemsCarrito.jsx
Igual que InicioNoLogeado.

---

### 7. IconCheck.jsx
Igual que InicioNoLogeado.

---

## Rutas Relacionadas
- `/Inicio/Productos` - Catálogo logeado
- `/Inicio/Cuenta` - Cuenta del usuario
- `/Inicio/HistorialdeCompras` - Historial
- `/Inicio/MetodosDePago` - Métodos de pago
- `/Inicio/Contacto` - Contacto

---

# Registro

## Descripción
Componente para el registro de nuevos clientes en la plataforma.

## Estructura de Archivos
```
Registro/
├── AppRegistro.jsx     # Componente raíz
├── Header.jsx          # Barra de navegación
└── Main.jsx            # Formulario de registro
```

## Componentes

### 1. AppRegistro.jsx
**Propiedades:**
- `addCliente` (función): Función para agregar nuevo cliente al estado

**Descripción:** Contenedor principal que pasa la función addCliente al Main.

---

### 2. Header.jsx
**Propiedades:** No recibe props

**Descripción:** Barra de navegación simple con el logo "OCOBO".

---

### 3. Main.jsx
**Propiedades:**
- `addCliente` (función): Función para agregar cliente

**Descripción:** Formulario de registro con campos y validaciones.

**Estados:**
- `cliente` - Datos del formulario {nombre, correo, telefono, direccion, contrasena}
- `confirmarContrasena` - Campo de confirmación de contraseña
- `verContrasena` - Toggle mostrar/ocultar contraseña
- `cargando` - Estado de carga

**Funciones:**
| Función | Descripción |
|---------|-------------|
| `handleChange(e)` | Actualiza datos del formulario |
| `handleSubmit(e)` | Envía datos de registro |
| `verOcultarContrasena()` | Toggle visibilidad contraseña |

**Validaciones:**
- Todos los campos obligatorios
- Email con formato válido
- Teléfono con formato válido
- Contraseña mínimo 8 caracteres
- Las contraseñas deben coincidir

**API:**
- `POST http://localhost/OcoboBack-end/CRUD/` - Registro de cliente

---

# OlvideContrasena

## Descripción
Componente para la recuperación de contraseña de usuarios.

## Estructura de Archivos
```
OlvideContrasena/
├── AppOlvideContrasena.jsx  # Componente raíz
├── Header.jsx               # Barra de navegación
└── Main.jsx                 # Formulario de recuperación
```

## Componentes

### 1. AppOlvideContrasena.jsx
**Propiedades:**
- `addCliente` (función): Función para agregar cliente

**Descripción:** Contenedor principal.

---

### 2. Header.jsx
**Propiedades:** No recibe props

**Descripción:** Barra de navegación simple.

---

### 3. Main.jsx
**Propiedades:**
- `addCliente` (función): Función para agregar cliente

**Descripción:** Formulario para recuperar contraseña.

**Estados:**
- `correo` - Email del usuario
- `cargando` - Estado de carga

**Funciones:**
| Función | Descripción |
|---------|-------------|
| `handleChange(e)` | Actualiza el correo |
| `handleSubmit(e)` | Envía solicitud de recuperación |

**API:**
- `POST http://localhost/OcoboBack-end/CRUD/` - Recuperar contraseña

---

# Cuenta

## Descripción
Componente para gestionar la cuenta del usuario logeado.

## Estructura de Archivos
```
Cuenta/
├── AppCuenta.jsx    # Componente raíz
├── Header.jsx       # Barra de navegación
└── Main.jsx         # Gestión de cuenta
```

## Componentes

### 1. AppCuenta.jsx
**Propiedades:** No recibe props

**Descripción:** Contenedor principal.

---

### 2. Header.jsx
**Propiedades:** No recibe props

**Descripción:** Barra de navegación.

---

### 3. Main.jsx
**Propiedades:** No recibe props

**Descripción:** Panel de gestión de cuenta de usuario.

**Funcionalidades esperadas:**
- Ver datos del perfil
- Editar información personal
- Cerrar sesión

---

# Historial

## Descripción
Componente para mostrar el historial de compras del usuario.

## Estructura de Archivos
```
Historial/
├── AppHIstorial.jsx   # Componente raíz (note el error tipográfico)
├── Header.jsx         # Barra de navegación
├── Main.jsx           # Lista de compras
└── Items.jsx          # Item de compra
```

## Componentes

### 1. AppHistorial.jsx
**Propiedades:** No recibe props

**Descripción:** Contenedor principal con fondo de imagen Logo.jpeg.

---

### 2. Header.jsx
**Propiedades:** No recibe props

**Descripción:** Barra de navegación.

---

### 3. Main.jsx
**Propiedades:** No recibe props

**Descripción:** Lista de compras anteriores del usuario.

---

### 4. Items.jsx
**Propiedades:** No especificadas

**Descripción:** Componente para renderizar cada compra en el historial.

---

# Compra

## Descripción
Componente para la confirmación de compra de productos.

## Estructura de Archivos
```
Compra/
├── AppCompra.jsx   # Componente raíz
├── Header.jsx      # Barra de navegación
└── Main.jsx        # Proceso de compra
```

## Componentes

### 1. AppCompra.jsx
**Propiedades:** No recibe props

**Descripción:** Contenedor principal con fondo de imagen Logo.jpeg.

---

### 2. Header.jsx
**Propiedades:** No recibe props

**Descripción:** Barra de navegación.

---

### 3. Main.jsx
**Propiedades:** No recibe props

**Descripción:** Página de confirmación de compra.

---

# MetodosDePagoNoLogeado

## Descripción
Componente para seleccionar método de pago sin haber iniciado sesión.

## Estructura de Archivos
```
MetodosDePagoNoLogeado/
├── AppMetodosDePagoNoLogeado.jsx  # Componente raíz
├── Header.jsx                     # Barra de navegación
├── Main.jsx                       # Métodos de pago
├── Footer.jsx                     # Pie de página
├── Items.jsx                      # Item de método de pago
├── ItemsCarrito.jsx               # Items del carrito
└── Icons/
    └── IconCheck.jsx              # Icono check
```

## Componentes

### 1. AppMetodosDePagoNoLogeado.jsx
**Propiedades:**
- `login` (función): Función para iniciar sesión

**Descripción:** Contenedor principal que pasa login al Header.

---

### 2. Header.jsx
**Propiedades:**
- `login` (función): Función para login

**Descripción:** Barra de navegación con login.

---

### 3. Main.jsx
**Propiedades:** No recibe props

**Descripción:** Muestra métodos de pago disponibles.

---

### 4. Footer.jsx
**Propiedades:** No recibe props

**Descripción:** Pie de página.

---

### 5. Items.jsx
**Propiedades:** No especificadas

**Descripción:** Renderiza cada método de pago.

---

### 6. ItemsCarrito.jsx
**Propiedades:** No especificadas

**Descripción:** Muestra productos del carrito.

---

### 7. IconCheck.jsx
**Descripción:** Icono de verificación.

---

# MetodosDePagoLogeado

## Descripción
Componente para seleccionar método de pago habiendo iniciado sesión.

## Estructura de Archivos
```
MetodosDePagoLogeado/
├── AppMetodosDePagoLogeado.jsx  # Componente raíz
├── Header.jsx                    # Barra de navegación
├── Main.jsx                      # Métodos de pago
├── Footer.jsx                    # Pie de página
├── Items.jsx                      # Item de método de pago
├── ItemsCarrito.jsx              # Items del carrito
└── Icons/
    └── IconCheck.jsx             # Icono check
```

## Componentes

### 1. AppMetodosDePagoLogeado.jsx
**Propiedades:** No recibe props

**Descripción:** Contenedor principal (versión logeada).

---

### 2. Header.jsx
**Propiedades:** No recibe props

**Descripción:** Barra de navegación sin login.

---

### 3-7. Main.jsx, Footer.jsx, Items.jsx, ItemsCarrito.jsx, IconCheck.jsx
Similares a MetodosDePagoNoLogeado.

---

# ContactoNoLogeado

## Descripción
Componente de formulario de contacto para usuarios sin sesión.

## Estructura de Archivos
```
ContactoNoLogeado/
├── AppContactoNoLogeado.jsx  # Componente raíz
├── Header.jsx                 # Barra de navegación
├── Main.jsx                   # Formulario de contacto
├── Footer.jsx                 # Pie de página
├── Items.jsx                  # Información de contacto
├── ItemsCarrito.jsx           # Items del carrito
└── Icons/
    └── IconCheck.jsx          # Icono check
```

## Componentes

### 1. AppContactoNoLogeado.jsx
**Propiedades:**
- `login` (función): Función para iniciar sesión

**Descripción:** Contenedor principal.

---

### 2. Header.jsx
**Propiedades:**
- `login` (función): Función para login

**Descripción:** Barra de navegación con login.

---

### 3. Main.jsx
**Propiedades:** No recibe props

**Descripción:** Formulario de contacto.

**Estados esperados:**
- `nombre`
- `correo`
- `mensaje`

**Funciones:**
- `handleChange(e)` - Actualiza campos
- `handleSubmit(e)` - Envía mensaje

---

### 4. Footer.jsx
**Propiedades:** No recibe props

**Descripción:** Pie de página.

---

### 5. Items.jsx, 6. ItemsCarrito.jsx, 7. IconCheck.jsx
Similar a otros componentes.

---

# ContactoLogeado

## Descripción
Componente de formulario de contacto para usuarios logeados.

## Estructura de Archivos
```
ContactoLogeado/
├── AppContactoLogeado.jsx  # Componente raíz
├── Header.jsx               # Barra de navegación
├── Main.jsx                 # Formulario de contacto
├── Footer.jsx               # Pie de página
├── Items.jsx                # Información de contacto
├── ItemsCarrito.jsx         # Items del carrito
└── Icons/
    └── IconCheck.jsx        # Icono check
```

## Componentes

### 1. AppContactoLogeado.jsx
**Propiedades:** No recibe props

**Descripción:** Contenedor principal (versión logeada).

---

### 2. Header.jsx
**Propiedades:** No recibe props

**Descripción:** Barra de navegación sin login.

---

### 3-7. Main.jsx, Footer.jsx, Items.jsx, ItemsCarrito.jsx, IconCheck.jsx
Similar a ContactoNoLogeado pero el usuario ya está logeado (puede prellenar datos).

---

# Resumen de Rutas

| Ruta | Componente |
|------|------------|
| `/` | InicioNoLogeado |
| `/Registro` | Registro |
| `/olvidemicontrasena` | OlvideContrasena |
| `/Inicio/Productos` | InicioLogeado |
| `/Inicio/Cuenta` | Cuenta |
| `/Inicio/HistorialdeCompras` | Historial |
| `/Inicio/Productos/Compra` | Compra |
| `/MetodosDePago` | MetodosDePagoNoLogeado |
| `/Inicio/MetodosDePago` | MetodosDePagoLogeado |
| `/Contacto` | ContactoNoLogeado |
| `/Inicio/Contacto` | ContactoLogeado |

---

# Tecnologías Utilizadas

- **React** - Framework principal
- **React Router** - Navegación
- **Reactstrap** - Componentes Bootstrap (Modal)
- **Axios** - Peticiones HTTP
- **SweetAlert2** - Alertas y notificaciones
- **Tailwind CSS** - Estilos
- **UUID** - IDs únicos
- **Font Awesome** - Iconos (fa-brands)
