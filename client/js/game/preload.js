
TheGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
        this.sounds = ['intro', 'village', 'unknown'];

	this.ready = false;

};

TheGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(200, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.game.load.image('hud', 'assets/img/hud.png');
	    this.game.load.image('tile', 'assets/img/a.png');
		this.game.load.json('map', 'assets/maps/testing.json');
	    this.game.load.spritesheet('button', 'assets/buttons/play.png', 193, 71);
	    this.game.add.text(0, 0, "fix", {font:"1px Munro", fill:"#FFFFFF"}); //hack to load font

            // events area
            game.load.text('dummyEvent', 'assets/events/testscript.json');
            
            
	    

            this.sounds.forEach(function(sound) {
                this.load.audio(sound, ['assets/sounds/' + sound + '.mp3']);
            }, this);
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
                var soundsDecoded = this.sounds.every(function(sound) {
                    return this.cache.isSoundDecoded(sound);
                }, this);
		if (soundsDecoded && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}
	}
};
