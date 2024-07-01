
$(document).ready(function(){
    $(".dropdown").click(function(){
        console.log("xd");
        $(".dropdown-content").slideToggle("slow");
    });

    Funciones();
});

function Funciones(){
    $(window).scroll(function() {
        $('article').each(function() {
        const sectionTop = $(this).offset().top + 0.3 * $(window).height();
        const scrollPosition = $(window).scrollTop() + $(window).height();

        if (scrollPosition > sectionTop) {
            $(this).addClass('active');
        }
        });
    });
    
    $("#enviar_registro").click(function() {
        enviar(
            document.getElementById("dni").value,
            document.getElementById("nombre").value,
            document.getElementById("telefono").value,
            document.getElementById("correo").value
        );
    });
    
} 

function crearCookie(cnombre,cvalor){
    document.cookie ="Cookie_" + cnombre + "=" + cvalor + ";"
}

function enviar(DNI,Nombre,Telefono,Correo){

    if (!(check_DNI(DNI))){
        return false;
    }
    if (!(check_telefono(Telefono))){
        return false;
    }
    if (!(check_correo(Correo))){
        return false;
    }
    crearCookie(Correo,DNI + "/" + Nombre + "/" + Telefono + "/" + Correo);
}

function check_DNI (DNI){
    const rgx = /^[0-9]{8}$/;
    let Num_DNI = DNI.slice(0,8);
    let Letra_DNI = DNI.substr(8,1);
    let Resto = Num_DNI % 23;
    console.log(Num_DNI);
    console.log(Letra_DNI);
    if (!rgx.test(Num_DNI)){
        // Mostrar el error de DNI, quitar el display none
        alert("Números del DNI incorrectos");
        return false
    }
    const Secuencia = "TRWAGMYFPDXBNJZSQVHLCKE";
    //Juraría que el 9 no está incluido
    
    if (Letra_DNI != Secuencia.substr(Resto,1)){
        alert("Letra del DNI incorrecta");
        return false;
    }
    return true;
}
function check_telefono(Telefono){
    const rgx = /^[6-9][0-9]{8}$/;
    if (!rgx.test(Telefono)){
        alert("Teléfono no válido");
        return false;
    }
    return true; 
}
function check_correo(Correo){
    const rgx = /^[a-z|A-Z]*@[a-z|A-Z].[com|es]]$/;
    if (rgx.test(Correo)){
        alert("Correo no válido");
        return false;
    }
    return true; 
}

let slideIndex = 1;
showSlides(slideIndex);
        
function plusSlides(n) {
    showSlides(slideIndex += n);
}
        
function currentSlide(n) {
    showSlides(slideIndex = n);
}
        
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.querySelectorAll('[class*="img_small"]');
    let captionText = document.getElementsByClassName("caption-container");
    if (n > 6) {slideIndex = 1}
    if (n < 1) {slideIndex = 6}
    for (i = 0; i < slides.length; i++) {
        if (slides[i] !== undefined) {
            slides[i].style.display = "none";
        }
    }
    for (i = 0; i < slides.length; i++) {
        if(dots[i] !== undefined){
        dots[i].className = dots[i].className.replace(" active", "");
        }
    }
    let gallery_n = slides.length/6
    for (i = 0; i <= gallery_n; i++){
    if (slides[slideIndex-1 + i*6] !== undefined && dots[slideIndex-1 + i*6] !== undefined) {
        slides[slideIndex-1 + i*6].style.display = "block";
        dots[slideIndex-1 + i*6].className += " active";
        captionText[i].innerHTML = dots[slideIndex-1 + i*6].alt;
        }
    }
}


