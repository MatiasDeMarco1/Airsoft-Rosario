
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