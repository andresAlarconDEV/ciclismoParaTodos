const producto = [
    {
        'id': '001',
        'nombre': 'Badana Clasica Negra',
        'descripcion': 'Licra poliéster, tela grabada • Protección UV • Badana en gel • Tirantes en Malla',
        'precio': 61500
    },
    {
        'id': '002',
        'nombre': 'Badana Clasica Azul',
        'descripcion': 'Licra poliéster • Badana en gel • (Recorridos de 3 a 4 horas aproximadamente) • Protección UV',
        'precio': 61500
    },
    {
        'id': '003',
        'nombre': 'Badana Clasica Blanca',
        'descripcion': 'Licra poliéster, tela grabada • Protección UV • Badana en gel • (Para Recorridos superiores a 5 horas)',
        'precio': 89000
    },
    {
        'id': '004',
        'nombre': 'Badana Clasica Gris',
        'descripcion': 'Licra poliéster • Badana en gel • (Recorridos de 3 a 4 horas) • Tirantes en malla • Protección UV',
        'precio': 61500
    },
    {
        'id': '005',
        'nombre': 'Cortavientos',
        'descripcion': 'Tela semi-impermeable • Banda Siliconada parte baja • Cremallera reflectiva • Línea reflectiva en la espalda.',
        'precio': 53000
    },
    {
        'id': '006',
        'nombre': 'Casco POC',
        'descripcion': 'casco completo con carcasa unibody completamente con un forro de EPS para el equilibrio ideal entre peso y protección.',
        'precio': 999000
    },
    {
        'id': '007',
        'nombre': 'Jersey Colombia',
        'descripcion': 'Está diseñada para satisfacer las exigencias de aquellas personas que buscan versatilidad y la máxima comodidad.',
        'precio': 195000
    },
    {
        'id': '008',
        'nombre': 'Jersey Giro',
        'descripcion': 'tipo de tejido más flexible, mangas en corte limpio que hace la prenda más ligera y aerodinámica',
        'precio': 299000
    }
    ,
    {
        'id': '009',
        'nombre': 'Jersey Tour',
        'descripcion': 'creado con tejidos de alto rendimiento. Cuenta con máxima transpirabilidad y comodidad con cada uso.',
        'precio': 250000
    }
]
let ArrayCarrito = JSON.parse(localStorage.getItem("prodCarrito")) || [];
document.getElementsByClassName('conteo')[0].innerHTML=ArrayCarrito.length;

function addCarrito(value) {
    prod = producto.find ( producto => producto.id == value);
    ArrayCarrito.push(prod);
    Swal.fire({
        position: 'bottom-end',
        text: 'Se ha añadido al carrito '+ prod.nombre,
        showConfirmButton: false,
        timer: 1500,
        backdrop: false
    })
    localStorage.setItem('prodCarrito', JSON.stringify(ArrayCarrito));
    document.getElementsByClassName('conteo')[0].innerHTML=ArrayCarrito.length;
}

