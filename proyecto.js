
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

class DatosDefinitivos{
    constructor(nombre, correo, telefono, dni, direccion, cp){
        this.nombre = nombre
        this.correo = correo
        this.telefono = telefono
        this.dni = dni
        this.direccion = direccion
        this.cp = cp;
    }
}

class DatosTarjeta{
    constructor(numero, nombre, fecha, codigo, titular){
        this.numero = numero
        this.nombre = nombre
        this.fecha = fecha
        this.codigo = codigo
        this.tituar = titular
    }
}

// VARIABLES GLOBALES

let añoActual = 2021;
let clienteDatos = []
let clienteAuto = {}
let x
let y
let a
let nombreCliente
let mailCliente
let numeroCliente
let datosClienteCompleto
let tarjetaPago
let URL = "https://jsonplaceholder.typicode.com/posts";
let numeroTarjeta
let nombreYApellidoTarjeta
let mesAñoTarjeta
let codigoTarjeta
let dniTarjeta
let dniCliente
let direccionCliente
let cpCliente

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

$("#marcaAutos").change(function (e){

    x = $("#marcaAutos").val();

    $("#modelos").html("");

    if (x == "peugeot"){
        let arrayPeugeot = modelosAuto.filter(marcas => marcas.marca == "peugeot");
        $("#modelos").append(`<option value="modelo">Seleccione modelo..</option>`)
        for (const mods of arrayPeugeot){
            $("#modelos").append(`<option>${mods.modelo.toLocaleUpperCase()}</option>`)
        }
    }

    if (x == "volkswagen"){
        let arrayVolkswagen = modelosAuto.filter(marcas => marcas.marca == "volkswagen");
        $("#modelos").append(`<option value="modelo">Seleccione modelo..</option>`)
        for (const mods of arrayVolkswagen){
            $("#modelos").append(`<option>${mods.modelo.toLocaleUpperCase()}</option>`)
        }
    }

    if (x == "fiat"){
        let arrayFiat = modelosAuto.filter(marca => marca.marca == "fiat");
        $("#modelos").append(`<option value="modelo">Seleccione modelo..</option>`)
        for (const mods of arrayFiat){
            $("#modelos").append(`<option>${mods.modelo.toLocaleUpperCase()}</option>`)
        }
    }

    console.log(`Marca: ${x}`);
})

$("#modelos").change(function (e){
    y = $("#modelos").val();
    console.log(`Modelo: ${y}`);
})


$("#años").change(function (e){
    a = $("#años").val();
    console.log(`Año: ${a}`);
})

// CLASS DATOS CLIENTE

$("#inputName").change(function (e){
    nombreCliente = $("#inputName").val();
    console.log(`Nombre: ${nombreCliente}`);
});

$("#inputMail").change(function (e){
    mailCliente = $("#inputMail").val();
    console.log(`Correo: ${mailCliente}`);
});

$("#inputNumber").change(function (e){
    numeroCliente = $("#inputNumber").val();
    console.log(`Telefono: ${numeroCliente}`);
});

// FUNCIONES POLIZA TODO RIESGO

function añoAuto(añoHoy, año) { 
    return añoActual = añoHoy - año;
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

    clienteDatos = new Cliente(nombreCliente, mailCliente, numeroCliente);
    console.log(clienteDatos);

    // DATOS CLIENTE LOCAL STORAGE

    let clienteDatosJSON = JSON.stringify(clienteDatos);
    console.log(clienteDatosJSON);
    sessionStorage.setItem("Datos usuario", clienteDatosJSON);


    clienteAuto = new Auto(x, y, a);
    console.log(clienteAuto);

    añoAuto(añoActual, clienteAuto.año);
    clienteAuto.modelo = modelosAuto.find(auto => auto.modelo.toLocaleUpperCase() == clienteAuto.modelo);
    montoAseg(clienteAuto.modelo.precio);
    franquicia();
    valorCuota();

    montoAsegTerceros(clienteAuto.modelo.precio);
    valorCuotaTerceros();

    $("#formCotiza").fadeOut(500);
    $("#formDatos").fadeOut(500);
    $("#formDatos").fadeIn(1500);
    $(".btn").fadeOut(500);
    $("#btnCambio").append(`<button class="btn" id="reinicio">Cotizar nuevamente</button>`)
                    .fadeIn(1500);

    $("html, body").animate({
        scrollTop: $(".containerPolizas").offset().top  
    }, "fast");

    $("#sectionPolizas").html("");
    $("#sectionPolizas").fadeIn(2500).append(
                                `<div class="containerPolizas__boxH2">
                                    <h2 class="containerPolizas__boxH2--subtitulo">paso 2</h2>
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
                                        <input class="btn2" id="btnTodoRiesgo" type="submit" value="Elegir">
                                    </div>

                                    <div class="polizaTercerosCompleto col-lg-6">
                                        <h2>poliza <span class="subrayado">terceros completo</span></h2> 
                                        <p>Monto asegurado: $${tercerosCompleto.montoAseg}</p> 
                                        <p>Franquicia: NO </p> 
                                        <p>Valor de cuota: $${tercerosCompleto.valorCuota}</p>
                                        <input class="btn2" id="btnTercerosCompleto" type="submit" value="Elegir">
                                    </div>

                                </div>`)

                                    $("#reinicio").click(function (e){
                                        location.reload();
                                    });

// PASO 3 

        $("#btnTodoRiesgo").click(function(e){

            $(".containerPolizas__flex--btn").fadeOut(500);
            $(".containerPolizas__arrow").fadeOut(500);
            $(".polizaTercerosCompleto").fadeOut(500);
            $(".polizaTodoRiesgo").fadeOut(500);
            $(".polizaTodoRiesgo").fadeIn(800);
            $(".containerPolizas__flex").css({
                "heigth": "21rem",
                "align-items": "center"
            });
        })

        $("#btnTercerosCompleto").click(function(e){
            $(".containerPolizas__flex--btn").fadeOut(500);
            $(".containerPolizas__arrow").fadeOut(500);
            $(".polizaTercerosCompleto").fadeOut(500);
            $(".polizaTodoRiesgo").fadeOut(500);
            $(".polizaTercerosCompleto").fadeIn(800);
            $(".containerPolizas__flex").css({
                "heigth": "21rem",
                "align-items": "center"
            });
        })



        $(".btn2").click(function (e){

            $(`<section class="confirmaDatos"></section>`).insertBefore("#idJS");

            $("html, body").animate({
                scrollTop: $(".confirmaDatos").offset().top  
            }, "fast");

                $(".confirmaDatos").html("");
                $(".confirmaDatos").append(
                                        `<div id="divAnimate" style="display:none">
                                            <div class="confirmaDatos__container">
                                                <div class="confirmaDatos__container__texto">
                                                    <img src="./img/paso1.png" class="img-fluid" alt="imagenForm">
                                                    <h2 class="confirmaDatos__container__texto--subtitulo">paso 3</h2>
                                                    <h2 class="confirmaDatos__container__texto--segundoSub">confirmá tus datos</h2>
                                                </div>
                                            </div>
                                            <div class="confirmaDatos__personaYtarjeta container"></div>
                                        </div>`);

                                        $("#divAnimate").fadeIn(2500);

                                        $(".confirmaDatos__personaYtarjeta").append(
                                            `<form class="confirmaDatos__personaYtarjeta__form row" id="btn3" autocomplete="off">
                                                <div class="confirmaDatos__personaYtarjeta__form__datosPersonales col-lg-4">
                                                    <label class="confirmaDatos__personaYtarjeta__form__datosPersonales--label" for="nombre">Nombre completo</label>
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosPersonales--input" id="inputNameStorage" type="text" name="nombre" value="" required>
                                                    <label class="confirmaDatos__personaYtarjeta__form__datosPersonales--label" for="mail">Correo Electronico</label>
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosPersonales--input" id="inputMailStorage" type="text" name="mail" required>
                                                    <label class="confirmaDatos__personaYtarjeta__form__datosPersonales--label" for="number">Telefono</label>
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosPersonales--input" id="inputNumberStorage" type="tel" name="phone" required>
                                                </div>
                                                <div class="confirmaDatos__personaYtarjeta__form__datosPersonales-2 col-lg-4">
                                                    <label class="confirmaDatos__personaYtarjeta__form__datosPersonales--label" for="dni">DNI</label>
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosPersonales--input" id="inputDNI" type="text" name="dni" minlength="7" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" / required>
                                                    <label class="confirmaDatos__personaYtarjeta__form__datosPersonales--label" for="dress">Direccion</label>
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosPersonales--input" id="inputDireccion" type="text" name="direccion" required>
                                                    <label class="confirmaDatos__personaYtarjeta__form__datosPersonales--label" for="cp">CP</label>
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosPersonales--input" id="inputCP" type="text" name="cp" minlength="3" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" / required>
                                                </div>
                                                <div class="confirmaDatos__personaYtarjeta__form__datosTarjeta col-lg-4">
                                                    <h2 class="confirmaDatos__personaYtarjeta__form__datosTarjeta--subtitulo">datos de facturacion</h2>
                                                    <div id="inputMargin">    
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosTarjeta--input" type="text" name="numero" id="numeroTarjeta" placeholder="numero de tarjeta" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" / required>
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosTarjeta--input" type="text" name="nombre" id="nombreApellido" placeholder="nombre titular" required>
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosTarjeta--input" type="text" name="fecha" id="mesAño" placeholder="mes/año" required>
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosTarjeta--input" type="text" name="codigo" id="codigo" placeholder="codigo seg" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" / required>
                                                        <input class="confirmaDatos__personaYtarjeta__form__datosTarjeta--input" type="text" name="dni" id="titular" placeholder="dni titular de tarjeta" minlength="7" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))" / required>
                                                    </div>
                                                </div>
                                                <div class="confirmaDatos__personaYtarjeta__form__btn col-lg-12">
                                                    <button class="confirmaDatos__personaYtarjeta__form__btn--estilo">Contratá</button>
                                                </div>
                                            </form`
                                        );

                                    //  FORMULARIO "CONFIRMA TUS DATOS" 

                                        let usuarioJSON = JSON.parse(sessionStorage.getItem("Datos usuario"));

                                        $("#inputNameStorage").val(usuarioJSON.nombre);
                                        $("#inputMailStorage").val(usuarioJSON.correo);
                                        $("#inputNumberStorage").val(usuarioJSON.telefono);

                                        $("#inputDNI").change(function (e){
                                            dniCliente = $("#inputDNI").val();

                                            $("#inputDireccion").change(function (e){
                                                direccionCliente = $("#inputDireccion").val();

                                                $("#inputCP").change(function (e){
                                                    cpCliente = $("#inputCP").val();
                                                })
                                            })
                                        })

                                        $("#numeroTarjeta").change(function(e){
                                            numeroTarjeta = $("#numeroTarjeta").val();

                                            $("#nombreApellido").change(function(e){
                                                nombreYApellidoTarjeta = $("#nombreApellido").val();

                                                $("#mesAño").change(function(e){
                                                    mesAñoTarjeta = $("#mesAño").val();

                                                    $("#codigo").change(function(e){
                                                        codigoTarjeta = $("#codido").val();

                                                        $("#titular").change(function(e){
                                                            dniTarjeta = $("#titular").val();
                                                        })
                                                    })
                                                })
                                            })
                                        });

                                        $("#btn3").submit(function (event){

                                            event.preventDefault(); 

                                            datosClienteCompleto = new DatosDefinitivos(usuarioJSON.nombre, usuarioJSON.correo, usuarioJSON.telefono, dniCliente, direccionCliente, cpCliente);
                                            console.log(datosClienteCompleto);

                                           // DATOS DEFINITIVOS AL SESSION STORAGE

                                            let datosDefinitivosStorage = JSON.stringify(datosClienteCompleto);
                                            sessionStorage.setItem("Datos definitivos", datosDefinitivosStorage);

                                            tarjetaPago = new DatosTarjeta(numeroTarjeta, nombreYApellidoTarjeta, mesAñoTarjeta, codigoTarjeta, dniTarjeta);
                                            console.log(tarjetaPago);

                                            // DATOS DE CLIENTE A SERVIDOR X AJAX

                                            $.ajax({
                                                method: "POST",
                                                url: URL,
                                                data: datosClienteCompleto,
                                                success: function(respuesta){
                                                    console.log("Datos de cliente enviados al servidor correctamente");
                                                }
                                            })

                                            $.ajax({
                                                method: "POST",
                                                url: URL,
                                                data: tarjetaPago,
                                                success: function(respuesta){
                                                    console.log("Datos de tarjeta enviados al servidor correctamente");
                                                }
                                            })

                                            $(".divInicio").hide();
                                            $("#mainForm").hide();
                                            $(".containerPolizas").hide();
                                            $(".confirmaDatos").hide();
                                            $(`<section class="containerSuccess">
                                                    <div class="containerSuccess--animate">
                                                        <div class="containerSuccess--animate2">
                                                            <div class="containerSuccess__radius">
                                                                <div class="containerSuccess__radius--subtitulo">
                                                                    <h2 class="containerSuccess__radius--subtitulo-1">he</h2>
                                                                    <h2 class="containerSuccess__radius--subtitulo-1">llo<span id="span">.</span></h2>
                                                                </div>
                                                                <p class="containerSuccess__radius--parrafo">enviamos tu poliza y detalle de cobertura a tu correo</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>`).insertBefore("#idJS");
                                            $(".containerSuccess--animate").fadeIn(2500);
                                            $(".containerSuccess--animate2").slideDown(1500)
                                        })    
        })    
    })
});