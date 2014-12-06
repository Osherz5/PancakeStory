var HUD = function (game, hudImage) {
    this.TEXT_START_X = 50;
    this.TEXT_START_Y = 425;
    this.THE_TEXT_START_X = 55;
    this.THE_TEXT_START_Y = 452;

    this.game = game;
    this.group = game.add.group();
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
    this.img = game.add.image(0, 375, hudImage);
    this.group.add(this.img);
    this.group.add(this.whoText);
    this.group.add(this.theText);
};

HUD.prototype.say = function (who, saysWhat) {
    this.whoText.setText(who);
    this.theText.setText(saysWhat);
}