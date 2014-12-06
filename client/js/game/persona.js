var Persona = function(game, x, y, color) {

    bmd = game.add.bitmapData(2, 2);
    bmd.setPixel(0, 0, color.r, color.g, color.b);
    bmd.setPixel(1, 1, color.r, color.g, color.b);
    bmd.setPixel(1, 0, color.r, color.g, color.b);
    bmd.setPixel(0, 1, color.r, color.g, color.b);

    PixelEntity.call(this, game, x, y, bmd);
};

Persona.prototype = Object.create(PixelEntity.prototype);