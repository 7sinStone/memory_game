var Graphics = createjs.Graphics;
var Shape = createjs.Shape;


var stage;
var unicefs = [];
var images_to_use = [];

var time = '',intervalId ;
var clickID = "click";
var launchID = "launch";
var backgroundID = "background";
var validationID = "validation";
var winID = "win";


function initialize() {

    $("#container").append('<div id="loading"></div>');
    $("#rejouer").css("visibility","hidden");
    stage = new createjs.Stage("canvas");
    stage.enableMouseOver(30);

    var images_for_validation = [];
    images_to_use = [];
    unicefs = [];

    for(var i=0;i<18;i++)
        images_for_validation.push(0);

    var validate = false;
    var number = 0;

    for (var i=0;i<8;i++)
    {
        while(!validate)
        {
            number = Math.floor(Math.random() * 17) + 1;
            if(images_for_validation[number]==0)
            {
                images_for_validation[number] = 1;
                validate = true;
            }
        }
        images_to_use.push(number);
        images_to_use.push(number);
        validate = false;
    }

    shuffle(images_to_use);

    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            var bitmap = createBitmap("img/unicef"+images_to_use[i*4+j]+".png",i*150,j*150);
            stage.addChild(bitmap);
        }

    }

    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            var bitmap = createBitmap("img/unicef.png",i*150,j*150);
            bitmap["num"] = i*4+j;
            unicefs.push(bitmap);
            stage.addChild(bitmap);
        }

    }
    $("#loading").remove();
}



function startTimer(display) {
    var timer = 0, minutes, seconds;

    intervalId= setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        time = minutes + ":" + seconds;
        display.text (time);
        timer++;
    }, 1000);
}

function start_game() {

    createjs.Sound.play(backgroundID,{loop:-1});

    $("#jouer").css("visibility","hidden");
    jQuery(function ($) {
        var display = $('#time');
        startTimer(display);
    });

    var success_image = createBitmap("img/27.jpg",0,0);
    var number_flipped = 0, reached = false;
    var first_image = null;
    var completed = 0;
    var nbr_coup =0;
    $("#nbr_coup").text(nbr_coup);


    unicefs.forEach(function (bitmap) {

        bitmap.addEventListener("click",function () {

            if(!reached && ! bitmap.clicked)
            {
                createjs.Sound.play(clickID);
                bitmap["clicked"] = true;
                number_flipped++;
                if(number_flipped == 2)
                    reached =true;
                createjs.Tween.get(bitmap).to({scaleY:0.5},300).to({alpha:0,scaleY:0},300).call(function(){

                    if(first_image == null)
                    {
                        first_image = bitmap;
                        bitmap.clicked = false;
                    }else
                    {
                        nbr_coup++;
                        $("#nbr_coup").text(nbr_coup);

                        if(images_to_use[first_image.num] == images_to_use[bitmap.num])
                        {
                            first_image.visible = false;
                            bitmap.visible = false;
                            number_flipped=0;
                            reached = false;
                            first_image = null;
                            bitmap.clicked = false;
                            completed++;
                            createjs.Sound.play(validationID);
                            if(completed==8) {

                                stage.addChild(success_image);
                                success_image.alpha =0;
                                createjs.Tween.get(success_image).wait(100).set({alpha:0}).to({alpha:1},500).call(function () {
                                    $("#rejouer").css("visibility","visible");
                                });
                                clearInterval(intervalId);
                                createjs.Sound.stop();
                                createjs.Sound.play(winID);

                            }
                        }
                        else
                        {
                            createjs.Tween.get(bitmap).to({alpha:1,scaleY:0.5},300)
                                .to({scaleY:1},300)
                                .call(function () {
                                    number_flipped =0;
                                    reached = false;
                                    createjs.Tween.get(first_image).to({alpha:1,scaleY:0.5},300).to({scaleY:1},300);
                                    first_image = null;
                                    bitmap.clicked = false;
                                });
                        }
                    }


                });

            }

        });
    });

}
$(document).ready(function () {

    createjs.Sound.registerSound("sounds/click.ogg", clickID);
    createjs.Sound.registerSound("sounds/launch.ogg", launchID);
    createjs.Sound.registerSound("sounds/background.ogg", backgroundID);
    createjs.Sound.registerSound("sounds/win.ogg", winID);
    createjs.Sound.registerSound("sounds/validation2.ogg", validationID);
    initialize();
    startTicker(30,stage);
    $("#jouer button").click(function () {
        createjs.Sound.stop();
        createjs.Sound.play(launchID);
        start_game();
    });

    $("#rejouer button").click(function () {
        createjs.Sound.stop();
        createjs.Sound.play(launchID);
        $("#rejouer").css("visibility","hidden");
        initialize();
        startTicker(30,stage);
        start_game();
    });
});