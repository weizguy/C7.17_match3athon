/**
 * Created by Weizguy on 8/9/2017.
 */
var img = null;
var row = 0;
var column = 0;
var score = 0;
var need = 1000;
var level = 0;

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

function createBoard() {
    var $gameGrid = $('#gameGrid');
    for (var i = 0; i < 8; i++) {
        var row = $('<div>').addClass('row'+i);
        $gameGrid.append(row);
        for (var j = 0; j < 9; j++) {
            var square = $('<div>').addClass('gameSquare').data('column', j).data('row', i);
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

function clicker() {
    row = $(this).data('row') + 1;
    column = $(this).data('column') + 1;
    img = $(this).context.style.backgroundImage;
    score += 100;
    $('#scoreText').text(score.toLocaleString());
    if(score === need){
        level += 1;
        $('#levelText').text(level);
        scoreLevel();
        $('#needText').text(need.toLocaleString());
    }
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
        $(this).css('background-image', 'url(' + imgChoice[val].img + ')');
    });
    $('.gameSquare').each(function (index) {
        $(this).attr('alt', index);
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
    {   name: "Santas Helper", img: "images/santashelper.png" },
    {   name: "Krusty", img: "images/krusty.jpg" },
    {   name: "Itchy", img: "images/itchy.png" },
    {   name: "Scratchy", img: "images/scratchy.jpg" },
    {   name: "Chief Wiggums", img: "images/chief.jpg" },
    {   name: "Flanders", img: "images/flanders.png" },
    {   name: "Grandpa", img: "images/grandpa.png" }
];
var chars = Array.apply(null, {length: 6 * characters.length}).map(function(e,i){return characters[i % characters.length]});
// ***********************************************************************************
// create the array of characters END


