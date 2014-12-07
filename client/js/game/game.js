var hero, game, extra1, keyboard = {}, hud, events = [], dummyEvent;
var isSwordDrawn = false;

game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game', {
    preload: preload,
    create: init,
    update: update,
    render: render
});

function preload() {
    game.load.image('hud', 'assets/img/hud.png');
    game.load.image('tile', 'assets/img/a.png');
    this.game.add.text(0, 0, "fix", {font:"1px Munro", fill:"#FFFFFF"}); //hack to load font
    addEvent(game,events,"dummyEvent","assets/events/testscript.json");
}

function init() {
    keyboard = {
        UP: game.input.keyboard.addKey(Phaser.Keyboard.UP),
        DOWN: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
        LEFT: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
        RIGHT: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
        INTERACT: game.input.keyboard.addKey(Phaser.Keyboard.I),
        NEXTDIALOG: game.input.keyboard.addKey(Phaser.Keyboard.A),
        DIAGOPTION1: game.input.keyboard.addKey(Phaser.Keyboard.ONE),
        DIAGOPTION2: game.input.keyboard.addKey(Phaser.Keyboard.TWO),
        DIAGOPTION3: game.input.keyboard.addKey(Phaser.Keyboard.THREE),
        DRAW_SWORD: game.input.keyboard.addKey(Phaser.Keyboard.S),
        SHEATHE: game.input.keyboard.addKey(Phaser.Keyboard.TILDE)
    };

    game.time.advancedTiming = true;
    game.physics.startSystem(Phaser.Physics.P2JS);

    hud = new HUD(game, 'hud');
    hud.init();
    hud.say('Bob', 'Hi there\nfellow dude.');
    hud.showDecision(
        'What is your favorite color?',
        {
            1: 'blue',
            2: 'red',
            3: 'green'
        },
        function (index, answer) {
            console.log('You chose: ' + index + '. ' + answer);
        }
    );

    hud.showDecision(
        'Are you a:',
        {
            1: 'cat person',
            2: 'dog person',
            3: 'platipus person'
        },
        function (index, answer) {
            console.log('You chose: ' + index + '. ' + answer);
        }
    );
    hud.say('Bob', 'Ok\nHA\nHA\nHA\n...\nHAHAHA\nOK I am done playing with you.');

    hero = new Hero(game, 10, 10, '#00ff00');
    extra1 = new Persona(game, 30, 30, 7, '#00ff00', true);
    //var map = new Map(game);
    //this.game.world.addAt(hero, 2);
    hero.sprite.body.createBodyCallback(extra1.sprite, function (body) {
            if (isSwordDrawn) {
                extra1.kill();
            }
        }, this);
    game.physics.p2.setImpactEvents(true);
    events['dummyEvent'].runOn(extra1);
}

function update() {
    hero.update();
    hud.update();
    Object.keys(events).forEach(function (name, evt) {
        this[name].update();
    },events);
    extra1.update();

    if (keyboard.DRAW_SWORD.justUp) {
        isSwordDrawn = true;
    }
    if (keyboard.SHEATHE.justUp) {
        isSwordDrawn = false;
    }
}

function render() {

}
