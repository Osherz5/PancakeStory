var Map = function(game, key, tileWidth, tileHeight, width, height) {
    Phaser.Tilemap.call(this, game, key, tileWidth, tileHeight, width, height);

    this.addTilesetImage('tile');

    var ground = this.create('ground');
    ground.resizeWorld();

    var buildings = this.createBlankLayer('buildings');
    this.setCollisionByExclusion([], true, buildings);

    var trees = this.createBlankLayer('trees');

    //this.setCollisionBetween(1, 12);
};


Map.prototype = Object.create(Phaser.Tilemap.prototype);