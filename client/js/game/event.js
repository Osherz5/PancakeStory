var ScriptedEvent = function (game, name, data) {
    this.data = game.load.text(name, data);
    this.name = name;
    this.ongoingCommand = false;
};

ScriptedEvent.prototype.runOn = function (target) {
    // object needs to be pixelEntity
    this.target = target;
    this.commands = JSON.parse(game.cache.getText(this.name));
    this.currentCommandIndex = 0;
    this.ongoingCommand = false;
    console.log("event fired!");
};

ScriptedEvent.prototype.update = function () {
    if (typeof this.currentCommandIndex == 'undefined'
        || !this.target.sprite.body
        || this.currentCommandIndex >= this.commands.steps.length
        || this.ongoingCommand) {
        return;
    }

    var command = this.commands.steps[this.currentCommandIndex];
    
    this.ongoingCommand = true;

    switch (command.action) {
        case 'move':
            
            var dest = [command.params[0], command.params[1]];
            var speed = command.params[2];

            this.target.moveTo(dest[0],dest[1],this.nextCommand.bind(this));
            break;
        case 'say':
            this.ongoingCommand = true;
            TheGame.hud.say(command.params[0], command.params[1],this.nextCommand.bind(this));

            break;
        case 'wait':
            this.ongoingCommand = true;
            break;
    }
};

ScriptedEvent.prototype.nextCommand = function() {
    this.ongoingCommand = false;
    this.currentCommandIndex++;
    console.log('next command');
}

addEvent = function(game, events, name, path) {
    events[name] = new ScriptedEvent(game, name, path);
}
