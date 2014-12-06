var HUD = function (game, hudImage) {
    this.BG_X = 0;
    this.BG_Y = 375;
    this.TEXT_START_X = 50;
    this.TEXT_START_Y = 425;
    this.THE_TEXT_START_X = 55;
    this.THE_TEXT_START_Y = 452;
    this.SAY_SPEED_MS = 50;
    this.MAX_LINES_COUNT = 1;

    this.game = game;
    this.group = game.add.group();
    this.currentTextLine = 0;
    this.allText = "";
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

// Display text in hud 
HUD.prototype.showText = function(newText) {
    if(newText.indexOf('\n') === -1) {
        this.theText.setText(newText);
        return;
    }
    var lines = newText.split('\n');    
    var textLineCount = lines.length;
    var currentText = newText;
    this.allText = newText;
    this.currentTextLine = 0;
   
    // Show only the right amount of lines
    if(textLineCount > this.MAX_LINES_COUNT) {
        // Remove the overflowing lines
        lines.splice(this.MAX_LINES_COUNT, lines.length);
        currentText = lines.join("");
        this.currentTextLine = this.MAX_LINES_COUNT; 
    }

    this.theText.setText(currentText);
    this._animateTheText();
}

// If show text was too big for hud,
// this function could show the next part of it.
HUD.prototype.showNextText = function() {
    var lines = this.allText.split('\n'); 
    var currentText = "";

    if(this.currentTextLine > 0) {
        lines.splice(0, this.currentTextLine);
        if(lines.length > this.MAX_LINES_COUNT) {
            lines.splice(this.MAX_LINES_COUNT, lines.length);
            currentText = lines.join("");

            this.currentTextLine += this.MAX_LINES_COUNT; 
        } else {
            currentText = lines.join("");
        }
    }
    this.theText.setText(currentText);
    this._animateTheText();
}


// Show a dialog in the hud
HUD.prototype.say = function(who, saysWhat) {
    this.closed = false;
    this.img.reset(this.BG_X, this.BG_Y)

	this.whoText.setText(who);
    this.showText(saysWhat);
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