

ScriptedEvent = function(game, name, data) {
    this.data = game.load.text(name,data);
    this.runOn = function(target) {
        // object needs to be pixelEntity
        this.target = target;
        this.commands = JSON.parse(game.cache.getText(name));
        this.commands.steps.forEach(function(command) {
            
        });
        console.log("event fired!");
    }

    this.update = function() {
        if (typeof this.target == 'undefined')
            return;
        this.target.sprite.body.velocity.x = 1;
    }

};


