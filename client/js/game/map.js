function drawMap(game) {
    var tileDim = {w: 2, h: 2};
    var dim = {w: 20, h: 20};
    var map = TheGame.game.cache.getJSON('map');

    var colors = {
        0: 'black',
        1: 'lime',
        2: 'khaki',
        3: 'blue'
    };

    var bmdMap = this.game.add.bitmapData(dim.w * tileDim.w, dim.h * tileDim.h);
    var counter = 0;
    for (var y = 0; y < dim.h; y++) {
        for (var x = 0; x < dim.w; x++) {
            var fillStyle = colors[map[counter++][0]];
            bmdMap.rect(x * tileDim.w, y * tileDim.h, dim.w, dim.h, fillStyle);

        }
    }
    return bmdMap;
}
