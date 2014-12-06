var HUD = function (game, hudImage) {
    this.BG_X = 0;
    this.BG_Y = 375;
    this.TEXT_START_X = 50;
    this.TEXT_START_Y = 425;
    this.THE_TEXT_START_X = 55;
    this.THE_TEXT_START_Y = 452;
    this.SAY_SPEED_MS = 50;

    this.game = game;
    this.group = game.add.group();
    this.whoText = game.add.text(this.TEXT_START_X, this.TEXT_START_Y, "q", {
        font: "20px Arial",
        fill: "#000000",
        align: "left"
    });
    this.theText = game.add.text(this.TEXT_START_X, this.THE_TEXT_START_Y, "w", {
        font: "16px Arial",
        fill: "#000000",
        align: "left"
    });
    this.img = game.add.sprite(this.BG_X, this.BG_Y, hudImage);

    // We want to move it when closing
    game.physics.enable(this.img, Phaser.Physics.ARCADE);

    this.group.add(this.img);
    this.group.add(this.whoText);
    this.group.add(this.theText);
};

// Show a dialog in the hud
HUD.prototype.say = function(who, saysWhat) {
    this.closed = false;
    this.img.reset(this.BG_X, this.BG_Y)

    console.log(this.img.body);
	this.whoText.setText(who);
	this.theText.setText(saysWhat);
	this._animateTheText();
}

// Create a nice a nimation effect when saying stuff
HUD.prototype._animateTheText = function() {
	var theText = this.theText.text;
	var textLength = theText.length + 1;
	var charIndex = 0;

	// Repeat each new char every 80ms
	game.time.events.repeat(this.SAY_SPEED_MS, textLength, function() {
		var newText = theText.substring(0, ++charIndex);
		this.theText.setText(newText)
	}, this);
}

HUD.prototype.update = function() {
    if(this.closed) {
        this.whoText.setText("");
        this.theText.setText("");
        if(this.img.body.y <= this.game.height) {
            this.img.body.velocity.y += 50;
        }
    }
}

// Close the HUD
HUD.prototype.close = function() {
    this.closed = true;
}