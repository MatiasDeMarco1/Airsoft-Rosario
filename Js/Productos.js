
function contadorCarrito(){
    let carritoNumero = document.getElementById("contadorCarrito1")
    let contador= 0
    const carritoContador = JSON.parse(localStorage.getItem("carrito"))
    if (carritoContador){
        for (const numerito of carritoContador){
            contador += numerito.cantidad
        }
        carritoNumero.innerText = contador
    }else {
        carritoNumero.innerText = 0
    }
}
function contadorCarritoMobile(){
    let carritoNumeroMobile = document.getElementById("contadorCarrito2")
    let contadorMobile= 0
    const carritoContador = JSON.parse(localStorage.getItem("carrito"))
    if (carritoContador){
        for (const numerito of carritoContador){
            contadorMobile += numerito.cantidad
        }
        carritoNumeroMobile.innerText = contadorMobile
    }else {
        carritoNumeroMobile.innerText = 0
    }
}

contadorCarrito()
contadorCarritoMobile()
function spiner1(){
    let spinner = document.getElementById('spinner')
    spinner.style.display = 'flex'
    fetch("./productosJSON.json")
    .then((response) => response.json())
    .then(productoCarga => {
        setTimeout(()=>{
            for (const productos of productoCarga){
                let seccion = document.getElementById("catalogo")
                let html = document.createElement("li")
                html.classList.add("item4234")
                html.dataset.categoria = productos.categoria
                html.innerHTML = `
                    <figure>
                        <img src="${productos.imagen}" alt="imagen Producto" height="300px" width="300px">
                    </figure>
                    <div class="info-producto">
                        <h2>${productos.nombre}</h2>
                        <p class="precio">${productos.precio * 1.21 }</p>
                        <button class="añadir" id="${productos.id}" > Añadir al carrito</button>
                    </div>
                    `
                seccion.appendChild(html)
            }
            let carrito = []
            let boton = document.getElementsByClassName("añadir")
            for (const botones of boton){
                botones.onclick = (e) => {
                    
                    let compraAirsoft = productoCarga.find((el) => el.id === parseInt(e.target.id))
                    Swal.fire({
                        title: "¡Genial!",
                        text: `Se agrego ${compraAirsoft.nombre} a su carrito`,
                        imageUrl: `${compraAirsoft.imagen}`,
                    })
                    let valido =  JSON.parse(localStorage.getItem("carrito"))
                    if (valido) {
                        const carritoGuardado =  JSON.parse(localStorage.getItem("carrito"))
                        let index = carritoGuardado.findIndex((el) => el.id === parseInt(e.target.id))
                        if (index !== -1){
                            carritoGuardado[index].cantidad++
                            localStorage.setItem("carrito", JSON.stringify(carritoGuardado))
                            contadorCarrito()
                            contadorCarritoMobile()
                        }else {
                            carritoGuardado.push(compraAirsoft)
                            localStorage.setItem("carrito", JSON.stringify(carritoGuardado))
                            carrito = []
                            contadorCarrito()
                            contadorCarritoMobile()
                        }
                    }else {
                        carrito.push(compraAirsoft)
                        localStorage.setItem("carrito", JSON.stringify(carrito))
                        contadorCarrito()
                        contadorCarritoMobile()
                    }
                }
            }
            spinner.style.display = 'none'
            filtrarProductos('todos') 
        }, 3000)
    })
    
}
function filtrarProductos(categoria) {
    const listaProductos = document.getElementById("catalogo");
    const productos = listaProductos.getElementsByClassName("item4234");
    let hayProductos = false
    for (const producto of productos) {
        const categoriaProducto = producto.dataset.categoria;
        if (categoria === "todos" || categoria === categoriaProducto) {
        producto.style.display = "block";
        hayProductos = true
        } else {
        producto.style.display = "none"; 
        }
    }
    if (!hayProductos) {
        const mensajeExistente = document.getElementById("mensajeNoProductos");
        if (mensajeExistente) {
            mensajeExistente.remove();
        }
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay productos con esa categoría.";
        mensaje.id = "mensajeNoProductos";
        listaProductos.appendChild(mensaje);
        } else {
        const mensajeExistente = document.getElementById("mensajeNoProductos");
        if (mensajeExistente) {
            mensajeExistente.remove();
        }
    }
}
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener("change", () => {
        const categoriaSeleccionada = document.querySelector('input[name="flexRadioDefault"]:checked').value;
        filtrarProductos(categoriaSeleccionada);
    });

});
spiner1()
document.getElementById("ordenSelect").addEventListener("change", function () {
    const valorSeleccionado = this.value;
    ordenarProductos(valorSeleccionado);
});
function ordenarProductos(opcion) {
    const listaProductos = document.getElementById("catalogo");
    const productos = listaProductos.getElementsByClassName("item4234");
    const arrayProductos = Array.from(productos);
    switch (opcion) {
      case "1": // A-Z
        arrayProductos.sort((a, b) => {
            const nombreA = a.querySelector("h2").textContent;
            const nombreB = b.querySelector("h2").textContent;
            return nombreA.localeCompare(nombreB);
        });
        break;
      case "2": // Z-A
        arrayProductos.sort((a, b) => {
            const nombreA = a.querySelector("h2").textContent;
            const nombreB = b.querySelector("h2").textContent;
            return nombreB.localeCompare(nombreA);
        });
        break;
      case "3": // Mayor Precio
        arrayProductos.sort((a, b) => {
            const precioA = parseFloat(a.querySelector(".precio").textContent);
            const precioB = parseFloat(b.querySelector(".precio").textContent);
            return precioB - precioA;
        });
        break;
      case "4": // Menor Precio
        arrayProductos.sort((a, b) => {
            const precioA = parseFloat(a.querySelector(".precio").textContent);
            const precioB = parseFloat(b.querySelector(".precio").textContent);
            return precioA - precioB;
        });
        break;
        default:
        return;
    }
    for (const producto of arrayProductos) {
        listaProductos.appendChild(producto);
    }
}