let ArrayCarrito = JSON.parse(localStorage.getItem("prodCarrito")) || [];
let totalProductos = ArrayCarrito.length;
document.getElementsByClassName('conteo')[0].innerHTML=totalProductos;


window.addEventListener('load', function (){

    console.log(navigator);
    console.log(navigator.geolocation);   

})