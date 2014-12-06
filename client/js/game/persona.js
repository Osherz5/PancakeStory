Persona = function (game, x, y, color, isStatic) {
    this.game = game;
    var bitmap = this._constructBitdataRectangle(2, 2, color, game);

    PixelEntity.call(this, game, x, y, bitmap);
    this.sprite.body.static = isStatic;
    this.sprite.body.fixedRotation = true;
};

Persona.prototype = Object.create(PixelEntity.prototype);

Persona.prototype._constructBitdataRectangle = function (height, width, color, game) {
    var bitmap = game.add.bitmapData(width, height);
    bitmap.rect(0, 0, height, width, color);
    return bitmap;
};

Persona.prototype.kill = function () {
    this.sprite.key = this._constructBitdataRectangle(2, 3, {r: 255, g: 0, b: 0}, this.game);
};