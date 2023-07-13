class Caminante2{

    constructor(cantidad_, saltos){
        
        this.saltar();
        this.cantidad = cantidad_;
        this.vel = 10;
        this.dir = radians(random(360));
        this.dirCruda = this.dir;
        this.varAngular = radians(random(1000));
        
        this.diam = random(15, 40);
        this.elColor = this.diam>20?color(random(50,180), random (50,100),random(50,100)):color(random(255));
        this.x = 0;
        this.y = 0;
        this.px = 0;
        this.py = 0;
        this.distanciaRecorrida =0;
        this.limiteRecorrido = 2000;

        this.huboUnSalto = false;
        this.cantSaltos = saltos;

   }

    //-----------------------------------------------

    actualizar(amplitud){

        this.diam = map(amplitud, AMP_MIN, AMP_MAX, 15, 20 ); // mapeamos el valor de amp de entrada al diámetro del caminante
    }
    //-----------------------------------------------
    saltar(){
        this.x = random(windowWidth);
        this.y = random(windowHeight);
        this.diam = random(15, 40);
        this.elColor = this.diam>20?color(random(50,180), random (50,150),random(50,100)):color(random(255));
        
        this.huboUnSalto = true;
        this.cantSaltos++;
    }
    

    //-----------------------------------------------
    cambiarColor(){
        this.elColor = color(random(50,180),random(50,150),random(50,150));
    }
    
    //-----------------------------------------------
    mover(){
        this.huboUnSalto = false;
        this.px = this.x;
        this.py = this.y;
        this.dirCruda += radians(random(-this.varAngular, this.varAngular));
        if(random(100)<3){
            if(random(100)<50)
                this.dirCruda += radians(100);
            else
                this.dirCruda += radians(-100);
        }   
        this.dir = lerp(this.dir,this.dirCruda,0.2);
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
            this.limiteRecorrido = random(500,650);
            this.saltar();// = color(255,0,0);
         }

         if (this.cantSaltos >= 30){
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