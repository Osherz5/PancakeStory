var HUD = function (game, hudImage) {
    this.BG_X = 0;
    this.BG_Y = 375;
    this.TEXT_START_X = 50;
    this.TEXT_START_Y = 425;
    this.THE_TEXT_START_X = 55;
    this.THE_TEXT_START_Y = 452;
    this.SAY_SPEED_MS = 50;
    this.MAX_LINES_COUNT = 5;

    // General
    this.group = game.add.group();
    this.game = game;
    this.active = false; // Checks if we can display a new dialog
    this.shouldBeClosed = true; // Decides if we should close the HUD
    
    // Currently saying & saying queue
    this.sayingMode = false; // Checks if we are in saying mode
    this.sayingQueue = []; // Holds dialogs that are waiting for the current dialog to end
    this.sayCallback = null; // Used to tell if the user has read the dialog

    // Decisions
    this.decisionMode = false; // Checks if we are in decision mode
    this.currentDecisions = []; // Holds the current decisions object
    this.answerCallback = null; // Called when answer is given from player

    // Next screen
    this.allText = ""; // Holds of of the current dialog text (not offsets)
    this.nextable = true; // Checks if the next screen passable
    this.currentTextLine = 0; // Show text from this offset
    this.shouldCloseDialog = false; // Checks if we should close the dialog?

    this.whoText = game.add.text(this.TEXT_START_X, this.TEXT_START_Y, "", {
        font: "20px Arial",
        fill: "#000000",
        align: "left"
    });

    this.theText = game.add.text(this.TEXT_START_X, this.THE_TEXT_START_Y, "", {
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
HUD.prototype.say = function (who, saysWhat, callback) {
    if(this.active) {
        // Add to queue @todo
        console.log("adding to queue" + who)
        return;
    }
    this.active = true;
    this.shouldBeClosed = false;
    this.sayingMode = true;
    this.decisionMode = false;
    this.img.reset(this.BG_X, this.BG_Y);
    this.sayCallback = callback;

	this.whoText.setText(who);
    this.showText(saysWhat);
}

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

    if(textLineCount <= this.MAX_LINES_COUNT) {
        this.shouldCloseDialog = true;
    }

    this._animateTheText(currentText);
}

// If show text was too big for hud,
// this function could show the next part of it.
HUD.prototype.showNextText = function() {
    var lines = this.allText.split('\n'); 
    var currentText = "";

    // Check if we can apply this function
    if(!this.nextable) {
        return;
    }

    // Check if we should close the dialog
    if(this.shouldCloseDialog) {
        this.shouldCloseDialog = false;
        this.shouldBeClosed = true;
        this.sayCallback();
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
    //  next screen available when the repeat is done
    setTimeout(function clearNextable() {
        this.nextable = true;
    }.bind(this), this.SAY_SPEED_MS * textLength);
}

HUD.prototype.getDecisionString = function(decisionObject) {
    var decisionString = '';

    // Convert the decisions object into a string
    Object.keys(decisionObject).forEach(function(decisionIndex) {
        decisionString += decisionIndex + '. ' + decisionObject[decisionIndex] + '\n';
    });

    return decisionString;
}

HUD.prototype.showDecision = function(question, decisions, answerCallback) {
    this.decisionMode = true;
    this.active = true;
    this.sayingMode = false;
    this.shouldBeClosed = false;
    this.currentDecisions = decisions;
    this.answerCallback = answerCallback;

    this.whoText.setText(question);
    this.showText(this.getDecisionString(decisions));
}

// Used when an answer was chosen
HUD.prototype.setAnswer = function(answerIndex) {
    if(this.decisionMode && this.nextable) {
        this.decisionMode = false;
        this.answerCallback(answerIndex, this.currentDecisions[answerIndex]);
        this.shouldCloseDialog = true;
        this.showNextText();
    }
}

HUD.prototype.update = function () {
    if (this.shouldBeClosed) {
        if (this.img.body.y <= this.game.height) {
            this.img.body.velocity.y += 50;
        } else if (this.active) {
            this.resetProps();
        }
        
    }
}

// Reset all of the HUD's propertes
HUD.prototype.resetProps = function() {
    this.active = false;
    this.shouldBeClosed = true;
    this.currentDecisions = [];
    this.currentlySaying = false;
    this.decisionMode = false;
    this.answerCallback = null;
    this.nextable = true;
    this.currentTextLine = 0;
    this.allText = "";
    this.shouldCloseDialog = false;
    this.whoText.setText("");
    this.theText.setText("");
}