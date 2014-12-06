

var ScriptedEvent = function(game, name, data) {
    this.data = game.load.text(name,data);
    this.name = name;
    this.isRunning = false;
};


ScriptedEvent.prototype.runOn = function(target) {
    // object needs to be pixelEntity
    this.target = target;
    this.commands = JSON.parse(game.cache.getText(this.name));
    this.currentCommandIndex = 0;
    this.isRunning = true;
    console.log("event fired!");
};

ScriptedEvent.prototype.update = function() {
    if (typeof this.currentCommandIndex === 'undefined') {
        return;
    }

    if (!this.isRunning) {
        return;
    }

    var command = this.commands.steps[this.currentCommandIndex];

    switch(command.action){
        case 'move':
            var dest = [command.params[0], command.params[1]];
            var speed = command.params[2];

            this.target.sprite.body.moveRight(speed * Math.sign(dest[0]));
            this.target.sprite.body.moveDown(speed * Math.sign(dest[1]));
            break;
    }
};