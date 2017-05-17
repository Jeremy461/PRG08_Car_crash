/// <reference path="gameobject.ts" />
/// <reference path="rockpiece.ts" />



class Rock extends GameObject {

    private _speed:number;
    private gravity:number = 0;
    private rotation:number = 0;
    private hasCrashed:boolean = false;
    
    private rockPiece1: RockPiece;
    private rockPiece2: RockPiece;
    private rockPiece3: RockPiece;
    private rockPiece4: RockPiece;
    private rockPiece5: RockPiece;
    private rockPiece6: RockPiece;
    private rockPiece7: RockPiece;
    private rockPiece8: RockPiece;
    
    public set speed(s: number) {
        this._speed = s;
    }
                        
    constructor() {
        super("rock", document.getElementById("container"));
        
        this.rockPiece1 = new RockPiece(0, 0, this.div, 1);
        this.rockPiece2 = new RockPiece(21, 0, this.div, 2);
        this.rockPiece3 = new RockPiece(0, 21, this.div, 3);
        this.rockPiece4 = new RockPiece(21, 21, this.div, 4);
        this.rockPiece5 = new RockPiece(40, 21, this.div, 5);
        this.rockPiece6 = new RockPiece(0, 40, this.div, 6);
        this.rockPiece7 = new RockPiece(21, 40, this.div, 7);
        this.rockPiece8 = new RockPiece(40, 40, this.div, 8);

        this.x = 490;
        this.y = 210;
        this._speed = 0;
        
        this.move();
        
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";  
    }
    
    public move():void {
        
        this.x += this._speed;
        // this.y += this.gravity;
        this._speed *= 0.99;
        
        
        if(this.y + 62 > document.getElementById("container").clientHeight){
            this._speed = 0;
            this.gravity = 0;
            this.rotation = this.rotation;
        } else if(this.hasCrashed == true){
            this.rotation = this.rotation + 5;
        };    
        
        
        if (this.x > 490){
            this.y += this.gravity;
            this.rockPiece1.break(6, 0.4, 5);
            this.rockPiece2.break(5, 0.2, 3);
            this.rockPiece3.break(4.3, 0.5, 2);
            this.rockPiece4.break(5.5, 0.5, 1);
            this.rockPiece5.break(5.8, 1, 1.5);
            this.rockPiece6.break(5, 0.7, 1.2);
            this.rockPiece7.break(4.8, 2, 1);
            this.rockPiece8.break(5.2, 0.2, 0.5);
        }
    }
    
    public crashed(speed: number):void {
        this._speed = speed;
        this.gravity = 9.81;
        this.hasCrashed = true;
    }
}