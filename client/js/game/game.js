window.app = {};

var hero, game;


game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
    create: init,
    update: update
});


function init() {
    window.app.keyboard = {
        UP: game.input.keyboard.addKey(Phaser.Keyboard.UP),
        DOWN: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
        LEFT: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
        RIGHT: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
        INTERACT: game.input.keyboard.addKey(Phaser.Keyboard.I)
    };

    game.time.advancedTiming = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    hero = new window.app.Hero(game, 10, 10, {r: 255, g: 0, b: 0});
}

function update() {
    hero.update();
}
