Hero = function (game, x, y) {
    Persona.call(this, game, x, y, {r: 255, g: 0, b: 0});
    this.sprite.body.collideWorldBounds = true;
};

Hero.prototype = Object.create(Persona.prototype);

Hero.prototype.update = function () {
    if (keyboard.UP.isDown) {
        this.sprite.y -= 1;
    }
    if (keyboard.DOWN.isDown) {
        this.sprite.y += 1;
    }
    if (keyboard.RIGHT.isDown) {
        this.sprite.x += 1;
    }
    if (keyboard.LEFT.isDown) {
        this.sprite.x -= 1;
    }

};