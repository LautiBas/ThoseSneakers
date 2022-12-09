const btnMostrar = document.querySelector('#dolar');
const usarJson = async function () {
    let response = await fetch('/js/data.json');
    let dolar = await response.json();
    console.log(dolar);
    swal(`El dolar que que se toma para valorar las zapatillas es el Blue y su valor actual es de $316`)
}
btnMostrar.onclick = usarJson;
