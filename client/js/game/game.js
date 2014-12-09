
window.onload = function() {

    TheGame.hero = null;
    TheGame.extra1 = null;
    TheGame.keyboard = {};
    TheGame.hud = null;
    TheGame.events = null;
    TheGame.gameItems = null;
    

    TheGame.isSwordDrawn = false;

    game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameContainer');
    TheGame.game = game; // fix for HUD

    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
    game.state.add('Boot', TheGame.Boot);
    game.state.add('Preloader', TheGame.Preloader);
    game.state.add('MainMenu', TheGame.MainMenu);
    game.state.add('TheGame', TheGame.InGame);
    //  Now start the Boot state.
    game.state.start('Boot');
};

TheGame.InGame = function() {

};

TheGame.InGame.prototype = {


    preload: function() {
       // Moved to preload.js
       console.log("yay all loaded");
    },
    create: function() {
        TheGame.keyboard = {
            UP: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
            DOWN: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            LEFT: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            RIGHT: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            INTERACT: this.game.input.keyboard.addKey(Phaser.Keyboard.I),
            NEXTDIALOG: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            DIAGOPTION1: this.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
            DIAGOPTION2: this.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
            DIAGOPTION3: this.game.input.keyboard.addKey(Phaser.Keyboard.THREE),
            DRAW_SWORD: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            SHEATHE: this.game.input.keyboard.addKey(Phaser.Keyboard.TILDE)
        };

        this.music = this.add.audio('village');
        this.music.play('', 0, 0.3, true);

        this.game.time.advancedTiming = true;
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        TheGame.events = new EventManager();
        TheGame.events.addEvent(this.game, 'dummyEvent');
        TheGame.hud = new HUD(this.game, 'hud');
        TheGame.hud.init();
        
        TheGame.gameItems = new GameItems();

        //TheGame.hud.say('Bob', 'Hi there man, how are you? would you let me call you: "fellow dude"? Or is that considered something bad to do? Well honestly I really dont care so if you have a problem with that you should get out of here, DUDE. Anyhow, what are you goint to do in this game? will it be something cool like salying a dragon? Or will you try to fight crazy bandits? Nothing?! Really? why is that, there is soo much to do here! Pixelia is a great place to live in! Don\'t waste it in the Tavern like all of the lazy shits there, you\'ll be fat... Ok, good luck anyway!');
       /* TheGame.hud.showDecision(
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

        TheGame.hud.showDecision(
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
        TheGame.hud.say('Bob', 'Ok\nHA\nHA\nHA\n...\nHAHAHA\nOK I am done playing with you.');
*/

        this.game.add.sprite(0, 0, drawMap(this.game));

        TheGame.hero = new Hero(this.game, 10, 10);
        TheGame.hero.inventory.push(TheGame.gameItems.getByName("Apple"));

        TheGame.extra1 = new Persona(this.game, 30, 30, 10, '#00aa00', true);

        TheGame.hero.sprite.body.createBodyCallback(TheGame.extra1.sprite, function (body) {
                if (TheGame.isSwordDrawn) {
                    TheGame.extra1.kill();
                }
            }, this);
        this.game.physics.p2.setImpactEvents(true);
        TheGame.events.pool["dummyEvent"].runOn(TheGame.extra1);
    },
    update: function() {
        TheGame.hero.update();
        TheGame.hud.update();
        Object.keys(TheGame.events.pool).forEach(function (name, index) {
            TheGame.events.pool[name].update();
        },TheGame.events.pool);
        TheGame.extra1.update();

        if (TheGame.keyboard.DRAW_SWORD.justUp) {
            TheGame.isSwordDrawn = true;
        }
        if (TheGame.keyboard.SHEATHE.justUp) {
            TheGame.isSwordDrawn = false;
        }
    },

    render: function() {

    }
};
