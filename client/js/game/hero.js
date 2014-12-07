Hero = function (game, x, y) {   
    Persona.call(this, game, x, y, 50, '#00BBBB', false);
};

Hero.prototype = Object.create(Persona.prototype);

Hero.prototype.update = function () {
    var speed = this.speed;
    this.sprite.body.setZeroVelocity();
    if (TheGame.keyboard.UP.isDown) {
        this.sprite.body.moveUp(speed);
    }
    if (TheGame.keyboard.DOWN.isDown) {
        this.sprite.body.moveDown(speed);
    }
    if (TheGame.keyboard.RIGHT.isDown) {
        this.sprite.body.moveRight(speed);
    }
    if (TheGame.keyboard.LEFT.isDown) {
        this.sprite.body.moveLeft(speed);
    }

};