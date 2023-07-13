

//----CONFIGURACION-----
let AMP_MIN = 0.02; // umbral mínimo de sonido qiu supera al ruido de fondo
let AMP_MAX = 0.2 // amplitud máxima del sonido

let AMORTIGUACION = 0.9; // factor de amortiguación de la señal

let IMPRIMIR =false;


//----MICROFONO----
let mic;


//-----AMPLITUD-----
let amp; // variable para cargar la amplitud (volumen) ee la señal de entrada del mic
let haySonido = false;
let antesHabiaSonido = false; // memoria del estado de "haySonido" un fotograma atrás

//-------CAMINANTE----
let c; // el caminante
let c2; // el caminante2
let cantidad;
let saltos;
let estado;


//----GESTOR----
let gestorAmp;

//----IMAGENES----
let fondito;
let pincel;

//---TEACHABLE MACHINE------
// Global variable to store the classifier
let classifier;

// Label
let label = '';

// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/2P5jhI_8Q/';

//------------------------------------------------------------------------------------//

function preload() {
  fondito = loadImage ('images/fondito.png');
  pincel= loadImage ('images/pincel.png');

   // Load the model
   classifier = ml5.soundClassifier(soundModel + 'model.json');

}

function setup() {

  //-------CARGA FONDO------
  createCanvas(windowWidth-500, windowHeight);
  background(fondito);

  estado = "iniciar";
  cantidad = 0;
  saltos = 0;

  //-------CAMINANTE----
  c = new Caminante(cantidad, saltos);  //caminante1
  c2 = new Caminante2(cantidad, saltos);  //caminante2

  //----MICROFONO-----
  mic = new p5.AudioIn(); // objeto que se comunica con la enrada de micrófono
  mic.start(); // se inicia el flujo de audio

  //----GESTOR----
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX); // inicilizo en goestor con los umbrales mínimo y máximo de la señal

  gestorAmp.f = AMORTIGUACION;
  //------MOTOR DE AUDIO-----
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  //----CARGA PINCEL----
  pincel= loadImage('imagenes/pincel.png');

  //----CARGAR SONIDOS DEL MACHINE LEARNING-------------
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
  
}

function draw() {

gestorAmp.actualizar(mic.getLevel());  

amp = gestorAmp.filtrada;

haySonido = amp > AMP_MIN; 
//-----------------------------------------------

if (estado == "iniciar"){

let empezoElSonido = haySonido && !antesHabiaSonido; // EVENTO

if(empezoElSonido){ // esto se va a producir solomante en 1 fotogrma en el cambio de estados. Cuando comienza un nuevo sonido
  c.saltar();
  c.cambiarColor();
  c2.saltar();
  c2.cambiarColor();
  }

  if(haySonido){  // ESTADO
    
  
    c.actualizar(amp);
    c2.actualizar(amp);


    // el de los profes
   
      c.mover();
      c.dibujar();

      c2.mover();
      c2.dibujar();
      cantidad ++;
      saltos ++;
    

   // if (cantidad >= 10 && saltos >= 10){
      
     // estado = "termina";


      
    //}

    if (label == 'Aplauso'){
      c.saltar();
      c2.saltar();
      cantidad = 0;
      saltos = 0;
      estado = "termina";
      background (fondito);
    }

  } 

  }else if (estado == "termina"){

      !c2.dibujar();
      !c2.mover();
      c2.reinicio();
      
      !c.dibujar();
      c.reinicio();
      

      cantidad = 0;
      saltos = 0;

    if(haySonido){
      estado = "iniciar";
      cantidad ++;
      saltos ++;
    }
      
   
    }  
 


 
  

  if(IMPRIMIR){
    printData();
  }

  antesHabiaSonido = haySonido; // guardo el estado del fotograma anteior


  //----- PROBAR SI FUNCIONA EL SONIDO CREADO--------------
 // fill(0);
 // textSize(32);
  //textAlign(CENTER, CENTER);
 // text(label, width / 2, height / 2);


}
//--------------------------------------------------------------------
function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}

function printData(){

  background(255);
  push();
  textSize(16);
  fill(0);
  let texto;

  texto = 'amplitud: ' + amp;
  text(texto, 20, 20);

  fill(0);
  ellipse(width/2, height-amp * 300, 30, 30);

  pop();

  gestorAmp.dibujar(100, 500);
}


//-----FUNCION PARA EL SONIDO CREADO-----------
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}
