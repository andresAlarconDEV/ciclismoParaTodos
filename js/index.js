const token = 'a8d5faffbdcd4efea4debd47b895bcd1';
let ArrayCarrito = JSON.parse(localStorage.getItem("prodCarrito")) || [];
let totalProductos = ArrayCarrito.length;
document.getElementsByClassName('conteo')[0].innerHTML=totalProductos;
let reco = true;


window.addEventListener('load', function (){
    navigator.geolocation.getCurrentPosition(getLocOk, getLocError);
})

function getLocOk(pos) {
    let lat = pos.coords.latitude, lon = pos.coords.longitude;
    fetch('https://api.weatherbit.io/v2.0/current?lat='+ lat +'&lon='+ lon +'&key='+token+'&lang=es')
    .then((response) => {return response.json()})
    .then((res) => {
        renderReco(res.data[0])})
    .catch((error) => console.log('Servicio de Geolocalización no disponible\n'+error))
    // renderReco('a03n');
}

function getLocError(err) {
    console.log('para visualizar las recomendaciones del clima se debe aceptar la detección de ubicación');
}

function mostrarReco(){
    if (reco){
        document.getElementById("recoClima").classList.add("hidden");
        reco= false;
    }
    else
    {
        document.getElementById("recoClima").classList.remove("hidden");
        reco=true;
    }
}

function renderReco(res){
    document.getElementById("clima").classList.remove("hidden");
    let src = 'https://cdn.weatherbit.io/static/img/icons/'+res.weather.icon+'.png';
    document.getElementById("imgClima").src = src;
    console.log(res);
}