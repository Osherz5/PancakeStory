(function() {
var TILE_SIZE = 4;
var MAP_ROWS = 20;
var MAP_COLS = 20;

var tileTypes = [
    {name: 'Void',  color: 'black'}, // Tile Type #0
    {name: 'Grass', color: 'lime'},  // Tile Type #1
    {name: 'Dirt',  color: 'khaki'}, // Tile Type #2
    {name: 'Water', color: 'blue'},  // Tile Type #3
];

var regions = [
    {name: 'Israel'}, // Region #0
    {name: 'US'},     // Region #1
    {name: 'Canada'}, // Region #2
];

// Utility function to render radio buttons from an options array
function renderRadioButtons(name, container, options) {
    var container = document.querySelector(container);
    // For each option in the options array create and append
    // an input and label elements
    options.forEach(function(option, index) {
        var input = document.createElement('input');
        input.type = 'radio';
        input.name = name;
        input.id = option.name;
        input.value = index;
        container.appendChild(input);

        var label = document.createElement('label');
        label.setAttribute('for', input.id);
        label.innerText = option.name;
        label.title = input.value;
        container.appendChild(label);
    });
    // Check the first option (default behavior)
    container.childNodes[0].checked = true;
};

function renderTile(tile, index) {
    var tileType = tile[0];
    var tileRegion = tile[1];

    var map = document.querySelector('.map');

    // The div element will represent the tile
    var div = document.createElement('div');

    // Set tile size (decrease negative margin)
    div.style.width = (TILE_SIZE - 1) + 'px';
    div.style.height = (TILE_SIZE -1) + 'px';

    // Set tile color
    div.style.background = tileTypes[tileType].color;

    // Set tile index
    div.setAttribute('data-index', index);

    // Render tile region (not practical when tile size is too small)
    // div.innerText = tileRegion;

    // OnMouseOver and Click handlers for continous tile filling
    div.onmouseover = div.onclick = function (e) {
        // If left button is pressed
        if (1 == e.which) {
            var selectedTileType = document.querySelector('.tiles input:checked').value;
            var selectedTileRegion = document.querySelector('.regions input:checked').value;
            // Update tile data
            var newTile = [
                parseInt(selectedTileType), // Tile type
                parseInt(selectedTileRegion) // Tile region
            ];
            window.tiles[this.dataset.index] = newTile;

            this.style.background = tileTypes[selectedTileType].color;
            // this.innerText = selectedTileRegion;
            this.title = selectedTileRegion;

            e.preventDefault();
        }
    };

    map.appendChild(div);
};

function renderMap() {
    var map = document.querySelector('.map');

    // Clear map
    map.innerHTML = '';

    // Set map dimensions
    map.style.width = TILE_SIZE * MAP_ROWS + 'px';
    map.style.height = TILE_SIZE * MAP_COLS + 'px';

    window.tiles.forEach(renderTile);
};

function loadMapFile(onComplete) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'map.json', true);
    xhr.responseType = 'json';
    xhr.onload = onComplete.bind(null, xhr);
    xhr.send();
};

window.onload = function() {
    // Setup the editor environment
    renderRadioButtons('tiles', '.tiles', tileTypes);
    renderRadioButtons('regions', '.regions', regions);

    // Load the map file and render the tiles
    loadMapFile(function(xhr) {
        // I'm setting the tiles as a global variable for easy access from the
        // browser dev tools console
        window.tiles = xhr.response;

        // Print map information
        var mapInformation = MAP_ROWS + 'x' + MAP_COLS + 'x' + TILE_SIZE;
        mapInformation += ' (loaded ' + window.tiles.length + ' tiles from map.json)';
        document.querySelector('.map-information').innerText = mapInformation;

        renderMap();
    });
};

})();
