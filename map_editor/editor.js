(function() {
var MAP_ROWS = 20;
var MAP_COLS = 20;
var TILE_SIZE = 15;

var tiles = [];
window.tiles = tiles;

function renderMap() {
    var map = document.querySelector('.map');

    // Clear map
    map.innerHTML = '';

    // Set map dimensions
    map.style.width = TILE_SIZE * MAP_ROWS + 'px';
    map.style.height = TILE_SIZE * MAP_COLS + 'px';

    // Append tiles
    tiles.forEach(function(tile, index) {
        var div = document.createElement('div');
        // Set each div size (decrease negative margin)
        div.style.width = (TILE_SIZE - 1) + 'px';
        div.style.height = (TILE_SIZE -1) + 'px';

        // Set tile index
        div.setAttribute('data-index', index);

        // OnMouseOver and Click handlers for continous tile filling
        div.onmouseover = div.onclick = function (e) {
            // If left button is pressed
            if (1 == e.which) {
                var selectedTile = document.querySelector('.tile-selector input:checked');
                this.style.background = selectedTile.dataset.color;

                // Set selected tile value (tile type)
                tiles[this.dataset.index] = parseInt(selectedTile.value);
                e.preventDefault();
            }
        };

        map.appendChild(div);
    });
};

window.onload = function() {
    // Generate an empty map
    var numberOfTiles = (MAP_ROWS * MAP_COLS);
    for (var i = 0; i < numberOfTiles; i++) {
        tiles.push(0);
    }

    renderMap();
};

})();
