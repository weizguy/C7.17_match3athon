/**
 * Created by Weizguy on 8/9/2017.
 */
var img = null;
var row = 0;
var column = 0;
var score = 0;
var need = 1000;
var level = 0;
var up = null;
var up2 = null;
var down = null;
var down2 = null;
var left = null;
var left2 = null;
var right = null;
var right2 = null;
var first = null;
var second = null;
var current = null;
var pointer = null;
var alt = null;
var id = null;
var x = 0;
var y = 0;
var firstImage = null;
var secondImage = null;
var clickable = true;
var temp;
var theme = document.getElementById("theme");
var swoosh = document.getElementById("swoosh");
var boring = document.getElementById("boring");
var bart = document.getElementById("bart");
var nelson = document.getElementById("nelson");
var krusty = document.getElementById("krusty");
var bart2 = document.getElementById("bart2");

$(document).ready(function() {
    createBoard();
    shuffleChars(chars);
    loadClickHandlers();
    theme.play();
    theme.loop = true;

});


function toggleMusic() {
    if (theme.paused === false) {
        theme.pause();
        $('#mute').css('background-image', 'url("images/mute.png")');
    } else {
        theme.play();
        $('#mute').css('background-image', 'url("images/volume.png")');
    }
}

function openStartScreen() {
    $('#startScreen').show();
}

$('#btn').on('click', function(){
    shuffleChars(chars);
    resetScore();
});

function scoreLevel(){
    switch(level){
        case 1:
            need = 1000;
            break;
        case 2:
            need = 2500;
            boring.play();
            shuffleChars(chars);
            break;
        case 3:
            need = 5000;
            bart.play();
            shuffleChars(chars);
            break;
        case 4:
            need = 7500;
            nelson.play();
            shuffleChars(chars);
            break;
        case 5:
            need = 10000;
            krusty.play();
            shuffleChars(chars);
            break;
        case 6:
            need = 15000;
            bart2.play();
            shuffleChars(chars);
            break;
        case 7:
            need = 20000;
            shuffleChars(chars);
            break;
        case 8:
            need = 30000;
            shuffleChars(chars);
            break;
        case 9:
            need = 50000;
            shuffleChars(chars);
            break;
        case 10:
            need = 100000;
            shuffleChars(chars);
            break;
    }
}

function resetScore(){
    level = 1;
    need = 1000;
    score = 0;
    $('#levelText').text(level);
    $('#needText').text(need.toLocaleString());
    $('#scoreText').text(score.toLocaleString());
}

// Create Board function
var square = null;
function createBoard() {
    var $gameGrid = $('#gameGrid');
    for (var i = 0; i < 8; i++) {
        var row = $('<div>').addClass('row'+i);
        $gameGrid.append(row);
        for (var j = 0; j < 9; j++) {
            square = $('<div>').addClass('gameSquare').data('column', j).data('row', i);
            $('.row'+i).append(square);
        }
    }
   resetScore();
}

function loadClickHandlers(){
    $('#play').click(play);
    $('.gameSquare').click(clicker);
    $('#mute').on('click', toggleMusic);
}

function play() {
    $('#startScreen').hide();
    theme.volume = .1;
}


function clicker() {
    pointer = $(this);
    alt = Number(pointer.context.attributes[2].value);
    current = imgChoice[alt].name;
    console.log("Current: " + current);
    row = $(this).data('row') + 1;
    column = $(this).data('column') + 1;
    if(column > 1) {
        left = imgChoice[alt - 1].name;
        console.log("Left: " + left);
        if(column > 2) {
            left2 = imgChoice[alt - 2].name;
            console.log("Left2: ", left2);
        }
    }
    if(column < 9) {
        right = imgChoice[alt + 1].name;
        console.log("Right: " + right);
        if(column < 8) {
            right2 = imgChoice[alt + 2].name;
            console.log("Right2: ", right2);
        }
    }
    if(row > 1) {
        up = imgChoice[alt - 9].name;
        console.log("Up: " + up);
        if(row > 2) {
            up2 = imgChoice[alt - 18].name;
            console.log("Up2: ", up2);
        }
    }
    if(row < 8) {
        down = imgChoice[alt + 9].name;
        console.log("Down: " + down);
        if(row < 7) {
            down2 = imgChoice[alt + 18].name;
            console.log("Down2: ", down2);
        }
    }
img = $(this).context.style.backgroundImage;
score += 100;
$('#scoreText').text(score.toLocaleString());
if(score === need){
    level += 1;
    $('#levelText').text(level);
    scoreLevel();
    $('#needText').text(need.toLocaleString());
}
        if($(this).hasClass('clicked')){
            return;
        }
        $(this).addClass('clicked');
        if(first === null){
            x = Number($(this).context.attributes[2].value);
            first = $(this);
            firstImage = first.context.attributes[1].value;
        }else {
            y = Number($(this).context.attributes[2].value);
            second = $(this);
            secondImage = second.context.attributes[1].value;
            if((x === (y-1)) || (x === (y+1)) || (x === (y+9)) || (x === (y-9))) {
                if(((up === up2) && (up === right)) || ((right === right2) && (right = up)) || (down === down2) && (right === down) || (left === left2) && (left = up) || (left === left2) && (left === down) || (up === up2) && (up === left) || (down === down2) && (down === left) || (left === right) && (left === up) || (left === right) && (left === down) || (up === down) && (up === left) || (up === down) && (up === right) || (up === up2) && (up === down) || (down === down2) && (down === up)) {

                    swapImg(first, firstImage, second, secondImage);
                    swoosh.play();
                    nullIt();
                }
            }else {
                nullIt();
            }
        }
}

function swapImg(one, firstImg, two, secondImg){
    one.removeClass(firstImg);
    one.addClass(secondImg);
    two.removeClass(secondImg);
    two.addClass(firstImg);
    one.attr("name", secondImg);
    two.attr("name", firstImg);
    one.removeClass("clicked");
    two.removeClass("clicked");
}

function nullIt() {
    firstImage = null;
    secondImage = null;
    first = null;
    second = null;
    pointer = null;
    alt = null;
    current = null;
    id = null;
    img = null;
}


// function to assign the card faces START
// ***********************************************************************************
function shuffleChars(array) {
    imgChoice = array;
    var counter = 72, temp, index;
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    $('.gameSquare').each(function (val) {
        // $(this).css('background-image', 'url(' + imgChoice[val].img + ')');
        $(this).removeClass();
        $(this).addClass("gameSquare");
        $(this).addClass(imgChoice[val].name);
        $(this).attr('name', imgChoice[val].name);
    });
    $('.gameSquare').each(function (index) {
        $(this).attr('alt', index);
        $(this).attr('id', index);
    });
}
// ***********************************************************************************
// function to assign the characters END

// create the array of characters START
// ***********************************************************************************
var characters = [
    {   name: "Homer", img: "images/homer.jpg"  },
    {   name: "Marge", img: "images/marge.png" },
    {   name: "Bart", img: "images/bart.jpg" },
    {   name: "Lisa", img: "images/lisa.png" },
    {   name: "Maggie", img: "images/maggie.png" },
    {   name: "Grandpa", img: "images/grandpa.png" }
    // {   name: "SantasHelper", img: "images/santashelper.png" }
    // {   name: "Krusty", img: "images/krusty.jpg" },
    // {   name: "Itchy", img: "images/itchy.png" },
    // {   name: "Scratchy", img: "images/scratchy.jpg" },
    // {   name: "ChiefWiggums", img: "images/chief.jpg" },
    // {   name: "Flanders", img: "images/flanders.png" },
];
var chars = Array.apply(null, {length: 12 * characters.length}).map(function(e,i){return characters[i % characters.length]});
// ***********************************************************************************
// create the array of characters END


