
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: init, update: update, render: render});
var players = [], mainPlayer;
var bmd, sprite;

function preload() {
	// Load game assets here
}

function init() {
	game.time.advancedTiming = true;
	game.physics.startSystem(Phaser.Physics.ARCADE);

	new Persona(game, 10, 10, {r:255, g:0, b:0 });
}

function update() {
}

function render () {
}