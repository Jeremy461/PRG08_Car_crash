/// <reference path="gameobject.ts" />


class RockPiece extends GameObject {
    
    public set speed(s: number) {
        this._speed = s;
    }
    
    private _speed: number;
    private gravity: number = 1;
    private rotation: number = 0;
    
    private offsetX: number;
    private offsetY: number;
    
    constructor(offsetX: number, offsetY: number, parent: HTMLElement, piece: number){
        super("rockpiece", parent);
        
        
        this.div.style.width = "21px";
        this.div.style.height = "21px";
        this.div.style.backgroundImage = "url('../docs/images/rock"+piece+".png')";
        this.div.style.transform = "translate("+offsetX+"px, "+offsetY+"px)";
        
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        
        console.log(this.offsetX);
    }
    
    public break(offsetX: number, offsetY: number, rotation: number):void {
        
        this.offsetX = this.offsetX + offsetX;
        this.offsetY = this.offsetY + offsetY * this.gravity;
        this.gravity += 0.2;
        this.rotation = this.rotation + rotation;
        
        console.log(this.rotation);
        
        this.div.style.transform ="translate("+this.offsetX+"px,"+this.offsetY+"px) rotate("+this.rotation+"deg)";
    }
}