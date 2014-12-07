Persona = function (game, x, y, speed, color, isKinematic) {
    this.game = game;
    this.reachedDest = true;
    this.dest = [0,0];

    this.speed = speed;
    
    var bitmap = this._constructBitdataRectangle(4, 4, color, game);

    PixelEntity.call(this, game, x, y, bitmap);
    this.sprite.body.kinematic = isKinematic;
    this.sprite.body.fixedRotation = true;
};

Persona.prototype = Object.create(PixelEntity.prototype);

Persona.prototype._constructBitdataRectangle = function (height, width, color) {
    var bitmap = this.game.add.bitmapData(width, height);
    bitmap.rect(0, 0, width, height, color);
    return bitmap;
};

Persona.prototype.kill = function () {
    this.sprite.kill();
    this.sprite = this.game.add.sprite(this.sprite.x, this.sprite.y, this._constructBitdataRectangle(2, 8, '#ff0000'));
};

Persona.prototype.update = function(){
    if(!this.reachedDest) {
         // move X
         this.sprite.body.moveRight(this.speed * Math.sign(this.dest[0] - this.sprite.x));
         // move Y
         this.sprite.body.moveDown(this.speed * Math.sign(this.dest[1] - this.sprite.y));
         // check if command ended
         if (Math.round(this.sprite.x) === Math.round(this.dest[0])
            && Math.round(this.sprite.y) === Math.round(this.dest[1])) {
            //console.log("ended command");
                this.sprite.body.setZeroVelocity();
                this.reachedDest = true;
         }
    }
};

Persona.prototype.moveTo = function(x, y){
    // set destination
    this.dest = [x, y];
};
