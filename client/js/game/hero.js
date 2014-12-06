Hero = function (game, x, y) {
    Persona.call(this, game, x, y, {r: 255, g: 0, b: 0}, true);
    this.sprite.body.collideWorldBounds = true;
};

Hero.prototype = Object.create(Persona.prototype);

Hero.prototype.update = function () {
    var speed = 30;
    this.sprite.body.velocity = {x: 0, y: 0};
    if (keyboard.UP.isDown) {
        this.sprite.body.velocity.y = -speed;
    }
    if (keyboard.DOWN.isDown) {
        this.sprite.body.velocity.y = speed;
    }
    if (keyboard.RIGHT.isDown) {
        this.sprite.body.velocity.x = speed;
    }
    if (keyboard.LEFT.isDown) {
        this.sprite.body.velocity.x = -speed;
    }

};