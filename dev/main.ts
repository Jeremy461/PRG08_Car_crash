/// <reference path="car.ts"/>

class Game {

    private car : Car;
    private rock: Rock;
    private cliff: Cliff;
    
    constructor() {
        this.car = new Car(this);
        this.rock = new Rock();
        // this.cliff = new Cliff();
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.car.move();
        this.rock.move();
        requestAnimationFrame(() => this.gameLoop());
    }

    public endGame(){
        document.getElementById("score").innerHTML = "Score : 0";
    }
    
    public carCrash(speed : number){
        this.rock.crashed(speed);
    }
} 


// load
window.addEventListener("load", function() {
    new Game();
});