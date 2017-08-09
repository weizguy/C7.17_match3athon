/**
 * Created by Weizguy on 8/9/2017.
 */
$(document).ready(function() {
    createBoard();
    shuffleChars(chars);
})

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
    loadClickHandlers();
}
function loadClickHandlers(){
    $('.gameSquare').click(clicker);
}

function clicker() {
    var row = $(this).data('row') + 1;
    var column = $(this).data('column') + 1;

    console.log("row :" + row);
    console.log("column :" + column);

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
var chars = [
    {   name: "Homer", img: "images/homer.jpg", id: 1  },
    {   name: "Marge", img: "images/marge.png", id: 2 },
    {   name: "Bart", img: "images/bart.jpg", id: 3 },
    {   name: "Lisa", img: "images/lisa.png", id: 4 },
    {   name: "Maggie", img: "images/maggie.png", id: 5 },
    {   name: "Santas Helper", img: "images/santashelper.png", id: 6 },
    {   name: "Krusty", img: "images/krusty.jpg", id: 7 },
    {   name: "Itchy", img: "images/itchy.png", id: 8 },
    {   name: "Scratchy", img: "images/scratchy.jpg", id: 9 },
    {   name: "Chief Wiggums", img: "images/chief.jpg", id: 10 },
    {   name: "Flanders", img: "images/flanders.png", id: 11 },
    {   name: "Grandpa", img: "images/grandpa.png", id: 12 },
    {   name: "Homer", img: "images/homer.jpg", id: 13  },
    {   name: "Marge", img: "images/marge.png", id: 14 },
    {   name: "Bart", img: "images/bart.jpg", id: 15 },
    {   name: "Lisa", img: "images/lisa.png", id: 16 },
    {   name: "Maggie", img: "images/maggie.png", id: 17 },
    {   name: "Santas Helper", img: "images/santashelper.png", id: 18 },
    {   name: "Krusty", img: "images/krusty.jpg", id: 19 },
    {   name: "Itchy", img: "images/itchy.png", id: 20 },
    {   name: "Scratchy", img: "images/scratchy.jpg", id: 21 },
    {   name: "Chief Wiggums", img: "images/chief.jpg", id: 22 },
    {   name: "Flanders", img: "images/flanders.png", id: 23 },
    {   name: "Grandpa", img: "images/grandpa.png", id: 24 },
    {   name: "Homer", img: "images/homer.jpg", id: 25  },
    {   name: "Marge", img: "images/marge.png", id: 26 },
    {   name: "Bart", img: "images/bart.jpg", id: 27 },
    {   name: "Lisa", img: "images/lisa.png", id: 28 },
    {   name: "Maggie", img: "images/maggie.png", id: 29 },
    {   name: "Santas Helper", img: "images/santashelper.png", id: 30 },
    {   name: "Krusty", img: "images/krusty.jpg", id: 31 },
    {   name: "Itchy", img: "images/itchy.png", id: 32 },
    {   name: "Scratchy", img: "images/scratchy.jpg", id: 33 },
    {   name: "Chief Wiggums", img: "images/chief.jpg", id: 34 },
    {   name: "Flanders", img: "images/flanders.png", id: 35 },
    {   name: "Grandpa", img: "images/grandpa.png", id: 36 },
    {   name: "Homer", img: "images/homer.jpg", id: 37  },
    {   name: "Marge", img: "images/marge.png", id: 38 },
    {   name: "Bart", img: "images/bart.jpg", id: 39 },
    {   name: "Lisa", img: "images/lisa.png", id: 40 },
    {   name: "Maggie", img: "images/maggie.png", id: 41 },
    {   name: "Santas Helper", img: "images/santashelper.png", id: 42 },
    {   name: "Krusty", img: "images/krusty.jpg", id: 43 },
    {   name: "Itchy", img: "images/itchy.png", id: 44 },
    {   name: "Scratchy", img: "images/scratchy.jpg", id: 45 },
    {   name: "Chief Wiggums", img: "images/chief.jpg", id: 46 },
    {   name: "Flanders", img: "images/flanders.png", id: 47 },
    {   name: "Grandpa", img: "images/grandpa.png", id: 48 },
    {   name: "Homer", img: "images/homer.jpg", id: 49  },
    {   name: "Marge", img: "images/marge.png", id: 50 },
    {   name: "Bart", img: "images/bart.jpg", id: 51 },
    {   name: "Lisa", img: "images/lisa.png", id: 52 },
    {   name: "Maggie", img: "images/maggie.png", id: 53 },
    {   name: "Santas Helper", img: "images/santashelper.png", id: 54 },
    {   name: "Krusty", img: "images/krusty.jpg", id: 55 },
    {   name: "Itchy", img: "images/itchy.png", id: 56 },
    {   name: "Scratchy", img: "images/scratchy.jpg", id: 57 },
    {   name: "Chief Wiggums", img: "images/chief.jpg", id: 58 },
    {   name: "Flanders", img: "images/flanders.png", id: 59 },
    {   name: "Grandpa", img: "images/grandpa.png", id: 60 },
    {   name: "Homer", img: "images/homer.jpg", id: 61  },
    {   name: "Marge", img: "images/marge.png", id: 62 },
    {   name: "Bart", img: "images/bart.jpg", id: 63 },
    {   name: "Lisa", img: "images/lisa.png", id: 64 },
    {   name: "Maggie", img: "images/maggie.png", id: 65 },
    {   name: "Santas Helper", img: "images/santashelper.png", id: 66 },
    {   name: "Krusty", img: "images/krusty.jpg", id: 67 },
    {   name: "Itchy", img: "images/itchy.png", id: 68 },
    {   name: "Scratchy", img: "images/scratchy.jpg", id: 69 },
    {   name: "Chief Wiggums", img: "images/chief.jpg", id: 70 },
    {   name: "Flanders", img: "images/flanders.png", id: 71 },
    {   name: "Grandpa", img: "images/grandpa.png", id: 72 }
];
// ***********************************************************************************
// create the array of characters END