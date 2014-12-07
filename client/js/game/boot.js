var TheGame = {};

TheGame.Boot = function (game) {
};

TheGame.Boot.prototype = {

    init: function () {
        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        // Sound toggle
        var soundToggle = document.querySelector('input.sound');
        var soundEnabled = true;
        if ('soundEnabled' in localStorage) {
            soundEnabled = JSON.parse(localStorage.soundEnabled);
        }
        soundToggle.onchange = function() {
            var soundEnabled = soundToggle.checked;
            localStorage.setItem('soundEnabled', soundEnabled);
            TheGame.game.sound.mute = !soundEnabled;
        };
        soundToggle.checked = soundEnabled;
        TheGame.game.sound.mute = !soundEnabled;
    },

    preload: function () {
        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'assets/img/loadbg.jpg');
        this.load.image('gameLogo', 'assets/img/logo.png');
        this.load.image('preloaderBar', 'assets/img/loading.png');
    },

    create: function () {
        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');
    }
};
