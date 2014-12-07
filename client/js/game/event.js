
var EventManager = function() {
    this.pool = {};
}

EventManager.prototype.addEvent = function(game, name) {
    this.pool[name] = new ScriptedEvent(game, name);
}

var ScriptedEvent = function (game, name) {
    this.game = game;
    this.name = name;
    this.ongoingCommand = false;
    this.labels = {};
    this.target = null;
    this.commands = null;
    this.lastChoice = null;

};

ScriptedEvent.prototype.runOn = function (target) {
    // object needs to be pixelEntity
    this.target = target;
    this.commands = JSON.parse(this.game.cache.getText(this.name));
    this.loadLabels();
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

    if(!command.action) {
        this.nextCommand();
        return;
    }
    switch (command.action) {
        case 'move':

            var dest = [command.params[0], command.params[1]];
            var speed = command.params[2];

            this.target.moveTo(dest[0],dest[1],this.nextCommand.bind(this));
            break;
        case 'say':
            TheGame.hud.say(command.params[0], command.params[1],this.nextCommand.bind(this));

            break;
        case 'wait':
            this.game.time.events.add(parseInt(command.params[0]),this.nextCommand,this);
            break;
        case 'choice':
            TheGame.hud.showDecision(command.params[0], command.params.slice(1), this.setLastChoice.bind(this));
            break;
        case 'goto':
            this.jump(command.params[0]);
            this.nextCommand();

            break;
        case 'gotoChoice':
            this.jump(command.params[this.lastChoice-1]);
            this.nextCommand();
            this.currentCommandIndex--;
            break;

    }
};
ScriptedEvent.prototype.jump = function(to) {
    if (typeof to == "number")
        // goto index
        this.currentCommandIndex = to;
    else
        // goto label
        this.currentCommandIndex = this.labels[to];
}

ScriptedEvent.prototype.nextCommand = function() {
    this.ongoingCommand = false;
    this.currentCommandIndex++;
    console.log('next command');
};

ScriptedEvent.prototype.setLastChoice = function(id) {
    this.lastChoice = id;
    this.nextCommand();
};

ScriptedEvent.prototype.loadLabels = function() {
    var i = 0;
    labels = this.labels;
    this.commands.steps.forEach(function(command){
        if (!command.action && command.label)
            labels[command.label] = i;
        i++;
    });
}

