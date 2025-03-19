const nombre = document.getElementById('nombre');
const celular = document.getElementById('celular');
const email = document.getElementById('email');
const comentario = document.getElementById('comentario');
const form = document.getElementById('MyForm');
const erradoss = document.getElementById('erradoss');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    envioError();

    let errores = 0;
    const mensajeError = ["Error!"];
    const mensajeOk = ["Formulario enviado!"];

    if (nombre.value.trim() === '') {
        nombre.classList.add('error');
        mensajeError.push("*Debe ingresar un nombre");
        errores++;
    } else {
        nombre.classList.remove('error');
        mensajeOk.push(`Nombre: ${nombre.value}`)
    }

    const celularRegex = /^[0-9]+$/;
    if (celular.value.trim() === '') {
        celular.classList.add('error');
        mensajeError.push("*Debe ingresar un celular");
        errores++;
    } else if (!celularRegex.test(celular.value)) {
        celular.classList.add('error');
        mensajeError.push("*Debe ingresar solo números en el celular");
    } else {
        celular.classList.remove('error');
        mensajeOk.push(`Celular: ${celular.value}`)
    }

    if (email.value.trim() === '') {
        email.classList.add('error');
        mensajeError.push("*Debe ingresar un email");
        errores++;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        mensajeError.push("*Debe ingresar un formato de email valido")
        email.classList.add('error');
        errores++;
    } else {
        email.classList.remove('error');
        mensajeOk.push(`E-mail: ${email.value}`)
    }

    if (comentario.value.trim() === '') {
        comentario.classList.add('error');
        mensajeError.push("*Debe ingresar un comentario");
        errores++;
    } else {
        comentario.classList.remove('error');
        mensajeOk.push(`Comentario: ${comentario.value}`)
    }
    const contenido = mensajeError.join(`<br>`);
    const contOk = mensajeOk.join(`<br>`);

    if (errores !== 0) {
        erradoss.classList.remove('verde');
        erradoss.classList.add('rojo');
        envioError(contenido);
    } else {
        erradoss.classList.remove('rojo');
        erradoss.classList.add('verde');
        envioOk(contOk);
    }

    function envioError(contenido) {
        const contErrores = document.createElement('p');
        contErrores.innerHTML = contenido;
        erradoss.innerHTML = '';
        erradoss.appendChild(contErrores);
    }

    function envioOk(contOk) {
        const contOkey = document.createElement('p');
        contOkey.innerHTML = contOk;
        erradoss.innerHTML = '';
        erradoss.appendChild(contOkey);
    }

});

let entrada = document.querySelector(".input-footer");

entrada.addEventListener("keydown", function(e){
    if(e.key == "Enter" && entrada.value != ""){
        alert(`Enviaremos las novedades a: ${entrada.value}`);
    }
}) 