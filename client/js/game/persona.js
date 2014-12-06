window.app.Persona = function (game, x, y, color) {
    var bitmap = game.add.bitmapData(2, 2);
    bitmap.setPixel(0, 0, color.r, color.g, color.b);
    bitmap.setPixel(1, 1, color.r, color.g, color.b);
    bitmap.setPixel(1, 0, color.r, color.g, color.b);
    bitmap.setPixel(0, 1, color.r, color.g, color.b);

    window.app.PixelEntity.call(this, game, x, y, bitmap);
};

window.app.Persona.prototype = Object.create(window.app.PixelEntity.prototype);