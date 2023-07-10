let ArrayCarrito = JSON.parse(localStorage.getItem("prodCarrito")) || [];
let totalProductos = ArrayCarrito.length;
document.getElementsByClassName('conteo')[0].innerHTML=totalProductos;