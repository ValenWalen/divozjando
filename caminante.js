
class Caminante{

    constructor(cantidad_, saltos){
        
        this.saltar();
        this.cantidad = cantidad_;
        this.vel = 17;
        this.dir = radians(random(360));
        this.dirCruda = this.dir;
        this.varAngular = radians(random(1000));
        
        this.diam = random(3, 5);
        this.elColor = this.diam>4?color(random(100,200), random (100,200),random(100,200)):color(random(20,255));
        this.x = 0;
        this.y = 0;
        this.px = 0;
        this.py = 0;
        this.distanciaRecorrida =0;
        this.limiteRecorrido = 1500;

        this.huboUnSalto = false;
        this.cantSaltos = saltos;
   }

    //-----------------------------------------------

    actualizar(amplitud){

        this.diam = map(amplitud, AMP_MIN, AMP_MAX, 3, 7 ); // mapeamos el valor de amp de entrada al diámetro del caminante
    }
    //-----------------------------------------------
    saltar(){
        this.x = random(windowWidth);
        this.y = random(windowHeight);
        this.diam = random(3, 5);
        this.elColor = (random(100, 200),random(100, 200),random(100, 200));
        
        this.huboUnSalto = true;
        this.cantSaltos++;
    }
    

    //-----------------------------------------------
    cambiarColor(){
        this.elColor = color(random(100,200),random(100, 200),random(100, 200));
    }
    
    //-----------------------------------------------
    mover(){
        this.huboUnSalto = false;
        this.px = this.x;
        this.py = this.y;
        this.dirCruda += radians(random(-this.varAngular, this.varAngular*0.5));
        if(random(100)<3){
            if(random(100)<50)
                this.dirCruda += radians(100);
            else
                this.dirCruda += radians(-100);
        }   
        this.dir = lerp(this.dir,this.dirCruda,0.4);
         this.x = this.x + this.vel * cos(this.dir);
         this.y = this.y + this.vel * sin(this.dir);
 
         //--------Espacio toroidal---
         if (this.x >= windowWidth){
             this.x = random (windowWidth);
             this.huboUnSalto = true;
         }
         if (this.x <= 0){
            this.x = random (windowWidth);
            this.huboUnSalto = true;
         }
 
         if (this.y >= 800){
            this.y = random (windowHeight);
            this.huboUnSalto = true;
         }
         if (this.y <= -800){
            this.y = random (windowHeight);
            this.huboUnSalto = true;
         }

         this.distanciaRecorrida+=this.vel;
        
         if(this.distanciaRecorrida>this.limiteRecorrido){
            this.distanciaRecorrida = 0;
            this.limiteRecorrido = random(500,800);
            this.saltar();// = color(255,0,0);
         }

        if (this.cantSaltos >= 50){
            this.distanciaRecorrida = 0;
            this.limiteRecorrido = 0;
            !this.saltar ();
         }
    }
    //-----------------------------------------------
    dibujar(){
        //rect redondeadito y rotado
        //push();
        //noStroke();
        //fill(this.elColor);
        //translate(this.x, this.y);
        //rotate( this.dir);
        //rect(0,0, this.diam, this.diam,this.diam*0.4);
        //pop();

        if(!this.huboUnSalto){
        push();
        strokeWeight(this.diam);
        stroke(this.elColor);
        line(this.x,this.y,this.px,this.py);
        pop();
       
        }

    }

    reinicio(){
        this.cantSaltos = 0;
    }


}