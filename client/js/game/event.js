var ScriptedEvent = function (game, name, data) {
    this.data = game.load.text(name, data);
    this.name = name;
};

ScriptedEvent.prototype.runOn = function (target) {
    // object needs to be pixelEntity
    this.target = target;
    this.commands = JSON.parse(game.cache.getText(this.name));
    this.currentCommandIndex = 0;
    this.waitOnUserInput = false;
    this.ongoingCommand = false;
    console.log("event fired!");
};

ScriptedEvent.prototype.update = function () {
    if (typeof this.currentCommandIndex == 'undefined'
        || !this.target.sprite.body
        || this.currentCommandIndex > this.commands.steps.length
        || this.waitOnUserInput) {
        return;
    }

    var command = this.commands.steps[this.currentCommandIndex];

    switch (command.action) {
        case 'move':
            
            var dest = [command.params[0], command.params[1]];
            var speed = command.params[2];

            if (!this.ongoingCommand)
                this.target.moveTo(dest[0],dest[1]);
            
            this.ongoingCommand = true;


            if(this.target.reachedDest) {
                this.ongoingCommand = false;
                this.currentCommandIndex++;
                console.log('next command');
            }
            break;
        case 'say':
            this.waitOnUserInput = true;
            hud.say(command.params[0], command.params[1], function sayCallback() {
                this.currentCommandIndex++;
                this.waitOnUserInput = false;
            });

            break;
    }
};


