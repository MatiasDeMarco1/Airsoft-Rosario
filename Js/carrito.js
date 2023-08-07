
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

let carritoSi = JSON.parse(localStorage.getItem("carrito"))
if (carritoSi){
    calcularPrecio() 
    subTotalMuestro(carritoSi)
    let divProducto = document.getElementById("vacio")
    if (divProducto){
        divProducto.remove()
    }
    for (const producto of carritoSi){
        let seccion = document.getElementById("carritoSape")
        let html = document.createElement("div")
        html.classList.add("carousel-item")
        html.id =`div-${producto.id}`
        html.innerHTML = `
            <figure>
                <img src=../imagenes/${producto.imagen} alt=${producto.nombre} height="300px" width="300px">
            </figure>
            <div class="info-productoc">
                <h2>${producto.nombre}</h2>
                <p class="precio" id="elimino-${producto.id}">$${producto.precio * producto.cantidad * 1.21} x ${producto.cantidad}</p>
                <button class="eliminar" id="${producto.id}"> Eliminar producto</button>
            </div>
        `
        seccion.appendChild(html)
        let primero = document.getElementById("carritoSape").firstElementChild
        primero.classList.add("active")
        eliminar()
    }
}else {
    let seccion = document.getElementById("carritoSape")
    let html = document.createElement("div")
    html.classList.add("carousel-item")
    html.classList.add("active")
    html.id = "vacio"
    html.innerHTML = `
        <div class="noHayDiv">
            <p class="noHay">No hay Productos en su carrito</p>
        </div>
        `
    seccion.appendChild(html)
    
}

function eliminar(){
    let botoncito = document.getElementsByClassName("eliminar")
    for (const boton of botoncito){
        boton.onclick = (e) => {
            let elcarrito = JSON.parse(localStorage.getItem("carrito"))
            let indice = elcarrito.findIndex((el) => el.id === parseInt(e.target.id))
            let cantidadElimino = elcarrito[indice].cantidad
            if (elcarrito.length === 1 && cantidadElimino === 1){
                localStorage.clear()
                let seccion = document.getElementById("carritoSape")
                let divProducto = document.getElementById(`div-${e.target.id}`)
                if (divProducto) {
                    divProducto.remove();
                }
                let html = document.createElement("div")
                html.classList.add("carousel-item")
                html.classList.add("active")
                html.id = "vacio"
                html.innerHTML = `
                    <div class="noHayDiv">
                        <p class="noHay">No hay Productos en su carrito</p>
                    </div>
                    `
                seccion.appendChild(html)
                contadorCarrito()
                calcularPrecio()
                subTotalMuestro(elcarrito)
            }else if (cantidadElimino > 1) {
                elcarrito[indice].cantidad--
                console.log(elcarrito)
                console.log(indice)
                localStorage.setItem("carrito", JSON.stringify(elcarrito))
                let modificarCantidad = document.getElementById(`elimino-${e.target.id}`)
                modificarCantidad.innerText = `${elcarrito[indice].precio * elcarrito[indice].cantidad * 1.21} x ${elcarrito[indice].cantidad}`
                calcularPrecio()
                contadorCarrito()
                subTotalMuestro(elcarrito)
            }else {
                elcarrito.splice(indice, 1)
                localStorage.setItem("carrito", JSON.stringify(elcarrito))
                let divProducto = document.getElementById(`div-${e.target.id}`)
                if (divProducto) {
                    divProducto.remove();
                }
                location.reload()
                calcularPrecio()
                contadorCarrito()
                subTotalMuestro(elcarrito)
            }
        }
    }
}

function subTotalMuestro(){
    const carritoSub = JSON.parse(localStorage.getItem("carrito"))
    let subTotalMuestro = document.getElementById("subtotal")
    let precioFinal1 = 0
    if (carritoSub){
        carritoSub.forEach((total) => {
            precioFinal1 += total.precio * total.cantidad * 1.21
        })
        subTotalMuestro.innerText = `Subtotal: $${precioFinal1}`
    }else{
        subTotalMuestro.innerText = `Subtotal: $0`
    }
}
let finalizar = document.getElementById("compraFinalizar")
finalizar.onclick = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"))
    if (carritoGuardado){
        let precioFinal = 0
        carritoGuardado.forEach((total) => {
            precioFinal += total.precio * total.cantidad
        })
        Swal.fire({
            title: 'Su compra se realizo con exito',
            imageUrl: "../imagenes/producto.gif",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        localStorage.clear()
        setTimeout(()=>{ 
            location.reload()
        }, 2000)
    }else if (!carritoGuardado) {
        swal.fire({
            title: 'No hay productos en su carrito',
            icon: 'error',
        })
    }
}

function calcularPrecio() {
    const carrito = JSON.parse(localStorage.getItem("carrito"))
    const radios = document.getElementsByName("flexRadioDefault1");
    let totalMuestro = document.getElementById("total")
    let precioFinal1 = 0
    if (carrito){
        carrito.forEach((total) => {
            precioFinal1 += total.precio * total.cantidad * 1.21
        })
        let precioAgrego = 0
        if (precioFinal1 !== 0){
            for (const radio of radios) {
                if (radio.checked) {
                precioAgrego += parseInt(radio.value, 10); 
                break; 
                }
            }
        }
        totalMuestro.innerText = `Total: $${precioFinal1 + precioAgrego}`
    }else{
        totalMuestro.innerText = `Total: $0`
    }
}