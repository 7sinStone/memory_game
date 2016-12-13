// initialize the Graphics and Shape variables
var Graphics = createjs.Graphics;
var Shape = createjs.Shape;
// the main object to use to draw on canvas 
var stage;
//the array that hold the unicefs images
var unicefs;
// the array that hold the id of the images
var images_to_use;
//the success image
var success_image = createBitmap("img/27.jpg",0,0);


var time = '',intervalId ;
//ids for the sound effects
var clickID = "click";
var launchID = "launch";
var backgroundID = "background";
var validationID = "validation";
var winID = "win";

//function called everytime before starting the game
function initialize() {

    //add a white screen while preparing everything
    $("#container").append('<div id="loading"></div>');
    //hide the replay screens
    $("#replay").css("visibility","hidden");
    //initilize the stage object
    stage = new createjs.Stage("canvas");
    stage.enableMouseOver(30);

    //table used to select 8 unique images
    var images_for_validation = [];
    images_to_use = [];
    unicefs = [];

    for(var i=0;i<18;i++)
        images_for_validation.push(0);

    var validate = false;
    var number = 0;

    //select 8 uniques images randomly
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
        //double the images
        images_to_use.push(number);
        images_to_use.push(number);
        validate = false;
    }
    //suffle the images
    shuffle(images_to_use);

    while(!("#loading").length)
    {
    }
    
    //draw the images in the canvas using the stage object
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            var bitmap = createBitmap("img/unicef"+images_to_use[i*4+j]+".png",i*150,j*150);
            stage.addChild(bitmap);
        }

    }

    //draw the unicef images
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
    //remove the loading screen
    $("#loading").remove();
}


//function to increment the timer
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

//function called when we click on play button
function start_game() {

    //start the main sound
    createjs.Sound.play(backgroundID,{loop:-1});

    //remove the play button
    $("#play").css("visibility","hidden");
    //start incrementing the timer
    jQuery(function ($) {
        var display = $('#time');
        startTimer(display);
    });

    
    var number_flipped = 0, reached = false;
    var first_image = null;
    var completed = 0;
    var nbr_coup =0;
    $("#nbr_coup").text(nbr_coup);

    //foreach bitmap we associate a click function
    unicefs.forEach(function (bitmap) {

        bitmap.addEventListener("click",function () {
            //if we didn't win the game and we didn't click on the same unicef image twice
            if(!reached && ! bitmap.clicked)
            {
                //play the click sound
                createjs.Sound.play(clickID);
                //we mark the unicef image as clicked
                bitmap["clicked"] = true;
                //we increment the number of flipped images
                number_flipped++;
                //if we flipped 2 images already
                if(number_flipped == 2)
                    reached =true;
                //we call a function after play some animation
                createjs.Tween.get(bitmap).to({scaleY:0.5},300).to({alpha:0,scaleY:0},300).call(function(){
                    //if this is the first image to flip
                    if(first_image == null)
                    {
                        //we mark that image
                        first_image = bitmap;
                        bitmap.clicked = false;
                    }
                    else
                    {
                        //we increment the number of hits
                        nbr_coup++;
                        $("#nbr_coup").text(nbr_coup);

                        //if the player flip the same image
                        if(images_to_use[first_image.num] == images_to_use[bitmap.num])
                        {
                            //the flip is validated
                            first_image.visible = false;
                            bitmap.visible = false;
                            number_flipped=0;
                            reached = false;
                            first_image = null;
                            bitmap.clicked = false;
                            completed++;
                            //we play a sound for validation
                            createjs.Sound.play(validationID);
                            //if we reach 8 correct flips we stop the game
                            if(completed==8) {
                                //we show the success image
                                stage.addChild(success_image);
                                success_image.alpha =0;
                                createjs.Tween.get(success_image).wait(100).set({alpha:0}).to({alpha:1},500).call(function () {
                                    $("#replay").css("visibility","visible");
                                });
                                clearInterval(intervalId);
                                //we stop playing the main sound
                                createjs.Sound.stop();
                                //we play the win sound
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

    //initialize the sounds 
    createjs.Sound.registerSound("sounds/click.ogg", clickID);
    createjs.Sound.registerSound("sounds/launch.ogg", launchID);
    createjs.Sound.registerSound("sounds/background.ogg", backgroundID);
    createjs.Sound.registerSound("sounds/win.ogg", winID);
    createjs.Sound.registerSound("sounds/validation2.ogg", validationID);

    //for muting/unmuting the playing sound 
    var img = $('#speacker');
    img.click(function () {
        var src = img.attr("src") =="img/speacker.png" ? "img/no-speacker.png" : "img/speacker.png";
        img.attr("src",src);
        if(src == "img/no-speacker.png" )
        createjs.Sound.muted = true;
        else
            createjs.Sound.muted = false;
    });


    initialize();
    startTicker(30,stage);
    // this function is called when we click the play button
    $("#play button").click(function () {
        // we play the launch sound
        createjs.Sound.play(launchID);
        //we call the start_game
        start_game();
    });

    // this function is called when we click the replay button
    $("#replay button").click(function () {
        //we stop playing any sound
        createjs.Sound.stop();
        //we play the launch sound
        createjs.Sound.play(launchID);
        //we hide the replay button
        $("#replay").css("visibility","hidden");
        //we call the intialize funtion and the start_game function
        initialize();
        startTicker(30,stage);
        start_game();
    });
});