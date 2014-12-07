
window.onload = function() {

    TheGame.hero = null;
    TheGame.extra1 = null;
    TheGame.keyboard = {};
    TheGame.hud = null;
    TheGame.events = [];
    TheGame.dummyEvent= null;

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

        keyboard = {
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

        this.game.time.advancedTiming = true;
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        TheGame.hud = new HUD(this.game, 'hud');
        TheGame.hud.init();
        TheGame.hud.say('Bob', 'Hi there\nfellow dude.');
        TheGame.hud.showDecision(
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


        TheGame.hero = new Hero(this.game, 10, 10, '#00ff00');
        TheGame.extra1 = new Persona(this.game, 30, 30, 7, '#00ff00', true);
        //var map = new Map(this.game);
        //this.this.game.world.addAt(hero, 2);
        TheGame.hero.sprite.body.createBodyCallback(TheGame.extra1.sprite, function (body) {
                if (TheGame.isSwordDrawn) {
                    TheGame.extra1.kill();
                }
            }, this);
        this.game.physics.p2.setImpactEvents(true);
        TheGame.dummyEvent.runOn(TheGame.extra1);
    },

    update: function() {
        
        TheGame.hero.update();
        TheGame.hud.update();
        TheGame.events.forEach(function (e) {
            e.update();
        });
        TheGame.extra1.update();

        if (keyboard.DRAW_SWORD.justUp) {
            isSwordDrawn = true;
        }
        if (keyboard.SHEATHE.justUp) {
            isSwordDrawn = false;
        }
    },

    render: function() {

    }
};
