this.createText = function(text, font, x, y, options) {
    // Définir le texte, la police et la position
    var txt = new createjs.Text();
    txt.font = font;
    txt.text = text;
    txt.x = x;
    txt.y = y;
    // Appliquer les options
    if (options) {
        if (options.color) {
            txt.color = options.color;
        }
        if (options.textAlign) {
            txt.textAlign = options.textAlign;
        }
        if (options.cursor) {
            txt.cursor = options.cursor;
        }
    }
    // Ajouter le Text au Stage et le retourner
    return txt;
}

this.createBitmap = function(src, x, y, options) {
    // Définir la source et la position du média
    var bitmap = new createjs.Bitmap(src);
    bitmap.x = x;
    bitmap.y = y;
    // Appliquer les options
    if (options) {
        // Mise à l'échelle
        if (options.scale) {
            bitmap.scaleX = options.scale[0];
            bitmap.scaleY = options.scale[1];
        }
    }
    bitmap.cursor ="pointer";
    // Ajouter le Bitmap au Stage et le retourner
    return bitmap;
}


function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

this.startTicker = function(fps,stage) {
    createjs.Ticker.setFPS(fps);
    createjs.Ticker.addEventListener("tick", function(){
        stage.update();
    });
};