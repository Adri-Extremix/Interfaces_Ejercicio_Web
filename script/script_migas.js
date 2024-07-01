function formatoDosCifras(numero) {
    if (numero < 10) {
      return "0" + numero;
    } else {
      return numero.toString();
    }
  }

function crearCookie(cnombre,cvalor){
    document.cookie ="Cookie_" + cnombre + "=" + cvalor + ";"
}


const tiempo = 10;
const platos = 16;
const precios = [18.95,16.50,18.50,10.00,16.50,15.00,15.50,17.00,20.00,20.00,22.00,18.00,19.00,6.50,6.90,7.70];
class migas_de_pan{
    constructor(){
        this.etapa_max = 0;
        this.etapa_actual = 0;
        this.n_platos = platos;
        this.n_platos_pedidos = [];
        this.precios_platos = precios;
        for (let i = 0; i < this.n_platos; i++){
            this.n_platos_pedidos[i] = 0;
        }
        this.cuenta = tiempo * 60;

        
    } 
    // etapa = 0: pedidos; etapa = 1: revision; etapa = 2: estado 
    
    
    ControlMostrado(){
        $(".siguiente").click(() => {
            if ((this.etapa_actual == this.etapa_max) && this.etapa_max < 2){
                this.etapa_max += 1;
            }

            if (this.etapa_actual == 1){
                if (this.checkRevision(
                    document.getElementById("titular").value,
                    document.getElementById("n_tarjeta").value,
                    document.getElementById("fecha").value,
                    document.getElementById("cvv").value
                )) {
                    this.mostrarEstado();
                }
            }

            if (this.etapa_actual == 0){
                this.mostrarRevision();
            }

        });
        
        $("#migas_pedidos").click(()=> {
            if (this.etapa_actual == 2){
                alert("Pedido ya realizado");    
            }
            else{
                this.mostrarPedidos();
            }
        });
        $("#migas_revision").click(()=>{
            if (this.etapa_actual == 2){
                alert("Pedido ya realizado");
            }
            else{
                if(this.etapa_max >= 1){
                    this.mostrarRevision();
                }
                    
            }
        });
    }
    ModificarPedidos() {
        for (let i = 1; i <= 16; i++) {
          // Usa una función de flecha para capturar el valor de 'i' en el contexto del bucle
          $("." + i + ".mas").click(() => {
            this.n_platos_pedidos[i-1] += 1;
            this.mostrarPedidos();
          });
      
          $("." + i + ".menos").click(() => {
            if (this.n_platos_pedidos[i-1] > 0) {
              this.n_platos_pedidos[i-1] -= 1;
              this.mostrarPedidos();
            }
          });
          
        }
        
      }
    
    mostrarPedidos(){
        if (this.etapa_max == 1){
            $("#migas_pedidos").removeClass("pointer");
            $("#migas_revision").addClass("pointer");
        }
        this.etapa_actual = 0;
        for (let i = 1; i <= this.n_platos_pedidos.length; i++){
            document.getElementById(i.toString()).querySelector("h4").innerHTML = this.n_platos_pedidos[i-1];
        }
        $("#sect_revision").hide();
        $("#sect_estado").hide();
        $("#sect_pedidos").show();
    }

    pedidosRevision(){

        let total = 0;
        for(let i = 1; i <= this.n_platos_pedidos.length; i++){
            if(this.n_platos_pedidos[i-1] > 0){
                total += this.n_platos_pedidos[i-1] * this.precios_platos[i-1];
                $("#p_" + i).show();
                document.getElementById("p_"+i).querySelector(".cantidad").innerHTML = "x" + this.n_platos_pedidos[i-1];
                document.getElementById("p_"+i).querySelector(".suma").innerHTML = (this.n_platos_pedidos[i-1] * this.precios_platos[i-1]).toFixed(2) + "€";
            }
            else{
                $("#p_" + i).hide();
            }
            document.getElementById("total").innerHTML = "Total a pagar: " + total.toFixed(2) + "€";
        }
        
    }

    checkRevision(titular,n_tarjeta,fecha,cvv){
        if (!(this.checkNTarjeta(n_tarjeta))){
            return false;
        }
        if (!(this.checkFecha(fecha))){
            return false;
        }
        if (!(this.checkCVV(cvv))){
            return false;
        }
        crearCookie(n_tarjeta,titular + "/" + n_tarjeta + "/" + fecha + "/" + cvv);
        return true;
    }
    checkNTarjeta(n_tarjeta){
        const rgx = /^[0-9]{16}$/;
            if (!rgx.test(n_tarjeta)){
                alert("Tarjeta no válida");
                return false;
            }
            return true; 
    }
    checkFecha(fecha){
        const rgx = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!rgx.test(fecha)){
            alert("Fecha no válida");
            return false;
        }
        let fechaActual = new Date();
        let fecha_mes = fecha.slice(0,2);
        let fecha_año = fecha.slice(3,5);
        let año = fechaActual.getFullYear();
        año = año.toString().slice(2,4);
        año = Number(año);
        let mes = fechaActual.getMonth() + 1;
        if (fecha_año < año){
            alert("Fecha no válida");
            return false;
        }
        else{
            if ((fecha_año == año) && (fecha_mes <= mes)){
                alert("Fecha no válida");
                return false;
            }
        }
        return true;
    }
    checkCVV(cvv){
        const rgx = /^[0-9]{3}$/;
        if (!rgx.test(cvv)){
            alert("CVV no válido");
            return false;
        }
        return true;
    }
    mostrarRevision(){
        this.etapa_actual = 1;
        this.pedidosRevision();
        $("#sect_pedidos").hide();
        $("#sect_estado").hide();
        $("#sect_revision").show();
        $("#migas_pedidos").addClass("pointer");
        $("#migas_revision").removeClass("pointer");
    }
    cuentaAtras(){
        if (this.cuenta > 0){
            let minutos = formatoDosCifras(this.cuenta / 60);
            minutos = Math.floor(minutos);
            let segundos = formatoDosCifras(this.cuenta % 60);
            this.cuenta -= 1;
            document.getElementById("contador").innerHTML = formatoDosCifras(minutos) + ":" + segundos;    
        }
        else{
            $("#contador").hide();
            $("#img_check_contador").show();
        }
        
    }
    mostrarEstado(){
        this.etapa_actual = 2;
        $("#sect_revision").hide();
        $("#sect_pedidos").hide();
        $("#sect_estado").show();
        $("#migas_pedidos").removeClass("pointer");
        $("#migas_revision").removeClass("pointer");
        setInterval(() => {
            this.cuentaAtras();
          }, 1000);
    }
}


$(document).ready(Funciones())

function Funciones(){
    const migas = new migas_de_pan();
    migas.mostrarPedidos(); 
    migas.ControlMostrado();
    migas.ModificarPedidos();

}
