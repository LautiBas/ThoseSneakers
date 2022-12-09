let productosContainer = document.getElementById("contenedor");

let stockProductos = [
  {
    id: 1,
    img: "../imagenes/ofertas/forum.png",
    nombre: `adidas forum low mesa brown`,
    cantidad: 1,
    precio: 40000,
  },
  {
    id: 2,
    img: "../imagenes/ofertas/af1.png",
    nombre: "air force 1 low '07 triple black",
    cantidad: 1,
    precio: 37000,
  },
  {
    id: 3,
    img: "../imagenes/ofertas/2002r.png",
    nombre: "new balance 2002R white blue",
    cantidad: 1,
    precio: 45600,
  },
  {
    id: 4,
    img: "../imagenes/ofertas/jordan1low.png",
    nombre: "air jordan 1 Low electric green",
    cantidad: 1,
    precio: 42000,
  },
  {
    id: 5,
    img: "../imagenes/ofertas/airmax.png",
    nombre: "nike air max 90 recraft hyper grape",
    cantidad: 1,
    precio: 50000,
  },
  {
    id: 6,
    img: "../imagenes/ofertas/yeezy500.png",
    nombre: "adidas yeezy 500 high slate",
    cantidad: 1,
    precio: 52000,
  },
  {
    id: 7,
    img: "../imagenes/ofertas/nmd.png",
    nombre: "adidas NMD V3 triple black",
    cantidad: 1,
    precio: 57000,
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
  /*    
    //Acá puedo limpiar el input cada vez que me salgo
    input.onblur=()=>{
            input.value='';
        } */
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
            <td>$${precio * cantidad}</td>
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