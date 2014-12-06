

ScriptedEvent = function(game, name, data) {
    this.data = game.load.text(name,data);

    this.runOn = function(target) {
        // object needs to be pixelEntity
        this.target = target;
        this.commands = JSON.parse(game.cache.getText(name));
        this.currentCommandIndex = 0;
        this.waitOnUserInput = false;
        console.log("event fired!");
    }

    this.update = function() {
        if (typeof this.currentCommandIndex == 'undefined' || this.currentCommandIndex > this.commands.steps.length || this.waitOnUserInput)
            return;

        command = this.commands.steps[this.currentCommandIndex];

        switch(command['action']){
            case 'move':
                
                dest = [command['params'][0],command['params'][1]];
                speed = command['params'][2];


                // moves target towards destination

                this.target.sprite.body.moveRight(speed*Math.sign(dest[0]-this.target.sprite.x));
                this.target.sprite.body.moveDown(speed*Math.sign(dest[1]-this.target.sprite.y));

                // check if command ended

                if (Math.round(this.target.sprite.x) == Math.round(dest[0]) && Math.round(this.target.sprite.y) == Math.round(dest[1])) {
                    console.log("ended command");
                    this.target.sprite.body.setZeroVelocity();
                    this.currentCommandIndex++;
                }
                break;
            case 'say':
                this.waitOnUserInput = true;
                hud.say(command['params'][0], command['params'][1], function() {
                    this.currentCommandIndex++;
                    this.waitOnUserInput = false;
                });

                break;
        }
    }

};


