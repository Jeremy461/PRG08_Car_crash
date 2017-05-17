/// <reference path="gameobject.ts" />


class Cliff extends GameObject {
    
    constructor(){
        
        super("cliff", document.getElementById("container"));
        
        this.x = 0;
        this.y = 270;
        
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }
    
}