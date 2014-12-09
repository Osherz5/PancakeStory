GameItem = function(name, desc, icon, onUse) {
   this.name = name;
   this.desc = desc;
   this.icon = icon;
   this.use = onUse; 
}



// Global predefined game items list
GameItems = function() {
    this.items = [
        new GameItem("Apple","It is red and juicy","apple.png",function(){
            console.log("Ate apple");}),
        
        new GameItem("Health Potion", "A bubbling mixture of herbs.","health_potion.png")
    ];
}

GameItems.prototype.getByName = function(name) {
    var res;
    this.items.forEach(function(i) {
        if (i.name == name)
            res = i;
    });

    return res;
}
