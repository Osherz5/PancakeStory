Hero = function (game, x, y) {
    Persona.call(this, game, x, y, '#00BBBB', false);
    this.sprite.body.collideWorldBounds = true;
};

Hero.prototype = Object.create(Persona.prototype);

Hero.prototype.update = function () {
    var speed = 50;
    this.sprite.body.setZeroVelocity();
    if (keyboard.UP.isDown) {
        this.sprite.body.moveUp(speed);
    }
    if (keyboard.DOWN.isDown) {
        this.sprite.body.moveDown(speed);
    }
    if (keyboard.RIGHT.isDown) {
        this.sprite.body.moveRight(speed);
    }
    if (keyboard.LEFT.isDown) {
        this.sprite.body.moveLeft(speed);
    }

};