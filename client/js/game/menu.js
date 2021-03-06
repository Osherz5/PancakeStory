TheGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

TheGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('intro');
		this.music.play('',0,1,true);

		//this.add.sprite(0, 0, 'titlepage');


		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.background = this.add.sprite(0, 0, 'preloaderBackground')
		this.background = this.add.sprite(320, 100, 'gameLogo');
		this.playButton = this.add.button(game.world.centerX - 95, 400, 'button', this.startGame, this, 2, 1, 0);
	},

	update: function () {

		//	Do some nice funky main menu effect here
	},

	startGame: function (pointer) {
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('TheGame');
	}
};
