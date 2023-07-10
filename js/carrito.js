const producto = [
  {
    id: "001",
    nombre: "Badana Clasica Negra",
    descripcion:
      "Licra poliéster, tela grabada • Protección UV • Badana en gel • Tirantes en Malla",
    precio: 61500,
  },
  {
    id: "002",
    nombre: "Badana Clasica Azul",
    descripcion:
      "Licra poliéster • Badana en gel • (Recorridos de 3 a 4 horas aproximadamente) • Protección UV",
    precio: 61500,
  },
  {
    id: "003",
    nombre: "Badana Clasica Blanca",
    descripcion:
      "Licra poliéster, tela grabada • Protección UV • Badana en gel • (Para Recorridos superiores a 5 horas)",
    precio: 89000,
  },
  {
    id: "004",
    nombre: "Badana Clasica Gris",
    descripcion:
      "Licra poliéster • Badana en gel • (Recorridos de 3 a 4 horas) • Tirantes en malla • Protección UV",
    precio: 61500,
  },
  {
    id: "005",
    nombre: "Cortavientos",
    descripcion:
      "Tela semi-impermeable • Banda Siliconada parte baja • Cremallera reflectiva • Línea reflectiva en la espalda.",
    precio: 53000,
  },
  {
    id: "006",
    nombre: "Casco POC",
    descripcion:
      "casco completo con carcasa unibody completamente con un forro de EPS para el equilibrio ideal entre peso y protección.",
    precio: 999000,
  },
  {
    id: "007",
    nombre: "Jersey Colombia",
    descripcion:
      "Está diseñada para satisfacer las exigencias de aquellas personas que buscan versatilidad y la máxima comodidad.",
    precio: 195000,
  },
  {
    id: "008",
    nombre: "Jersey Giro",
    descripcion:
      "tipo de tejido más flexible, mangas en corte limpio que hace la prenda más ligera y aerodinámica",
    precio: 299000,
  },
  {
    id: "009",
    nombre: "Jersey Tour",
    descripcion:
      "creado con tejidos de alto rendimiento. Cuenta con máxima transpirabilidad y comodidad con cada uso.",
    precio: 250000,
  },
];
const usuarios = [
  {
    id: "001",
    usuario: "test1",
    contrasena: "test1",
    nombre: "Andres Alarcon",
    telefono: "3001234567",
    direccion: "calle 123, Apartamento 123",
    ciudad: "Bogotá",
    email: "andres.test@gmail.com",
  },
  {
    id: "002",
    usuario: "test2",
    contrasena: "test2",
    nombre: "Tutor CoderHouse",
    telefono: "5001234567891",
    direccion: "calle Falsa 123, Apartamento 000",
    ciudad: "Argentina",
    email: "coderhouse.test@gmail.com",
  },
];
let ArrayCarrito = JSON.parse(localStorage.getItem("prodCarrito")) || [];
let totalPrecio = ArrayCarrito.reduce(
  (acum, actual) => acum + actual.precio,
  0
);
let totalProductos = ArrayCarrito.length;
let validarUsuario = {};
let listaMostrarCarrito;

const estadoCarrito = document.getElementById("estadoCarrito");
const tablaResumenCarrito = document.getElementById("tablaResumenCarrito");
const botonLogin = document.getElementById("botonLogin");
const botonInvitado = document.getElementById("botonInvitado");
const eliminarCarrito = document.getElementById("eliminarCarrito");
const confirmarPedido = document.getElementById("confirmarPedido");

ArrayCarrito[0] ? renderCarrito() : renderEstadoCarrito();
document.getElementsByClassName("conteo")[0].innerHTML = totalProductos;

document.getElementById("continuaCompra").onclick = function () {
  document.getElementsByClassName("tituloForm")[0].classList.add("hidden");
  document.getElementById("resumenCarrito").classList.add("hidden");
  document.getElementsByClassName("cuadroLogin")[0].classList.remove("hidden");
};

botonLogin.addEventListener("click", () => {
  usuario = document.getElementById("usuario").value;
  contrasena = document.getElementById("contrasena").value;
  !usuario || !contrasena
    ? document.getElementById("errorIngreso").classList.remove("hidden")
    : authUsuario(usuario, contrasena);
});

botonInvitado.addEventListener("click", () => {
    renderizarPedido();
    renderizarConfirmacionPedido();
})

eliminarCarrito.addEventListener("click", () => {
    localStorage.removeItem('prodCarrito');
    location.reload();
})

confirmarPedido.addEventListener("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pedido realizado correctamente',
        text: 'el pago se hará contraentrega en la dirección ingresada, Gracias.',
        showConfirmButton: false,
        timer: 5000
      })
      localStorage.removeItem('prodCarrito');
        setTimeout(() => {location.reload();},5000);
})


///////////////
///FUNCIONES///
///////////////

function renderCarrito() {
  estadoCarrito.classList.add("hidden");
  listaMostrarCarrito = quitarDuplicados(ArrayCarrito);
  listaMostrarCarrito.forEach((element) => {
    cantidad = contarCantidad(element.id);
    document.getElementById("tablaResumenCarrito").insertRow(-1).innerHTML =
      "<td>" +
      element.nombre +
      "</td><td>" +
      element.descripcion +
      "</td><td>$" +
      element.precio +
      "</td><td>" +
      cantidad +
      '</td><td><button class="botonPapelera" value=' +
      element.id +
      ' onclick="removeCarrito(value)"><a><img src="../imagenes/papelera.png" class="iconoPapelera" alt="papelera"></a></button></td>';
  });
  document.getElementById("tablaResumenCarrito").insertRow(-1).innerHTML =
    "<td>TOTAL</td><td></td><td>$" +
    totalPrecio +
    "</td><td>" +
    totalProductos +
    "</td><td></td>";
}

function renderEstadoCarrito() {
  resumenCarrito.classList.add("hidden");
}

function removeCarrito(value) {
  let ubi = ArrayCarrito.findIndex((producto) => producto.id == value);
  console.log(ubi);
  ArrayCarrito.splice(ubi, 1);
  localStorage.setItem("prodCarrito", JSON.stringify(ArrayCarrito));
  location.reload();
}

function quitarDuplicados(array) {
  let carritoMap = array.map((producto) => {
    return [producto.id, producto];
  });
  let carritoMapArr = new Map(carritoMap);
  let productoUnicoCarrito = [...carritoMapArr.values()];
  return productoUnicoCarrito;
}

function contarCantidad(id) {
  let cant = ArrayCarrito.filter((e) => e.id == id).length;
  return cant;
}

function authUsuario(usuario, contrasena) {
  validarUsuario = usuarios.find((e) => e.usuario == usuario);
  if (validarUsuario && contrasena == validarUsuario.contrasena) {
    renderizarPedido();
    diligenciarForm(validarUsuario);
    renderizarConfirmacionPedido();
  } else {
    document.getElementById("errorIngreso").classList.remove("hidden");
  }
}

function renderizarPedido() {
    document.getElementById("errorIngreso").classList.add("hidden");
    document.getElementById("titulo").innerHTML = "Confirmación Pedido";
    document.getElementsByClassName("cuadroLogin")[0].classList.add("hidden");
    document.getElementsByClassName("tituloForm")[0].classList.remove("hidden");
    document.getElementsByClassName("pedido")[0].classList.remove("hidden");
}

function diligenciarForm(validarUsuario) {
  document.getElementById("nombre").value = validarUsuario.nombre;
  document.getElementById("telCel").value = validarUsuario.telefono;
  document.getElementById("ciudad").value = validarUsuario.ciudad;
  document.getElementById("direccion").value = validarUsuario.direccion;
  document.getElementById("email").value = validarUsuario.email;
}

function renderizarConfirmacionPedido() {
  listaMostrarCarrito.forEach((element) => {
    cantidad = contarCantidad(element.id);
    document.getElementById("tablaResumenPedido").insertRow(-1).innerHTML =
      "<td>" +
      element.nombre +
      "</td><td>" +
      element.precio +
      "</td><td>" +
      cantidad +
      "</td>";
  });
  document.getElementById("tablaResumenPedido").insertRow(-1).innerHTML =
    "<td>TOTAL</td><td>$" +
    totalPrecio +
    "</td><td>" +
    totalProductos +
    "</td>";
}
