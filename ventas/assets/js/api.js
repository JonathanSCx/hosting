'use strict';

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
const urlencoded = new URLSearchParams();
urlencoded.append("user", "user_pruebas");
urlencoded.append("pwd", "Pru3B@5.");
  
const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

const d = document;
const $selectPrimary = d.getElementById("select-primary");
const $selectSecondary = d.getElementById("select-secondary");
const $btnAgregar = d.getElementById("add");
$btnAgregar.disabled = true;
const $btnEnviar = d.getElementById("btnEnviar");
  

  //Fetch para API de los procd
  fetch("https://www.infofast.com.mx/Erick/service/productos/", requestOptions)
    .then(response => response.text())
    .then(result => {
        const productos = JSON.parse(result);
        let $options = `<option value="">Elige un producto</option>`;
        productos.forEach(el => $options +=  `<option id="${el.id_producto}" class="optionProduct"
        value="${el.Precio}">${el.nombre}
        </option>`);
        $selectPrimary.innerHTML = $options;
        })
    .catch(error => console.log('error', error));


    //Fetch para API de los clientes
    fetch("https://www.infofast.com.mx/Erick/service/clientes/", requestOptions)
        .then(response => response.text())
        .then(result => {
            const clientes = JSON.parse(result);
            let $options = `<option value="">Elige un Cliente</option>`;
            clientes.forEach(el => $options +=  `<option id="${el.id_cliente}" class="optionClient"
            value="${el.nombre}">${el.nombre}
            </option>`);
            $selectSecondary.innerHTML = $options;
        })
    .catch(error => console.log('error', error));

    //Eventos

    //Valor del select
//let producto = d.querySelector(".optionProduct")
let total= 0.0

$btnAgregar.addEventListener('click', ()=>{
    let contenedor = d.getElementById("productosList");
    let div = d.createElement('div');
    let listado = d.createElement('h4');
    let producto = d.getElementById("select-primary");

    if(producto.value == 0){
      console.log("error");
    }else{
      listado.innerHTML = `Subtotal $${producto.value}`;
      //Se agregan los elemntos del DOM
      div.appendChild(listado);
      contenedor.appendChild(div);

      let subTotalProduct = parseFloat(producto.value);

      total += subTotalProduct;
      console.log(total)
      totalCompra.value = total.toFixed(2)
    }
  }
)

function botonHabilitado(){
  let producto = d.getElementById("select-primary");
  if(producto.value == 0){
    $btnAgregar.disabled = true;
  }else{
    $btnAgregar.disabled = false;
  }
}

//Validación para formulario
d.addEventListener("DOMContentLoaded", function() {
  d.getElementById("form").addEventListener('submit', validarFormulario); 
});

function validarFormulario(event){
  event.preventDefault();
  let cliente = d.getElementById("select-secondary");
  let fecha = d.getElementById("fecha");
  console.log(cliente.value);
  if(confirm("¿Deseas enviar la orden de compra?") == true) {
    if(cliente.value === "" || total == 0.0 || fecha.value == ""){
      alert("No has rellenado correctamente la orden de venta");
      return
    }else{
      if(validarFecha() == true){
        alert("Has completado la orden de venta");
        this.submit();
      }else{
        alert("La fecha de la orden debe ser a futuro");
      return
      }
    
    }
  } else {
    alert("Aún no confirmas la orden de venta");
    return
  }
}

function validarFecha(){
  var hoy = new Date();
  var fechaFormulario = new Date(d.getElementById("fecha").value);
  hoy.setHours(0,0,0,0); 

  if (hoy <= fechaFormulario) {
    return true
  }else{
    return false
  }
}

