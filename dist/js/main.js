var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(tag, parent) {
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "div", {
        get: function () {
            return this._div;
        },
        set: function (value) {
            this._div = value;
        },
        enumerable: true,
        configurable: true
    });
    return GameObject;
}());
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(offsetX, offsetY, parent) {
        _super.call(this, "wheel", parent);
        this.div.style.transform = "translate(" + offsetX + "px, " + offsetY + "px)";
    }
    return Wheel;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(g) {
        _super.call(this, "car", document.getElementById("container"));
        this.game = g;
        this.speed = 4;
        this.x = 0;
        this.y = 220;
        this.wheel1 = new Wheel(15, 30, this.div);
        this.wheel2 = new Wheel(105, 30, this.div);
        document.addEventListener("keydown", this.brake.bind(this));
        this.move();
    }
    Car.prototype.move = function () {
        if (this.braking == true && this.speed > 0) {
            this.speed -= 0.05;
        }
        else if (this.braking == true) {
            this.speed = 0;
        }
        if (this.x + 145 > 490) {
            if (!this.crashed) {
                this.game.carCrash(this.speed);
                this.stop();
            }
            this.crashed = true;
        }
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Car.prototype.brake = function () {
        this.braking = true;
    };
    Car.prototype.stop = function () {
        this.speed = 0;
    };
    return Car;
}(GameObject));
var Cliff = (function (_super) {
    __extends(Cliff, _super);
    function Cliff() {
        _super.call(this, "cliff", document.getElementById("container"));
        this.x = 0;
        this.y = 270;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }
    return Cliff;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.car = new Car(this);
        this.rock = new Rock();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.move();
        this.rock.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        document.getElementById("score").innerHTML = "Score : 0";
    };
    Game.prototype.carCrash = function (speed) {
        this.rock.crashed(speed);
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var RockPiece = (function (_super) {
    __extends(RockPiece, _super);
    function RockPiece(offsetX, offsetY, parent, piece) {
        _super.call(this, "rockpiece", parent);
        this.gravity = 1;
        this.rotation = 0;
        this.div.style.width = "21px";
        this.div.style.height = "21px";
        this.div.style.backgroundImage = "url('../docs/images/rock" + piece + ".png')";
        this.div.style.transform = "translate(" + offsetX + "px, " + offsetY + "px)";
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        console.log(this.offsetX);
    }
    Object.defineProperty(RockPiece.prototype, "speed", {
        set: function (s) {
            this._speed = s;
        },
        enumerable: true,
        configurable: true
    });
    RockPiece.prototype.break = function (offsetX, offsetY, rotation) {
        this.offsetX = this.offsetX + offsetX;
        this.offsetY = this.offsetY + offsetY * this.gravity;
        this.gravity += 0.2;
        this.rotation = this.rotation + rotation;
        console.log(this.rotation);
        this.div.style.transform = "translate(" + this.offsetX + "px," + this.offsetY + "px) rotate(" + this.rotation + "deg)";
    };
    return RockPiece;
}(GameObject));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        _super.call(this, "rock", document.getElementById("container"));
        this.gravity = 0;
        this.rotation = 0;
        this.hasCrashed = false;
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
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }
    Object.defineProperty(Rock.prototype, "speed", {
        set: function (s) {
            this._speed = s;
        },
        enumerable: true,
        configurable: true
    });
    Rock.prototype.move = function () {
        this.x += this._speed;
        this._speed *= 0.99;
        if (this.y + 62 > document.getElementById("container").clientHeight) {
            this._speed = 0;
            this.gravity = 0;
            this.rotation = this.rotation;
        }
        else if (this.hasCrashed == true) {
            this.rotation = this.rotation + 5;
        }
        ;
        if (this.x > 490) {
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
    };
    Rock.prototype.crashed = function (speed) {
        this._speed = speed;
        this.gravity = 9.81;
        this.hasCrashed = true;
    };
    return Rock;
}(GameObject));
//# sourceMappingURL=main.js.map