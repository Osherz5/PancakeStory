var HUD = function (game, hudImage) {
    this.BG_X = 0;
    this.BG_Y = 375;
    this.TITLE_START_X = 99;
    this.TITLE_START_Y = 417;
    this.CONTENT_START_X = 102;
    this.CONTENT_START_Y = 449;
    this.SAY_SPEED_MS = 50;
    this.MAX_LINES_COUNT = 5;
    this.TITLE_SIZE = '24px';
    this.CONTENT_SIZE = '20px';

    // General
    this.group = game.add.group();
    this.game = game;
    this.curentlyDisplaying = false; // Checks if we can display a new dialog
    this.shouldBeClosed = true; // Decides if we should close the HUD
    this.canBeClosedByUser = true; // Decides if the user can start closing the HUD
    this.queue = []; // Holds dialogs that are waiting for the current dialog to end

    // Currently saying
    this.sayingMode = false; // Checks if we are in saying mode
    this.sayCallback = null; // Used to tell if the user has read the dialog

    // Decisions
    this.decisionMode = false; // Checks if we are in decision mode
    this.currentDecisions = []; // Holds the current decisions object
    this.answerCallback = null; // Called when answer is given from player

    // Next screen
    this.allText = ""; // Holds of of the current dialog text (not offsets)
    this.nextable = true; // Checks if the next screen passable
    this.currentTextLine = 0; // Show text from this offset

    this.titleText = game.add.text(this.TITLE_START_X, this.TITLE_START_Y, "", {
        font: this.TITLE_SIZE + " Munro",
        fill: "#000000",
        align: "left"
    });

    this.contentText = game.add.text(this.CONTENT_START_X, this.CONTENT_START_Y, "", {
        font: this.CONTENT_SIZE + " Munro",
        fill: "#000000",
        align: "left"
    });

    this.img = game.add.sprite(this.BG_X, this.BG_Y, hudImage);

    // We want to move it when closing
    game.physics.enable(this.img, Phaser.Physics.ARCADE);

    this.group.add(this.img);
    this.group.add(this.titleText);
    this.group.add(this.contentText);
};

HUD.prototype.init = function () {
    keyboard.NEXTDIALOG.onUp.add(function nextDialog() {
        hud.showNextText();
    }, this);

    // Add option events
    keyboard.DIAGOPTION1.onUp.add(function dialogOptionOne() {
        hud.setAnswer(1);
    }, this);
    keyboard.DIAGOPTION2.onUp.add(function dialogOptionTwo() {
        hud.setAnswer(2);
    }, this);
    keyboard.DIAGOPTION3.onUp.add(function dialogOptionThree() {
        hud.setAnswer(3);
    }, this);
}

// Show a dialog in the hud
HUD.prototype.say = function (title, contentText, callback) {
    // Add to queue if we are already displaying something
    if(this.curentlyDisplaying) {
        this.queue.push({
            type: 'say',
            title: title,
            contentText: contentText,
            callback: callback
        });
        return;
    }

    // Initialize the flags
    this.curentlyDisplaying = true;
    this.canBeClosedByUser = false;
    this.shouldBeClosed = false;
    this.sayingMode = true;
    this.decisionMode = false;
    this.sayCallback = callback;

    // Reset the background position
    this.img.reset(this.BG_X, this.BG_Y);

	this.titleText.setText(title);
    this.showText(contentText);
}

// Display text in hud 
HUD.prototype.showText = function(newText) {
    // If the text has no lines at all
    // show it to the user
    if(newText.indexOf('\n') === -1) {
        this.contentText.setText(newText);
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

    // Give the user the ability to close the hud
    // if the text line count is less than the max line count
    if(textLineCount <= this.MAX_LINES_COUNT) {
        this.canBeClosedByUser = true;
    }

    this.animateTheText(currentText);
}

// If show text was too big for hud,
// this function could show the next part of it.
HUD.prototype.showNextText = function() {
    var lines = this.allText.split('\n');
    var currentText = "";

    // Check if we can apply this function right now
    if(!this.nextable) {
        return;
    }

    // We dont want user's to close the decision with "A"
    if(this.decisionMode) {
        return;
    }

    // Check if we should close the dialog
    if(this.canBeClosedByUser) {
        this.shouldBeClosed = true;
        this.canBeClosedByUser = false;
        (this.sayCallback) ? this.sayCallback() : null ;
        return;
    }

    //Split the text if it has too many lines
    if(this.currentTextLine > 0) {
        lines.splice(0, this.currentTextLine);
        if(lines.length > this.MAX_LINES_COUNT) {
            lines.splice(this.MAX_LINES_COUNT, lines.length);
            currentText = lines.join('\n');

            this.currentTextLine += this.MAX_LINES_COUNT;
        } else {
            currentText = lines.join('\n');
            this.canBeClosedByUser = true;
        }
    }

    // If we get stuck with no text to display
    // let the user the ability to close it and show "..."
    if(currentText === "") {
        this.canBeClosedByUser = true;
        currentText = "...";
    }

    this.animateTheText(currentText);
}

// Create a nice a nimation effect when saying stuff
HUD.prototype.animateTheText = function (contentText) {
    this.nextable = false;
    var textLength = contentText.length + 1;
    var charIndex = 0;

    // Repeat each new char every 80ms
    game.time.events.repeat(this.SAY_SPEED_MS, textLength, function () {
        var newText = contentText.substring(0, ++charIndex);
        this.contentText.setText(newText)
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
    // Add new decision to queue if
    // we are already displaying something
    if(this.curentlyDisplaying) {
        this.queue.push({
            type: 'decision',
            question: question,
            decisions: decisions,
            callback: answerCallback
        });
        return;
    }

    // Initialize the flags
    this.decisionMode = true;
    this.curentlyDisplaying = true;
    this.sayingMode = false;
    this.shouldBeClosed = false;
    this.currentDecisions = decisions;
    this.answerCallback = answerCallback;
    this.img.reset(this.BG_X, this.BG_Y);

    this.titleText.setText(question);
    this.showText(this.getDecisionString(decisions));
}

// Used when an answer was chosen
HUD.prototype.setAnswer = function(answerIndex) {
    // Check if the user can decide yet
    if(this.decisionMode && this.nextable) {
        this.decisionMode = false;
        this.answerCallback(answerIndex, this.currentDecisions[answerIndex]);
        this.shouldBeClosed = true;
        this.showNextText();
    }
}

HUD.prototype.update = function () {

    // Check if we need to close the HUD
    if (this.shouldBeClosed && this.curentlyDisplaying === true) {

        // Move the hud down
        this.resetText();

        // Check if we still need to move it down
        if (this.img.body.y <= this.game.height) {
            this.img.body.velocity.y += 50;

        } else if (this.curentlyDisplaying) {
            // Dispatch queue dialogs
            this.curentlyDisplaying = false;
            if(this.queue.length > 0) {

                var next = this.queue.shift();
                if(next.type === 'say') {
                    this.say(next.title, next.contentText, next.callback);
                } else {
                    this.showDecision(next.question, next.decisions, next.callback);
                }
            } else {
                // Reset all of the props if its still curently displaying
                this.resetProps();
            }
        }
    }
}

// Partial reset, only clear the texts
HUD.prototype.resetText = function() {
    this.allText = "";
    this.titleText.setText("");
    this.contentText.setText("");
    this.currentTextLine = 0;
}


// Reset all of the HUD's propertes
HUD.prototype.resetProps = function() {
    this.curentlyDisplaying = false;
    this.shouldBeClosed = true;
    this.canBeClosedByUser = false;
    this.currentDecisions = [];
    this.queue = [];
    this.sayingMode = false;
    this.decisionMode = false;
    this.answerCallback = null;
    this.sayCallback = null;
    this.nextable = false;
    this.resetText();
}