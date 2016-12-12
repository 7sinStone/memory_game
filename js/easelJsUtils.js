(function(){
    /** Contenu du script **/

    /**
	 * Constructeur
	 */

	 var Graphics = createjs.Graphics;
	var Shape = createjs.Shape;
	EaselJsUtils = function(stage) {
		this.stage = stage;

		this.createRoundRect = function(x, y, w, h, rgb, options) {
	// Créer la forme
	var graphic = new Graphics();
	var opacity = 1;
	var radius = 90;
	if (options) {
		if (options.opacity) {
			opacity = options.opacity;
		}
		if (options.radius) {
			radius = options.radius;
		}
	}
	graphic.beginFill(Graphics.getRGB(rgb[0], rgb[1], rgb[2], opacity));
	graphic.drawRoundRect(x,  y,  w,  h,  radius);
	// Ajouter la forme au stage
	var shape = new Shape(graphic);
	this.stage.addChild(shape);
	return shape;
}


this.createCircle = function(x, y, radius, rgb, options) {
	// Créer la forme
	var graphic = new Graphics();
	var opacity = 1;
	if (options) {
		if (options.opacity) {
			opacity = options.opacity;
		}
	}
	graphic.beginFill(Graphics.getRGB(rgb[0], rgb[1], rgb[2], opacity));
	graphic.drawCircle(x, y, radius);
	// Ajouter la forme au stage
	var shape = new Shape(graphic);
	this.stage.addChild(shape);
	return shape;
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
	// Ajouter le Bitmap au Stage et le retourner
	this.stage.addChild(bitmap);
	return bitmap;
}


this.createPig = function(x, y, options) {
	return this.createBitmap("img/cou.png", x, y, options);
};

this.createGrassBlock = function(x, y, options) {
	return this.createBitmap("img/Grass Block.png", x, y, options);
};

this.createShortTree = function(x, y, options) {
	return this.createBitmap("img/Tree Short.png", x, y, options);
};
this.createTallTree = function(x, y, options) {
	return this.createBitmap("img/Tree Tall.png", x, y, options);
};

this.createRock = function(x, y, options) {
	return this.createBitmap("img/Rock.png", x, y, options);
};
this.createCloud = function(x, y, options) {
	return this.createBitmap("img/cloud.png", x, y, options);
};


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
	this.stage.addChild(txt);
	return txt;
}

	};

	/**
	 * Classe EaselJsUtils
	 */
	EaselJsUtils.prototype = {
	}

	

	


}());