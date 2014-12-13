GameItem = function(name, desc, icon, onUse, reusable) {
   this.name = name;
   this.desc = desc;
   this.icon = icon;
   this.onUse = onUse;
   this.reusable = reusable;
}

GameItem.prototype.use = function() {
    if(this.onUse)
        this.onUse();
    return !this.reusable;
}



// Global predefined game items list
GameItems = function() {
    this.items = [
        new GameItem("Apple","It is red and juicy","apple.png",function(){
            console.log("Ate apple");}),
        
        new GameItem("Health Potion", "A bubbling mixture of herbs.","health_potion.png"),

        new GameItem("Bible", "A strange cryptic book.","Bible.png",function(){
            console.log("You read the book and feel dumber.");
        },true)
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
