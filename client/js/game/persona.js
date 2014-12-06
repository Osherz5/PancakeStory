Persona = function (game, x, y, color, isStatic) {
    this.game = game;
    var bitmap = this._constructBitdataRectangle(4, 4, color, game);

    PixelEntity.call(this, game, x, y, bitmap);
    this.sprite.body.static = isStatic;
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
    this.sprite = game.add.sprite(this.sprite.x, this.sprite.y, this._constructBitdataRectangle(2, 8, '#ff0000'));
};