var hero, game, extra1, keyboard = {}, hud, events = [];
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
    dummyEvent = new ScriptedEvent(game, 'dummyEvent', 'assets/events/testscript.json');
    events.push(dummyEvent);
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

    // Add tap event ona to show next dialog in hud
    keyboard.NEXTDIALOG.onUp.add(function nextDialog() {
        hud.showNextText();
    }, this);

    // Add option events
    keyboard.DIAGOPTION1.onUp.add(function dialogOptionOne() {
        hud.setAnswer(1);
    }, this);
    keyboard.DIAGOPTION2.onUp.add(function dialogOptionTwo() {
        hud.setAnswer(2);
    }, this);
    keyboard.DIAGOPTION3.onUp.add(function dialogOptionThree() {
        hud.setAnswer(3);
    }, this);

    game.time.advancedTiming = true;
    game.physics.startSystem(Phaser.Physics.P2JS);

    hud = new HUD(game, 'hud');
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
    extra1 = new Persona(game, 30, 30, '#00ff00', false);
    //var map = new Map(game);
    //this.game.world.addAt(hero, 2);
    hero.sprite.body.createBodyCallback(extra1.sprite, blockHit, this);
    game.physics.p2.setImpactEvents(true);

    dummyEvent.runOn(extra1);
}

function update() {
    hero.update();
    hud.update();
    events.forEach(function (e) {
        e.update();
    });

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
    if (isSwordDrawn) {
        extra1.kill();
    }
}
