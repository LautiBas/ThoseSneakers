let productosContainer = document.getElementById("contenedor");

let stockProductos = [
{
    id: 1,
    img: "/imagenes/catalogo/jordanhigh.png",
    nombre: `air jordan 1 bloodline`,
    cantidad: 1,
    precio: 150000,
},
{
    id: 2,
    img: "/imagenes/catalogo/chicago.png",
    nombre: "jordan 1 mid chicago",
    cantidad: 1,
    precio: 150000,
},
{
    id: 3,
    img: "/imagenes/catalogo/travis.png",
    nombre: "jordan 1 travis scott",
    cantidad: 1,
    precio: 250000,
},
{
    id: 4,
    img: "/imagenes/catalogo/m&m.png",
    nombre: "adidas forum low M&M's",
    cantidad: 1,
    precio: 90000,
},
{
    id: 5,
    img: "/imagenes/catalogo/offw.png",
    nombre: "jordan 4 off-white",
    cantidad: 1,
    precio: 105000,
},
{
    id: 6,
    img: "/imagenes/catalogo/y380.png",
    nombre: "adidas yeezy boost 380",
    cantidad: 1,
    precio: 150000,
},
{
    id: 7,
    img: "/imagenes/catalogo/dunk1.png",
    nombre: "nike dunk low 5 on it",
    cantidad: 1,
    precio: 105000,
},
{
    id: 8,
    img: "/imagenes/catalogo/airmax1.png",
    nombre: "nike air max 90 charms",
    cantidad: 1,
    precio: 85000,
},
{
    id: 9,
    img: "/imagenes/catalogo/jordan1.png",
    nombre: "air jordan 1 retro high",
    cantidad: 1,
    precio: 100000,
},
{
    id: 10,
    img: "/imagenes/catalogo/jordanmid.png",
    nombre: "air jordan 1 mid sonics",
    cantidad: 1,
    precio: 110000,
},
{
    id: 11,
    img: "/imagenes/catalogo/converse1.png",
    nombre: "converse off-white",
    cantidad: 1,
    precio: 155000,
},
{
    id: 12,
    img: "/imagenes/catalogo/dunk2.png",
    nombre: "nike dunk green strike",
    cantidad: 1,
    precio: 180000,
},
{
    id: 13,
    img: "/imagenes/catalogo/yeezy.png",
    nombre: "yeezy 350 frozen yellow",
    cantidad: 1,
    precio: 165300,
},
{
    id: 14,
    img: "/imagenes/catalogo/bb.png",
    nombre: "adidas yeezy slide onyx",
    cantidad: 1,
    precio: 35000,
  },
  {
    id: 15,
    img: "/imagenes/catalogo/jordan4.png",
    nombre: "air jordan 4 neon volt",
    cantidad: 1,
    precio: 118300,
  },
];

function crearTarjetas(array, contenedor) {
  if (contenedor){
  contenedor.innerHTML = "";

  for (const item of array) {
    let producto = document.createElement("a");
    producto.className = "text-decoration-none";
    producto.innerHTML = ` 
            <div class="card productos_zapas" style="width: 18rem">
            <img
            src=${item.img}
            class="card-img-top"
            alt="chicago"
            />
            <div class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <b class="card-text">$${item.precio}</b>
            <button class="btn btn-primary" onclick="agregarProducto(${item.id})">Agregar al carrito</button>
            </div>
        </div>
    `;   
    contenedor.append(producto);
}
}
}

crearTarjetas(stockProductos, productosContainer)

let busqueda = document.querySelectorAll(".inputBusqueda");

function buscar(array, criterio, input) {
  return array.filter((item) => item[criterio].includes(input));
}

busqueda.forEach((input) => {
  input.addEventListener("input", () => {
    let cadena = input.value.toLowerCase();
    console.log(cadena);
    crearTarjetas(buscar(stockProductos, input.id, cadena), productosContainer);
  });
});


let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});

if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      swal("Alto!", "Debes agregar productos al carrito para continuar", "error");
    } else {
      location.href = "compra.html";
    }
  });
}

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: $${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>$${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e){
  e.preventDefault()
  const cliente = document.querySelector('#cliente').value
  const email = document.querySelector('#correo').value

  if(email === '' || cliente == ''){
    swal({
      title: "Campos incompletos!",
      text: "Llena el formulario antes de confirmar la compra!",
      icon: "warning",
      button: "Aceptar",
    });
} else {

  const btn = document.getElementById('button');


  btn.value = 'Enviando...';

  const serviceID = 'default_service';
  const templateID = 'template_qxwi0jn';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
  const spinner = document.querySelector('#spinner')
  spinner.classList.add('d-flex')
  spinner.classList.remove('d-none')

  setTimeout(() => {
    spinner.classList.remove('d-flex')
    spinner.classList.add('d-none')
    formulario.reset()

    const alertExito = document.createElement('p')
    alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
    alertExito.textContent = 'Compra realizada correctamente'
    formulario.appendChild(alertExito)

  setTimeout(() => {
      alertExito.remove()
    }, 3000)


  }, 3000)
}
localStorage.clear()

}