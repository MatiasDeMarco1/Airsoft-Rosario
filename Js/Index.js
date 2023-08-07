
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
cargaIndex()
cargaIndexCelu()
function cargaIndex() {
    fetch("../json/productosDestacados.json")
    .then((response) => response.json())
    .then(destacados => {
        for (const producto of destacados){
            let seccion = document.getElementById("produtoDestacados")
            let html = document.createElement("li")
            html.classList.add("item4234")
            html.innerHTML = `
                <figure>
                        <img src="${producto.imagen}" alt="${producto.nombre} Airsoft" height="300px" width="300px">
                </figure>
                <div class="info-producto">
                    <h2>${producto.nombre}</h2>
                    <p class="precio">${producto.precio}</p>
                    <button class="añadir" id="${producto.id}" > Añadir al carrito</button>
                </div>
            `
            seccion.appendChild(html)
        }
        let carrito = []
        let boton = document.getElementsByClassName("añadir")
        for (const botones of boton){
            botones.onclick = (e) => {
                let compraAirsoft = destacados.find((el) => el.id === parseInt(e.target.id))
                swal({
                    icon: `${compraAirsoft.imagen}`,
                    title: `Se agrego ${compraAirsoft.nombre} a su carrito.`,
                        con: 'success',
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
    })
}
function cargaIndexCelu() {
    fetch("../Js/productosDestacados.json")
    .then((response) => response.json())
    .then(destacados => {
        for (const producto of destacados){
            let seccion = document.getElementById("productoDestacadosCelular")
            let html = document.createElement("div")
            html.classList.add("carousel-item")
            html.innerHTML = `
                <figure>
                        <img src="${producto.imagen}" alt="${producto.nombre} Airsoft" height="300px" width="300px">
                </figure>
                <div class="info-producto">
                    <h2>${producto.nombre}</h2>
                    <p class="precio">${producto.precio}</p>
                    <button class="añadir" id="${producto.id}" > Añadir al carrito</button>
                </div>
            `
            seccion.appendChild(html)
            let primero = document.getElementById("productoDestacadosCelular").firstElementChild
            primero.classList.add("active")
        }
        let carrito = []
        let boton = document.getElementsByClassName("añadir")
        for (const botones of boton){
            botones.onclick = (e) => {
                let compraAirsoft = destacados.find((el) => el.id === parseInt(e.target.id))
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
    })
}

