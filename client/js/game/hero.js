window.app.Hero = function (game, x, y) {
    window.app.Persona.call(this, game, x, y, {r: 255, g: 0, b: 0});
    this.sprite.body.collideWorldBounds = true;
};

window.app.Hero.prototype = Object.create(window.app.Persona.prototype);

window.app.Hero.prototype.update = function () {
    if (window.app.keyboard.UP.isDown) {
        this.sprite.y -= 1;
    }
    if (window.app.keyboard.DOWN.isDown) {
        this.sprite.y += 1;
    }
    if (window.app.keyboard.RIGHT.isDown) {
        this.sprite.x += 1;
    }
    if (window.app.keyboard.LEFT.isDown) {
        this.sprite.x -= 1;
    }

};