
let total = 0;
document.addEventListener("DOMContentLoaded", ()=> {
  var productosContainer = document.getElementById ("productos-container");

  fetch ("https://openlibrary.org/search.json?author=gabriel+rolon&publisher=planeta&limit=8")
  .then (Response => Response.json())
  .then ((data)=> {
      var producto = data.docs;
      productosContainer.innerHTML = ""; //vacia lo de producto container

      var i=0;
      producto.forEach((docs) => {
            i++;
          var cardDiv=document.createElement("div");
          cardDiv.className="col-md-2 d-flex" ;

          cardDiv.innerHTML=`              
              <div class="card mt-3" >
                  <img src="https://covers.openlibrary.org/b/isbn/${docs.isbn[0]}.jpg" class="card-img-top" alt="${docs.title}" style="height: auto">
                  <div class="card-body d-flex flex-column">
                      <h5 class="card-title"> ${docs.title} </h5>
                      <p class="card-text"> Editoral: ${docs.publisher}</p>
                      <p class="card-text"> Numero de paginas: ${docs.number_of_pages_median}</p>
                      <p class="card-text"> Precio: ${docs.cover_i/1000} </p> 
                      <button class="btn btn-success mt-auto" style="background-color: #839a8c," > Agregar </button>
                  </div>
               </div>
          `;
          
          var botonAgregar = cardDiv.querySelector("button");
          botonAgregar.addEventListener("click", ()=> {
              agregarAlCarrito (docs);
          });

          productosContainer.appendChild (cardDiv);
      })

      function agregarAlCarrito (docs)
      {
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(docs); //push agrega el producto
          localStorage.setItem('cart', JSON.stringify(cart));
          alert(`${docs.title} ha sido agregado al carrito`); 
          
      }
  })
  .catch ((error)=> console.log("Error de api")); //mensaje de error




  //carrito
         const carritoItemStorage = JSON.parse(localStorage.getItem('cart')) || [];
        const carritoTableBody = document.getElementById('carrito-items');
        const totaldiv = document.getElementById ('total');
        
    
        function actualizarTotal() {
            totaldiv.innerHTML = ""; // Limpia el div del total
            const total_texto = document.createElement('h2');
            total_texto.textContent = `Total: $${total.toFixed(2)}`;
            totaldiv.appendChild(total_texto);
        }
    
    //cargar producto en carrito
    carritoItemStorage.forEach((docs, index) =>
        {
            const row = document.createElement('tr');
            
            const nombreCelda = document.createElement('td');
            nombreCelda.textContent =docs.title;
            row.appendChild(nombreCelda);

            const editorialCelda = document.createElement('td');
            editorialCelda.textContent =docs.publisher;
            row.appendChild(editorialCelda);

            const precioCelda = document.createElement('td');
            const precio = docs.cover_i/1000;
            precioCelda.textContent = precio.toFixed(2) ;
            row.appendChild(precioCelda);
            
            total += precio;

            // Botón para eliminar
            const eliminarCelda = document.createElement('td');
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = "Eliminar";
            eliminarBtn.className = "btn";
            eliminarBtn.style ="background-color: rgb(220, 220, 220)";
            eliminarBtn.addEventListener("click", () => {
                
                total -= precio;
                actualizarTotal();
                row.remove();

                
                carritoItemStorage.splice(index, 1); 
                localStorage.setItem('cart', JSON.stringify(carritoItemStorage));
           
            });

            eliminarCelda.appendChild(eliminarBtn);
            row.appendChild(eliminarCelda);

            carritoTableBody.appendChild(row);
            actualizarTotal();
        });
});










// Array de productos disponibles
document.addEventListener("DOMContentLoaded", () => {
  var productosContainer = document.getElementById ("productos-container");

  fetch ("https://openlibrary.org/search.json?author=gabriel+rolon&publisher=planeta&limit=8")
  .then (Response => Response.json())
  .then ((data)=> {
      var producto = data.docs;


      // Función mostrar la lista de productos en la consola
      function mostrarProductos(producto) 
      {
          console.log("Lista de productos disponibles:");
          producto.forEach((docs) => {
              console.log(`Titulo: ${docs.title}, Autor: ${docs.author_name}, Cantidad de paginas: ${docs.number_of_pages_median}`);
          });
      }
      mostrarProductos(producto);
  });
});



