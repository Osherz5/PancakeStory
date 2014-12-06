var hero, game, extra1, keyboard = {}, hud;
var isSwordDrawn = false;

game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game', {
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
        INTERACT: game.input.keyboard.addKey(Phaser.Keyboard.I),
        NEXTDIALOG: game.input.keyboard.addKey(Phaser.Keyboard.A),

        DRAW_SWORD: game.input.keyboard.addKey(Phaser.Keyboard.ONE),
        SHEATHE: game.input.keyboard.addKey(Phaser.Keyboard.TILDE)
    };

    // Add tap event ona to show next dialog in hud
    keyboard.NEXTDIALOG.onUp.add(function nextDialog() {
        hud.showNextText();
    }, this);

    game.time.advancedTiming = true;
    game.physics.startSystem(Phaser.Physics.P2JS);

    hud = new HUD(game, 'hud');
    hud.say('Bob', 'Hi there\nfellow dude.\nYet another dialog.\ntest\n123\n123\n123');
    hero = new Hero(game, 10, 10, {r: 255, g: 0, b: 0});
    extra1 = new Persona(game, 30, 30, '#00ff00', true);


    hero.sprite.body.onBeginContact.add(blockHit, this);

}

function update() {
    hero.update();
    hud.update();
    if (keyboard.DRAW_SWORD.justUp) {
        isSwordDrawn = true;
    }
    if (keyboard.SHEATHE.justUp) {
        isSwordDrawn = false;
    }
}

function render() {

}

function blockHit(body) {
    if (body) {
        if (isSwordDrawn) {
            extra1.kill();
        }
        console.log(body.sprite.key);
    }
}
