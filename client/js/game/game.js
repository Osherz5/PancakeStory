var hero, game, extra1, keyboard = {}, hud;

game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
    preload: preload,
    create: init,
    update: update,
    render: render
});

function preload() {
    game.load.image('hud', 'assets/img/hud.png');
}

function init() {
    keyboard = {
        UP: game.input.keyboard.addKey(Phaser.Keyboard.UP),
        DOWN: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
        LEFT: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
        RIGHT: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
        INTERACT: game.input.keyboard.addKey(Phaser.Keyboard.I)
    };

    game.time.advancedTiming = true;
    game.physics.startSystem(Phaser.Physics.P2JS);

    hud = new HUD(game, 'hud');
    hud.say('Bob', ' Hi there fellow dude.');

    setTimeout(function closeHud() {
        hud.close();
        setTimeout(function openHud() {
            hud.say('Bob', 'Aloha.');
        }, 1000);
    }, 3000);
    hero = new Hero(game, 10, 10, {r: 255, g: 0, b: 0});
    extra1 = new Persona(game, 30, 30, {r: 0, g: 255, b: 0}, true);

}

function update() {
    hero.update();
    hud.update();
}

function render() {

}
