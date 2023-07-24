const token = 'a8d5faffbdcd4efea4debd47b895bcd1';
const codigoClima = [{
    "id": '1',
    "nombre": "tormenta",
    "mensaje": "Es mejor postergar la salida en Bici",
    "codigo": [200, 201, 202, 230, 231, 232, 233] 
    },
    {"id": '2',
    "nombre": "lluvia",
    "mensaje": "Sal abrigado y con ropa impermeable",
    "codigo": [300, 301, 302, 500, 501, 502, 511, 520, 521, 522, 700, 711, 721, 731, 741, 751] 
    },
    {"id": '3',
    "nombre": "nieve",
    "mensaje": "Las calles pueden tener nieve, aplaza la salida",
    "codigo": [600, 601, 602, 610, 611, 612, 621, 622, 623] 
    },
    {"id": '4',
    "nombre": "sol",
    "mensaje": "Hidrátate y aplica protector solar",
    "codigo": [800, 801, 802, 803, 804] 
    }
    ]

let ArrayCarrito = JSON.parse(localStorage.getItem("prodCarrito")) || [];
let totalProductos = ArrayCarrito.length;
document.getElementsByClassName('conteo')[0].innerHTML=totalProductos;
let reco = true, mensaje;


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
    document.getElementsByClassName('grados')[0].innerHTML=res.app_temp +"°C";
    document.getElementById('descripcion').innerHTML=res.weather.description;
    document.getElementById('ubicacion').innerHTML=res.city_name;
    
    res.pod=="n" ? document.getElementsByClassName('recomendacion')[0].innerHTML='Recuerda siempre ser visible para autos' : document.getElementsByClassName('recomendacion')[0].innerHTML=msjReco(res.weather.code);
    // console.log(res);
}

function msjReco(codigoB){
    codigoClima.forEach(function (e) {
      let indice = e.codigo.find((element) => element == codigoB);
      if (indice) {
        mensaje = e.mensaje;
      }
    });
    return mensaje;
  }