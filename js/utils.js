this.createText = function(text, font, x, y, options) {
    // define the text to draw
    var txt = new createjs.Text();
    txt.font = font;
    txt.text = text;
    //define the position of the text
    txt.x = x;
    txt.y = y;

    //define if there is any options
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

    //return the text object
    return txt;
}

//funcion to draw the images
this.createBitmap = function(src, x, y, options) {
    var bitmap = new createjs.Bitmap(src);
    bitmap.x = x;
    bitmap.y = y;
    if (options) {
        if (options.scale) {
            bitmap.scaleX = options.scale[0];
            bitmap.scaleY = options.scale[1];
        }
    }
    bitmap.cursor ="pointer";
    return bitmap;
}

//function to shuffle an array
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

//function that update the stage object
this.startTicker = function(fps,stage) {
    createjs.Ticker.setFPS(fps);
    createjs.Ticker.addEventListener("tick", function(){
        stage.update();
    });
};