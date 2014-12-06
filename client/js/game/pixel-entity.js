var PixelEntity = function(game, x, y, bitmap) {
    this.game = game;
    this.sprite = game.add.sprite(x, y, bitmap);
	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
};
