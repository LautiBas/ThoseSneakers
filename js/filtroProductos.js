let productosContainer = document.getElementById("inyector");

let productos = [
  {
    id: 1,
    url: "../imagenes/catalogo/jordanhigh.png",
    nombre: `air jordan 1 bloodline`,
    price: "$150.000",
  },
  {
    id: 2,
    url: "../imagenes/catalogo/travis.png",
    nombre: "jordan 1 mid chicago",
    price: "$150.000",
  },
  {
    id: 3,
    url: "../imagenes/catalogo/chicago.png",
    nombre: "jordan 1 travis scott",
    price: "SIN STOCK",
  },
  {
    id: 4,
    url: "../imagenes/catalogo/m&m.png",
    nombre: "adidas forum low M&M's",
    price: "$90.000",
  },
  {
    id: 5,
    url: "../imagenes/catalogo/offw.png",
    nombre: "jordan 4 off-white",
    price: "$105.000",
  },
  {
    id: 6,
    url: "../imagenes/catalogo/y380.png",
    nombre: "adidas yeezy boost 380",
    price: "$140.000",
  },
  {
    id: 7,
    url: "../imagenes/catalogo/dunk1.png",
    nombre: "nike dunk low 5 on it",
    price: "$105.000",
  },
  {
    id: 8,
    url: "../imagenes/catalogo/airmax1.png",
    nombre: "nike air max 90 charms",
    price: "$85.000",
  },
  {
    id: 9,
    url: "../imagenes/catalogo/jordan1.png",
    nombre: "air jordan 1 retro high",
    price: "$100.000",
  },
  {
    id: 10,
    url: "../imagenes/catalogo/jordanmid.png",
    nombre: "air jordan 1 mid sonics",
    price: "$110.000",
  },
  {
    id: 11,
    url: "../imagenes/catalogo/converse1.png",
    nombre: "converse off-white",
    price: "$155.000",
  },
  {
    id: 12,
    url: "../imagenes/catalogo/dunk2.png",
    nombre: "nike dunk green strike",
    price: "$180.000",
  },
  {
    id: 13,
    url: "../imagenes/catalogo/yeezy.png",
    nombre: "yeezy 350 frozen yellow",
    price: "$165.300",
  },
  {
    id: 14,
    url: "../imagenes/catalogo/bb.png",
    nombre: "adidas yeezy slide onyx",
    price: "$35.000",
  },
  {
    id: 15,
    url: "../imagenes/catalogo/jordan4.png",
    nombre: "air jordan 4 neon volt",
    price: "$118.300",
  },
];

function crearTarjetas(array, contenedor) {
  contenedor.innerHTML = "";

  for (const item of array) {
    let producto = document.createElement("a");
    producto.className = "text-decoration-none";
    producto.href = "#";
    producto.innerHTML = ` 
            <div class="card productos_zapas" style="width: 18rem">
            <img
                src=${item.url}
                class="card-img-top"
                alt="chicago"
            />
            <div class="card-body">
                <h5 class="card-title">${item.nombre}</h5>
                <b class="card-text">${item.price}</b>
            </div>
            </div>
        `;
    contenedor.append(producto);
  }
}

function buscar(array, criterio, input) {
  return array.filter((item) => item[criterio].includes(input));
}

crearTarjetas(productos, productosContainer);

let busqueda = document.querySelectorAll(".inputBusqueda");

busqueda.forEach((input) => {
  input.addEventListener(`input`, () => {
    let cadena = input.value.toLowerCase();
    console.log(cadena);
    crearTarjetas(buscar(productos, input.id, cadena), productosContainer);
  });
});
