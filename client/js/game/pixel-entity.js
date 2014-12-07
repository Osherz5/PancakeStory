PixelEntity = function (game, x, y, bitmap) {
    this.game = game;
    this.sprite = game.add.sprite(x, y, bitmap);
    //this.sprite = new Phaser.Sprite(x, y, bitmap);
    //this.game.world.addAt(this.sprite, 0);
    this.game.physics.enable(this.sprite, Phaser.Physics.P2JS);
    this.sprite.body.collideWorldBounds = true;
};
