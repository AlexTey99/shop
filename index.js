

document.addEventListener('mouseup', function(e) {
  var menuContainer = document.getElementById('addCar');
  let car = document.getElementById('trolley')// icono del carrito
  if (!menuContainer.contains(e.target) && !car.contains(e.target)) {
    $("#addCar").addClass("collapse");
  }
});


// Función para mostrar el div de los objetos seleccionados
const showContainer = () => {

  const divElement = document.getElementById('addCar');
  const contieneElementos = divElement.children.length > 0;
  
  if (contieneElementos) {
    $("#addCar").removeClass("collapse");
    document.getElementById('addCar').style.display = 'flex';
  } else {
    console.log('El div está vacío.');
  }
  
}

// Variable para almacenar todos los productos
let allProducts = []
// Función para crear los elementos del DOM a partir de la API
const divCreator = () => {
  fetch(`https://fakestoreapi.com/products/`)
  .then(response => response.json())
  .then(data => {
    allProducts = data; // Almacenamos todos los productos en la variable allProducts
    updateProducts(allProducts); // Llamamos a la función para crear los elementos del DOM con todos los productos
  });
}

divCreator();

// Variable para almacenar el estado de la búsqueda
let searchResults = []

// Función para realizar la búsqueda y mostrar los resultados
function searchByName() {
  const searchInput = document.getElementById("input");
  const clothesContainer = document.getElementById("clothes");

  // Obtenemos el valor del input de búsqueda
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Limpiamos el contenedor de resultados
  clothesContainer.innerHTML = "";

  // Realizamos la búsqueda solo si hay un término de búsqueda válido
  if (searchTerm) {
    // Filtramos los productos que coinciden con el término de búsqueda en el título
    searchResults = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm)
    )

    // Mostramos los resultados en el contenedor "clothesContainer"
    updateProducts(searchResults);
  } else {
    // Si no hay término de búsqueda, mostramos todos los productos nuevamente
    updateProducts(allProducts);
  }
}

// Función para crear los elementos del DOM con un conjunto de productos
function updateProducts(products) {
  const clothesContainer = document.getElementById("clothes");

  // Utilizamos un bucle for para crear los elementos del DOM
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    
    let productDiv = `<div id="${product.id}" class='elementDiv'>
                        <img class="img" src="${product.image}" />
                        <p>${product.title}</p>
                        <p>${product.category}</p>
                        <p>${product.price}</p>
                        <button onclick="addProductToCart('${product.id}')">Add to Cart</button>
                      </div>`;

    clothesContainer.insertAdjacentHTML('beforeend', productDiv);
  }
}

// Funcion que ordena de mayor precio a menor
const highPrice = () => {
  const clothesContainer = document.getElementById("clothes");
  let orderHigh = [];
  
  orderHigh = allProducts.sort((a, b) => b.price - a.price);
  clothesContainer.innerHTML = "";

  updateProducts(orderHigh);
  
}

// Funcion que ordena de menor precio a mayor
const lowPrice = () => {
  const clothesContainer = document.getElementById("clothes");
  let orderLow = [];
  
  orderLow = allProducts.sort((a, b) => a.price - b.price);
  clothesContainer.innerHTML = "";

  updateProducts(orderLow);
  
}


let numberContador = 0;


// Funcion para anadir los objetos al carrito
const addProductToCart = (id) => {
  // Coje el div por el id
  const containerDiv = document.getElementById(id);
  const containerCar = document.getElementById('addCar');
  const contador = document.getElementById('contador');


  let productoClonado = containerDiv.cloneNode(true);

  // Lista de clases predefinidas
  const classList = ['clase-1', 'clase-2', 'clase-3', 'clase-4', 'clase-5']; // Puedes agregar más clases según tus necesidades

  // Índice para llevar el seguimiento de la clase actual
  let currentIndex = 0;

  // Recorrer los elementos hijos del nodo clonado y asignar una clase de la lista
  productoClonado.querySelectorAll('*').forEach((element) => {
    const currentClass = classList[currentIndex % classList.length];
    element.classList.add(currentClass);
    currentIndex++;
  });

  // Crear un div para mover los elementos con las clases 2, 4 y 5
  const divMover = document.createElement('div');
  divMover.classList.add('div-mover');

  // Recorrer los elementos hijos del nodo clonado y moverlos al div creado si tienen las clases 2, 4 o 5
  productoClonado.querySelectorAll('*').forEach((element) => {
    if (element.classList.contains('clase-2') || element.classList.contains('clase-4') || element.classList.contains('clase-5')) {
      divMover.appendChild(element);
    }
  });

    // Agregar el icono de eliminar al divMover
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
    divMover.appendChild(deleteIcon);
  
    // Agregar evento de click al icono para eliminar el producto clonado
    deleteIcon.addEventListener('click', () => {
      productoClonado.remove();

      // Disminuye el numero del contador al ser eliminado
      numberContador--;
      contador.textContent = numberContador;

      if (numberContador == 0){
        contador.style.display = 'none';
      }

    });

  productoClonado.classList.add('producto-carrito');

  // Agregar el div movido al contenedor del carrito
  productoClonado.appendChild(divMover);
  containerCar.appendChild(productoClonado);


  contador.style.display = 'flex';
  numberContador = numberContador + 1;
  contador.textContent = numberContador;

};


