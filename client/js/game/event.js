

ScriptedEvent = function(game, name, data) {
    this.data = game.load.text(name,data);

    this.runOn = function(target) {
        // object needs to be pixelEntity
        this.target = target;
        this.commands = JSON.parse(game.cache.getText(name));
        this.currentCommandIndex = 0;
        console.log("event fired!");
    }

    this.update = function() {
        if (typeof this.currentCommandIndex == 'undefined')
            return;

        command = this.commands.steps[this.currentCommandIndex];

        switch(command['action']){
            case 'move':
                dest = [command['params'][0],command['params'][1]];
                speed = command['params'][2];

                this.target.sprite.body.moveRight(speed*Math.sign(dest[0]));
                this.target.sprite.body.moveDown(speed*Math.sign(dest[1]));
                break;
        }
    }

};


