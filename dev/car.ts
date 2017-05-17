/// <reference path="wheel.ts"/>
/// <reference path="gameobject.ts" />


class Car extends GameObject {

    private speed:number;
    private braking:boolean;
    private crashed:boolean;
    
    private wheel1: Wheel;
    private wheel2: Wheel;
    
    private game : Game;
            
    constructor(g: Game) {
        super("car", document.getElementById("container"));
        // het DOM element waar de div in geplaatst wordt:

        this.game = g;
        this.speed = 4;
        this.x = 0;
        this.y = 220;

        this.wheel1 = new Wheel(15, 30, this.div);
        this.wheel2 = new Wheel(105, 30, this.div);
        
        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        document.addEventListener("keydown", this.brake.bind(this));

        // alvast goed zetten

        this.move();
        
    }

    public move():void {
        // hier de snelheid verlagen als we aan het afremmen zijn
        if(this.braking == true && this.speed > 0){
            this.speed -= 0.05;
        } else if(this.braking == true){
            this.speed = 0;
        }

        // // hier kijken of de x waarde hoger is dan de x van de rots (335)
        if(this.x+145 > 490){
           
            if(!this.crashed){
                this.game.carCrash(this.speed);
                this.stop();
            }
            
            this.crashed = true;
        }

        // de snelheid bij de x waarde optellen
        this.x += this.speed;
        
        // tekenen
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    } 
    
    private brake():void {
        this.braking = true;
    }
    
    private stop(): void {
        this.speed = 0;
    }

    //
    // hier een method maken voor on key press
    //
}