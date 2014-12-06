window.app.Hero = function (game, x, y) {
    window.app.Persona.call(this, game, x, y, {r: 255, g: 0, b: 0});
};

window.app.Hero.prototype = Object.create(window.app.Persona.prototype);

window.app.Hero.prototype.update = function () {
    console.log('hi');
};