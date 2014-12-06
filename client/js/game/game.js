window.app = {};

var hero, game;

function init() {
    game.time.advancedTiming = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    hero = new window.app.Hero(game, 10, 10, {r: 255, g: 0, b: 0});
}

function update() {
    hero.update();
}

game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
    create: init,
    update: update
});