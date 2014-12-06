Persona = function (game, x, y, color, isStatic) {
    var w = 2, h = 2;
    var bitmap = game.add.bitmapData(w, h);
    for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
            bitmap.setPixel(i, j, color.r, color.g, color.b);
        }
    }

    PixelEntity.call(this, game, x, y, bitmap);
    this.sprite.body.static = isStatic;
    this.sprite.body.fixedRotation = true;
};

Persona.prototype = Object.create(PixelEntity.prototype);