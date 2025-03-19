// Crear Cuenta
let nombre;
let apellido;
let correo;
let pass;
let repPass;
let tel;

class usuario{
    constructor(nombre, apellido, correo, contrasena, telefono){
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasena = contrasena;
        this.telefono = telefono;

    }
}


var listaUsuarios = [];

function validar(){
    nombre = document.querySelector(".nombre").value;
    apellido = document.querySelector(".apellido").value;
    correo = document.querySelector(".correo").value;
    pass = document.querySelector(".password").value;
    repPass = document.querySelector(".repPass").value;
    tel = document.querySelector(".telefono").value;

    let error = document.querySelector(".error-cuenta");
    error.innerHTML = "";

    let valido = false;

    if(nombre === ""){
        error.innerHTML = "No ingresó ningún nombre";
        
    }else if(apellido === ""){
        error.innerHTML = "No ingresó ningún apellido";
        
    }else if(correo.includes("@")== false || correo.includes(".")== false){
        error.innerHTML = "Correo electrónico inválido<br>Ingrese un correo válido, por ejemplo: messi@gmail.com";
        
    }else if(pass < 8){
        error.innerHTML = "Su contrasena es demasiado corta <br>(Recomendamos min 8 caracteres)";
        
    }else if(repPass != pass){
        error.innerHTML = "Las contraseñas no coinciden";
        
    }else if(tel === ""){
        error.innerHTML = "No ingresó ningún número de teléfono";
        
    }else{
        valido = true
    }

    return valido;
}



function verinfo(){
    
    if(validar() == true){
        let nuevo = new usuario(nombre,apellido, correo, pass, tel);
        listaUsuarios.push(nuevo);

        
        console.log(`Nombre: ${nombre}\n Apellido: ${apellido}\n Correo: ${correo}\n Contraseña: ${pass}\n Teléfono: ${tel}`);
        alert("Usuario creado correctamente");
    }
}



//Login / Inicio  Sesion

var fm = new usuario("Facundo", "Marquez", "fm@gmail.com", "123abc", 123);
listaUsuarios.push(fm);

var lm = new usuario("Lionel", "Messi", "LionelMessi@gmail.com", "campeonmundial",12345);
listaUsuarios.push(lm);

function iniciarSesion(){
    let correoInicio = document.querySelector(".correoInicio").value;
    let passInicio = document.querySelector(".passwordInicio").value;

    let contador = 0;
    
    for(let i=0; i<listaUsuarios.length; i++){

        if(listaUsuarios[i].correo == correoInicio && listaUsuarios[i].contrasena == passInicio)

        contador++;
    }

    if(contador==1){
        console.log("Inicio de sesión exitoso");
        alert("Inicio de sesión exitoso");
    }else{
        console.log("No se pudo iniciar sesión");
        alert("Correo o contraseña son incorrectos");
    }

    
}

// Recueperar cuenta

function recuperarContrasena(){
    let datos = document.querySelector(".correo-electronico").value;
    let contador = false;

    for(let i=0; i < listaUsuarios.length; i++){
        
        if(listaUsuarios[i].correo == datos){
            contador = true;
        }

    }
    
    if(contador == true){
        alert("Enviaremos un código de recuperación a este email");
    }else{
        alert("No existe una cuenta con ese correo")
    }

}

//footer
//Evento input=Enter

let entrada = document.querySelector(".input-footer");

entrada.addEventListener("keydown", function(e){
    if(e.key == "Enter" && entrada.value != ""){
        alert(`Enviaremos las novedades a: ${entrada.value}`);
    }
}) 