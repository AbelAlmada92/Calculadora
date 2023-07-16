// REFERENCIAS
const botonNumero = Array.from(document.getElementsByClassName("numero"));
const botonOperacion= Array.from(document.getElementsByClassName("operacion"));
const pantallaElement = document.getElementById("pantalla"); 
const indicadorOperacion = document.getElementById("indicadorOperacion");

// Variables

let pantalla = 0;
let numeroAnterior;
let numeroReinicia = false;

//Acciones
    botonNumero.forEach((boton) => {
      boton.addEventListener("click", (e) =>
        numeroClickeado(parseInt(e.target.textContent))
      );
    });

    botonOperacion.forEach((boton) => {
      boton.addEventListener("click", (e) =>
       operacionClickeada(e.target.textContent)
       );
    });
document.getElementById("clear").addEventListener("click", limpiarNumero); 
document.getElementById("allClear").addEventListener("click", reset);
document.getElementById("punto").addEventListener("click", punto);
document.addEventListener("keydown", (e)=>{
    switch (e.key){
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            numeroClickeado(parseInt(e.key));
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            operacionClickeada(e.key);
            break;
        case "Enter":
            operacionClickeada("=");
            break;
                case "Escape":
                     reset();
                     break;
                case "Backscape":
            limpiarNumero()
            break;
                  case".":
            punto()
            break;
    }
});

//Funciones

    function numeroClickeado(numero){
        if(numeroReinicia){
            pantalla = 0;
            numeroReinicia = false;
        }
        numeroPantalla = parseFloat(pantalla);
        if (!isNaN(numeroPantalla)){
            pantalla = parseFloat(pantalla.toString() + numero);
            actualizarPantalla();
        }
    }

    function operacionClickeada(operacion){
        if(!numeroAnterior){
            if(pantalla === 0 ) return;
            numeroAnterior = pantalla;
            indicadorOperacion.textContent = operacion;
            actualizarPantalla(0);
        }
        else{
            let resultado;
            switch (indicadorOperacion.textContent){
                case "+":
                    resultado = numeroAnterior + pantalla;
                    break;
                case "-":
                    resultado = numeroAnterior - pantalla;
                    break;
                case "*":
                    resultado = numeroAnterior * pantalla;
                    break;
                case "/":
                    if (pantalla === 0){
                        resultado = 0;
                        break;
                    }
                    resultado = numeroAnterior / pantalla;
                    break;
            }
            console.log(numeroAnterior, indicadorOperacion.textContent,pantalla, "=", resultado);

            numeroAnterior = resultado;
            actualizarPantalla(resultado);
            indicadorOperacion.textContent = operacion;
            if(operacion === "="){
                indicadorOperacion.textContent = undefined;
                numeroAnterior = undefined;
            }
            numeroReinicia = true;
        }              
    }

    function actualizarPantalla (mensaje = pantalla){
        pantalla = mensaje;
        pantallaElement.textContent = pantalla;
    }
    
    function limpiarNumero(){
        actualizarPantalla(0);
    }

    function reset(){
        limpiarNumero();
        (numeroAnterior = undefined),
          (indicadorOperacion.textContent = undefined );
    }

    function punto(){
        if(Number.isInteger(pantalla)) actualizarPantalla(pantalla += ".");
    }