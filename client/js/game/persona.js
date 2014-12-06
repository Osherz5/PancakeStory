Persona = function (game, x, y, color, moves) {
    var bitmap = game.add.bitmapData(2, 2);
    bitmap.setPixel(0, 0, color.r, color.g, color.b);
    bitmap.setPixel(1, 1, color.r, color.g, color.b);
    bitmap.setPixel(1, 0, color.r, color.g, color.b);
    bitmap.setPixel(0, 1, color.r, color.g, color.b);

    PixelEntity.call(this, game, x, y, bitmap);
    this.sprite.body.moves = moves;
};

Persona.prototype = Object.create(PixelEntity.prototype);