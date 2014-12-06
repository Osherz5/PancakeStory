var HUD = function (game, hudImage) {
    this.BG_X = 0;
    this.BG_Y = 375;
    this.TEXT_START_X = 50;
    this.TEXT_START_Y = 425;
    this.THE_TEXT_START_X = 55;
    this.THE_TEXT_START_Y = 452;
    this.SAY_SPEED_MS = 50;
    this.MAX_LINES_COUNT = 5;

    this.game = game;
    this.nextable = true;
    this.group = game.add.group();
    this.currentTextLine = 0;
    this.allText = "";
    this.shouldCloseDialog = false;

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
        currentText = lines.join('\n');
        this.currentTextLine = this.MAX_LINES_COUNT; 
    }

    this._animateTheText(currentText);
}

// If show text was too big for hud,
// this function could show the next part of it.
HUD.prototype.showNextText = function() {
    if(!this.nextable) {
        return;
    }
    var lines = this.allText.split('\n'); 
    var currentText = "";
    if(this.shouldCloseDialog) {
        this.shouldCloseDialog = false;
        this.close();
        return;
    }

    if(this.currentTextLine > 0) {
        lines.splice(0, this.currentTextLine);
        if(lines.length > this.MAX_LINES_COUNT) {
            lines.splice(this.MAX_LINES_COUNT, lines.length);
            currentText = lines.join('\n');

            this.currentTextLine += this.MAX_LINES_COUNT; 
        } else {
            currentText = lines.join('\n');
            this.shouldCloseDialog = true;
        }
    }
    if(currentText === "") {
        this.shouldCloseDialog = true;
        currentText = "...";
    }

    this._animateTheText(currentText);
}


// Show a dialog in the hud
HUD.prototype.say = function (who, saysWhat) {
    this.closed = false;
    this.img.reset(this.BG_X, this.BG_Y)

	this.whoText.setText(who);
    this.showText(saysWhat);
}

// Create a nice a nimation effect when saying stuff
HUD.prototype._animateTheText = function (theText) {
    this.nextable = false;
    var textLength = theText.length + 1;
    var charIndex = 0;

    // Repeat each new char every 80ms
    game.time.events.repeat(this.SAY_SPEED_MS, textLength, function () {
        var newText = theText.substring(0, ++charIndex);
        this.theText.setText(newText)
    }, this);

    // Hacky shit right here! make the 
    //  next option available when the repeat is done
    setTimeout(function clearNextable() {
        this.nextable = true;
    }.bind(this), this.SAY_SPEED_MS * textLength);
}

HUD.prototype.update = function () {
    if (this.closed) {
        this.whoText.setText("");
        this.theText.setText("");
        if (this.img.body.y <= this.game.height) {
            this.img.body.velocity.y += 50;
        }
    }
}

// Close the HUD
HUD.prototype.close = function () {
    this.closed = true;
}