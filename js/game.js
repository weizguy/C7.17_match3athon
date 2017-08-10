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
var down = null;
var left = null;
var right = null;
var first = null;
var second = null;
var clickable = true;
var temp;

$(document).ready(function() {
    createBoard();
    shuffleChars(chars);
    loadClickHandlers();
});

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
            break;
        case 3:
            need = 5000;
            break;
        case 4:
            need = 7500;
            break;
        case 5:
            need = 10000;
            break;
        case 6:
            need = 15000;
            break;
        case 7:
            need = 20000;
            break;
        case 8:
            need = 30000;
            break;
        case 9:
            need = 50000;
            break;
        case 10:
            need = 100000;
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
}

function play() {
    $('#startScreen').hide();
}

// var current = null;
// var pointer = null;
// var alt = null;
// var id = null;
// function clicker() {
//     pointer = $(this);
//     alt = Number(pointer.context.attributes[1].value);
//     current = imgChoice[alt].img;
//     id = "#" + alt;
//     console.log("ID: " + id);
//     $(id).addClass("clicked");
//     console.log("Current: " + current);
//
//     row = $(this).data('row') + 1;
//     column = $(this).data('column') + 1;
//     if(column > 1) {
//         left = imgChoice[alt - 1].img;
//         console.log("Left: " + left);
//     }
//     if(column < 9) {
//         right = imgChoice[alt + 1].img;
//         console.log("Right: " + right);
//     }
//     if(row > 1) {
//         up = imgChoice[alt - 9].img;
//         console.log("Up: " + up);
//         // up = row - 1;
//     }
//     if(row < 8) {
//         down = imgChoice[alt + 9].img;
//         console.log("Down: " + down);
//         // down = row + 1;
//     }
// img = $(this).context.style.backgroundImage;
// score += 100;
// $('#scoreText').text(score.toLocaleString());
// if(score === need){
//     level += 1;
//     $('#levelText').text(level);
//     scoreLevel();
//     $('#needText').text(need.toLocaleString());
// }
// }



var x = 0;
var y = 0;
var firstImage = null;
var secondImage = null;
function clicker() {
        if($(this).hasClass('clicked')){
            return;
        }
        $(this).addClass('clicked');
        if(first === null){
            x = Number($(this).context.attributes[2].value);
            first = $(this); //$("#" + $(this).context.attributes[1].value);
            firstImage = first.context.attributes[1].value;
        }else {
            y = Number($(this).context.attributes[2].value);
            second = $(this); //$("#" + $(this).context.attributes[1].value);
            secondImage = second.context.attributes[1].value;
            if((x === (y-1)) || (x === (y+1)) || (x === (y+9)) || (x === (y-9))) {
                swapImg(first, firstImage, second, secondImage);
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
    nullIt();
}

function nullIt() {
    first.removeClass("clicked");
    second.removeClass("clicked");
    firstImage = null;
    secondImage = null;
    first = null;
    second = null;
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
    {   name: "SantasHelper", img: "images/santashelper.png" },
    {   name: "Krusty", img: "images/krusty.jpg" },
    {   name: "Itchy", img: "images/itchy.png" },
    {   name: "Scratchy", img: "images/scratchy.jpg" },
    {   name: "ChiefWiggums", img: "images/chief.jpg" },
    {   name: "Flanders", img: "images/flanders.png" },
    {   name: "Grandpa", img: "images/grandpa.png" }
];
var chars = Array.apply(null, {length: 6 * characters.length}).map(function(e,i){return characters[i % characters.length]});
// ***********************************************************************************
// create the array of characters END


