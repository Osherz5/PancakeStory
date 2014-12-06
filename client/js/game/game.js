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
        INTERACT: game.input.keyboard.addKey(Phaser.Keyboard.I),
        NEXTDIALOG: game.input.keyboard.addKey(Phaser.Keyboard.A),
        DIAGOPTION1: game.input.keyboard.addKey(Phaser.Keyboard.ONE),
        DIAGOPTION2: game.input.keyboard.addKey(Phaser.Keyboard.TWO),
        DIAGOPTION3: game.input.keyboard.addKey(Phaser.Keyboard.THREE)
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
    //hud.say('Bob', 'Hi there\nfellow dude.');
    hud.showDecision(
        'What is your favorite color?', 
        {
            1: 'a',
            2: 'b',
            3: 'c'
        }, 
        function (index, answer) {
            console.log('You chose: '+ index + '. ' + answer);
        }
    );

    hero = new Hero(game, 10, 10, {r: 255, g: 0, b: 0});
    extra1 = new Persona(game, 30, 30, {r: 0, g: 255, b: 0}, false);

}

function update() {
    hero.update();
    hud.update();
    game.physics.arcade.collide(hero.sprite, extra1.sprite);
}

function render() {

}

function render() {

}
