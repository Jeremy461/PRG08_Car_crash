/// <reference path="gameobject.ts" />


class Wheel extends GameObject {
                        
    constructor(offsetX: number, offsetY: number, parent : HTMLElement) {
        super("wheel", parent)
        // het DOM element waar de div in geplaatst wordt:

        this.div.style.transform ="translate("+offsetX+"px, "+offsetY+"px)";
           
    }
}