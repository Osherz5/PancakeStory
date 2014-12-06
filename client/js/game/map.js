var Map = function(game, key, tileWidth, tileHeight, width, height) {
    Phaser.Tilemap.call(this, game, key, tileWidth, tileHeight, width, height);

    this.addTilesetImage('tile');

    var ground = this.createLayer('ground'); // This is layer index '0'
    ground.resizeWorld();

    var buildings = this.createLayer('buildings'); // layer index 3
    this.setCollisionByExclusion([], true, buildings);

    var trees = this.createLayer('trees'); // etc.
};


Map.prototype = Object.create(Phaser.Tilemap.prototype);