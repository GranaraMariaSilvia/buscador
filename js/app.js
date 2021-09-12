//variables
const marca = document.querySelector("#marca"); //traigo los id de cada campo ylos guardo en una variable
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//contenedor de la busqueda
const resultado = document.querySelector("#resultado"); //atrapo al elemento padre

const max = new Date().getFullYear(); //creo la variable del añio max que seria el año actual
const min = max - 10; //el valor del año minimo serian 10 menos del actual

//creo un objeto con la busqueda, el obj tiene que tener vacio ""
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
 
  color: ""
};

//eventos

document.addEventListener("DOMContentLoaded", () => {
  //aqui va estar todo lo que va aparecer cuando se cargue el documento
  mostrarAutos(autos);

  llenarSelect(); //funcion para llenar el año seleccionado
});

// eventos listener para los select de busqueda
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value; // le asigno el valor seleccionado a cada campo

  filtrarAutos();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value); //transfomro el año en un numero que no venga como string

  filtrarAutos(); //llamo a la funcion para filtrar
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;

  filtrarAutos();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
   filtrarAutos();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAutos();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAutos();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAutos();
  
});

//funciones

function mostrarAutos(autos) {
  limpiarHTML(); //eliminar html previo

  autos.forEach((auto) => {
    const autoHTML = document.createElement("p");

    autoHTML.textContent = `
            ${auto.marca} ${auto.modelo} - año: ${auto.year}- Puertas: ${auto.puertas}-
            Trasmision:${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color}
        `;
    resultado.appendChild(autoHTML);
  });
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarSelect() {
  for (let i = max; i >= min; i--) {
    // toma el valor de las variables creadas arriba.
    //i comienza en el año actual que es max y i es mayor o igual al min que serian menos 10 años
    const opcion = document.createElement("option"); //creo la etiqueta option del select
    opcion.value = i; // va tomar el valor del año seleccionado
    opcion.textContent = i; // va a escribir el valor

    year.appendChild(opcion); //agrega las opciones de año al select
  }
}

//funcion para filtrar los autos- Funcilnes de alto nivel funciones que toman como parametro otra funcion
function filtrarAutos() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor)
    
 if(resultado.length){ //si resultado tiene algo entonces mostrar autos
     mostrarAutos(resultado);

 }else{ //si no tiene nada llamo creo  esta funcion no resultado para mostrar cartel
     noResultado();
 }
}

function noResultado(){
    limpiarHTML();//la llamo para que me limpie y solo muestre el cartel si no hay resultados

  const noResultado = document.createElement('div');//creo el div le pongo clases y texto
    noResultado.classList.add('error','alerta');
    noResultado.textContent = 'No hay resultados';

    resultado.appendChild(noResultado);//lo pongo en el resultado
}

function filtrarMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  return auto;
}

function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  if(datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
    if(datosBusqueda.maximo) {
      return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
  }



function filtrarPuertas(auto){

    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto. transmision === datosBusqueda. transmision;
    }
    return auto;
}

function filtrarColor(auto){

    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}
