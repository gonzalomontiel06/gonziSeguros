
$("document").ready(function (){


// CLASS CONSTRUCTOR CLIENTE - AUTO 

class Cliente{
    constructor(nombre, correo, telefono){
        this.nombre = nombre
        this.correo = correo
        this.telefono = telefono 
    }
}

class Auto{
    constructor(marca, modelo, año){
        this.marca = marca
        this.modelo = modelo
        this.año = año
    }
}

// VARIABLES GLOBALES

let añoActual = 2021;
let clienteDatos = [];
let clienteAuto = {};
let x
let y
let a
let nombreCliente
let mailCliente
let numeroCliente

let todoRiesgo = {
    montoAseg: 0,
    franquicia: 0,
    valorCuota: 0
}

let tercerosCompleto = {
    montoAseg: 0,
    franquicia: "NO",
    valorCuota: 0
}

const modelosAuto = [
    {marca: "peugeot", modelo: "206", precio: 900000},
    {marca: "peugeot", modelo: "207", precio: 1100000},
    {marca: "peugeot", modelo: "208", precio: 2100000},
    {marca: "peugeot", modelo: "307", precio: 900000},
    {marca: "peugeot", modelo: "308", precio: 2500000}, 
    {marca: "peugeot", modelo: "3008", precio: 5800000},
    {marca: "peugeot", modelo: "2008", precio: 2600000},
    {marca: "peugeot", modelo: "partner", precio: 2600000},
    {marca: "peugeot", modelo: "301", precio: 1800000},
    {marca: "peugeot", modelo: "408", precio: 2600000},
    {marca: "peugeot", modelo: "308 s", precio: 5200000},
    {marca: "volkswagen", modelo: "amarok", precio: 2500000},
    {marca: "volkswagen", modelo: "tiguan", precio: 5900000},
    {marca: "volkswagen", modelo: "vento", precio: 5100000},
    {marca: "volkswagen", modelo: "nivus", precio: 3000000},
    {marca: "volkswagen", modelo: "gol trend", precio: 1700000},
    {marca: "volkswagen", modelo: "polo", precio: 2200000},
    {marca: "volkswagen", modelo: "fox", precio: 1800000},
    {marca: "volkswagen", modelo: "voyage", precio: 1600000},
    {marca: "volkswagen", modelo: "bora", precio: 2000000},
    {marca: "fiat", modelo: "cronos", precio: 1600000},
    {marca: "fiat", modelo: "palio", precio: 1500000},
    {marca: "fiat", modelo: "500 abarth", precio: 5500000},
    {marca: "fiat", modelo: "argo", precio: 1450000},
    {marca: "fiat", modelo: "500", precio: 1900000},
    {marca: "fiat", modelo: "toro", precio: 2200000}
]

// EVENTOS DATOS clienteAuto

let marcas = document.getElementById("marcaAutos")

marcas.addEventListener("change", seleccion)
    function seleccion(event){
        x = document.getElementById("marcaAutos").value;
        if (x == "peugeot"){
            let selectModelos = document.getElementById("modelos");
            let arrayPeugeot = modelosAuto.filter(marcas => marcas.marca == "peugeot");
            for (const mods of arrayPeugeot){
                let option = document.createElement("option");
                option.innerHTML = mods.modelo.toLocaleUpperCase();
                selectModelos.appendChild(option);
            }
        }

        if (x == "volkswagen"){
            let selectModelos2 = document.getElementById("modelos");
            let arrayVolkswagen = modelosAuto.filter(marcas => marcas.marca == "volkswagen");
            for (const mods of arrayVolkswagen){
                let option = document.createElement("option");
                option.innerHTML = mods.modelo.toLocaleUpperCase();
                selectModelos2.appendChild(option);
            }
        }
    
        if (x == "fiat"){
            let selectModelos3 = document.getElementById("modelos");
            let arrayFiat = modelosAuto.filter(marca => marca.marca == "fiat");
            for (const mods of arrayFiat){
                let option = document.createElement("option");
                option.innerHTML = mods.modelo.toLocaleUpperCase();
                selectModelos3.appendChild(option);
            }
        }
        console.log(`Marca: ${x}`);
    }

let mod = document.getElementById("modelos");

mod.addEventListener("change", guardar);
    function guardar(event){
        y = document.getElementById("modelos").value;
        console.log(`Modelo: ${y}`);
    }

let año = document.getElementById("años");

año.addEventListener("change", fechas);
    function fechas(event){
        a = document.getElementById("años").value
        console.log(`Año: ${a}`);
    }

// CLASS DATOS CLIENTE

$("#inputName").change(function (e){
    nombreCliente = document.getElementById("inputName").value;
    console.log(`Nombre: ${nombreCliente}`);
});

$("#inputMail").change(function (e){
    mailCliente = document.getElementById("inputMail").value;
    console.log(`Correo: ${mailCliente}`);
});

$("#inputNumber").change(function (e){
    numeroCliente = document.getElementById("inputNumber").value;
    console.log(`Telefono: ${numeroCliente}`);
    clienteDatos = new Cliente(nombreCliente, mailCliente, numeroCliente);
    console.log(clienteDatos);

    // DATOS CLIENTE LOCAL STORAGE

    let clienteDatosJSON = JSON.stringify(clienteDatos);
    console.log(clienteDatosJSON);
    sessionStorage.setItem("Datos usuario", clienteDatosJSON);
    });


// FUNCIONES POLIZA TODO RIESGO

function añoAuto(añoHoy, año) { 
    return añoActual = añoHoy - año
}

function montoAseg(valor) {
    return todoRiesgo.montoAseg = clienteAuto.modelo.precio - ((valor * (añoActual* 3) / 100));
}

function franquicia() {
    return todoRiesgo.franquicia = (todoRiesgo.montoAseg * 3) / 100;
}

function valorCuota() {
    return todoRiesgo.valorCuota = (todoRiesgo.montoAseg * 0.5) / 100;
}

// FUNCIONES POLIZA TERCEROS

function montoAsegTerceros(valor) {
    return tercerosCompleto.montoAseg = clienteAuto.modelo.precio - ((valor * (añoActual* 4) / 100));
}


function valorCuotaTerceros() {
    return tercerosCompleto.valorCuota = (tercerosCompleto.montoAseg * 0.5) / 100;
}

// BTN SUBMIT VALIDANDO DATOS

// PASO 2 


$("#cotiza").submit(function (event){
    event.preventDefault();

        clienteAuto = new Auto(x, y, a);
        console.log(clienteAuto);

        añoAuto(añoActual, clienteAuto.año);
        clienteAuto.modelo = modelosAuto.find(auto => auto.modelo.toLocaleUpperCase() == clienteAuto.modelo);
        montoAseg(clienteAuto.modelo.precio);
        franquicia();
        valorCuota();

        montoAsegTerceros(clienteAuto.modelo.precio);
        valorCuotaTerceros();

        $("html, body").animate({
            scrollTop: $(".containerPolizas").offset().top  
        }, "fast");

        $("#sectionPolizas").fadeIn(2000).append(`<div class="containerpolizas__boxH2">
                                    <h2 class="containerPolizas__boxH2--subtitulo">paso2</h2>
                                    <h2 class="containerPolizas__boxH2--segundoSub">elegi tu poliza</h2>
                                    </div>

                                    <div class="containerPolizas__arrow col-lg-12">
                                        <img src="./img/flechaizquierda.png" alt="flechaIzquierda">
                                        <img src="./img/flechaderecha.png" alt="flechaDerecha">
                                    </div>

                                    <div class="containerPolizas__flex">
                                        <div class="polizaTodoRiesgo col-lg-6">
                                            <h2>poliza <span class="subrayado">todo riesgo</span> </h2> 
                                            <p>Monto asegurado: $${todoRiesgo.montoAseg}</p> 
                                            <p>Franquicia: $${todoRiesgo.franquicia}</p> 
                                            <p>Valor de cuota: $${todoRiesgo.valorCuota}</p>
                                            <input class="btn2" type="submit" value="Contratá">
                                        </div>
    
                                        <div class="polizaTercerosCompleto col-lg-6">
                                            <h2>poliza <span class="subrayado">terceros completo</span></h2> 
                                            <p>Monto asegurado: $${tercerosCompleto.montoAseg}</p> 
                                            <p>Franquicia: NO </p> 
                                            <p>Valor de cuota: $${tercerosCompleto.valorCuota}</p>
                                            <input class="btn2" type="submit" value="Contratá">
                                        </div>
                                    </div>`);


// PASO 3 

        $(".btn2").click(function (e){

            $(`<section class="confirmaDatos container-fluid"></section>`).insertBefore("#idJS");
            $("html, body").animate({
                scrollTop: $(".confirmaDatos").offset().top  
            }, "fast");

                $(".confirmaDatos").append(`<div class="confirmaDatos__container">
                                                <div class="confirmaDatos__container__texto">
                                                    <img src="./img/paso1.png" class="img-fluid" alt="imagenForm">
                                                    <h2 class="confirmaDatos__container__texto--subtitulo">paso 3</h2>
                                                    <h2 class="confirmaDatos__container__texto--segundoSub">confirmá tus datos</h2>
                                                </div>
                                            </div>
                                            <div class="confirmaDatos__personaYtarjeta row"></div>`);

                                        $(".confirmaDatos__personaYtarjeta").append(`<div class="confirmaDatos__personaYtarjeta__persona col-lg-6">
                                                            <form class="confirmaDatos__personaYtarjeta__persona__form">
                                                                <div>
                                                                    <label class="confirmaDatos__personaYtarjeta__persona__form--label" for="nombre">Nombre completo</label>
                                                                        <input id="inputNameStorage" class="confirmaDatos__personaYtarjeta__persona__form--input" type="text" name="nombre" value="">
                                                                    <label class="confirmaDatos__personaYtarjeta__persona__form--label" for="mail">Correo Electronico</label>
                                                                        <input id="inputMailStorage" class="confirmaDatos__personaYtarjeta__persona__form--input" type="text" name="mail">
                                                                    <label class="confirmaDatos__personaYtarjeta__persona__form--label" for="number">Telefono</label>
                                                                        <input id="inputNumberStorage" class="confirmaDatos__personaYtarjeta__persona__form--input" type="tel" name="phone">
                                                                </div>
                                                                <div>
                                                                    <label class="confirmaDatos__personaYtarjeta__persona__form--label" for="dni">DNI</label>
                                                                        <input class="confirmaDatos__personaYtarjeta__persona__form--input" id="inputDNI" type="text" name="dni">
                                                                    <label class="confirmaDatos__personaYtarjeta__persona__form--label" for="dress">Direccion</label>
                                                                        <input class="confirmaDatos__personaYtarjeta__persona__form--input" id="inputDireccion" type="text" name="direccion">
                                                                    <label class="confirmaDatos__personaYtarjeta__persona__form--label" for="cp">CP</label>
                                                                        <input class="confirmaDatos__personaYtarjeta__persona__form--input" id="inputCP" type="text" name="cp">
                                                                </div>
                                                            </form>
                                                        </div>

                                                        <div class="confirmaDatos__personaYtarjeta__tarjeta col-lg-6">
                                                            <h2 class="confirmaDatos__personaYtarjeta__tarjeta--subtitulo">datos de facturacion</h2>
                                                            <form class="confirmaDatos__personaYtarjeta__tarjeta__form">
                                                                <input class="confirmaDatos__personaYtarjeta__tarjeta__form--input" type="text" name="numero" placeholder="numero de tarjeta">
                                                                <input class="confirmaDatos__personaYtarjeta__tarjeta__form--input" type="text" name="nombre" placeholder="nombre y apellido">
                                                                <input class="confirmaDatos__personaYtarjeta__tarjeta__form--input" type="text" name="fecha" placeholder="mes/año">
                                                                <input class="confirmaDatos__personaYtarjeta__tarjeta__form--input" type="text" name="codigo" placeholder="codigo seg">
                                                                <input class="confirmaDatos__personaYtarjeta__tarjeta__form--input" type="text" name="dni" placeholder="dni del titular de tarjeta">
                                                            </form>
                                                        </div>`);

                                                        let usuarioJSON = JSON.parse(sessionStorage.getItem("Datos usuario"));

                                                        let inputName = document.getElementById("inputNameStorage");
                                                        let inputMail = document.getElementById("inputMailStorage");
                                                        let inputNumber = document.getElementById("inputNumberStorage");

                                                        inputName.value = usuarioJSON.nombre;
                                                        inputMail.value = usuarioJSON.correo;
                                                        inputNumber.value = usuarioJSON.telefono;

                                                        $("#inputDNI").change(function (e){
                                                            let dni = document.getElementById("inputDNI").value
                                                            console.log(dni)
                                                            console.log(usuarioJSON);
                                                            let ulia = usuarioJSON.push(dni)
                                                        })
        })
    })
});