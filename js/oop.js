/**
 * Created by weizguy on 8/9/17.
 */
var theme = document.getElementById("theme");
var swoosh = document.getElementById("swoosh");
var boring = document.getElementById("boring");
var bart = document.getElementById("bart");
var nelson = document.getElementById("nelson");
var krusty = document.getElementById("krusty");
var bart2 = document.getElementById("bart2");
var gameScore = 0;
var need = 1000;
var level = 1;
var basicScore = 0;

var game = {
    init: function() {
        game.clickHandler();
        game.reset();
    },
    reset: function() {
        $('#gameGrid').empty();
        for (var startRow = 7; startRow > -1; startRow--) {
            for (var startColumn = 0; startColumn < 8; startColumn++) {
                var newSimpson = game.generateRandomSimpson();
                game.gameMap[startColumn][startRow] = newSimpson;
                var newDiv = $("<div>").addClass("gameSquare").attr("position", startRow +"x"+ startColumn);
                var newImg = $("<img>").attr("src", "images/" + newSimpson.name + ".png").addClass("simpsonImg");
                newDiv.append(newImg);
                $('#gameGrid').append(newDiv);
            }
        } game.startClear();
    },
    openStartScreen: function() {
        $('#startScreen').show();
        game.init();
        game.score.tempScore = 0;
        $('#scoreText').text(gameScore.toLocaleString());
        theme.play();
        theme.loop = true;

    },
    simpsonArray: ["homer", "marge", "bart", "lisa", "maggie", "grandpa", "barney", "moe", "milhouse", "santashelper", "chief", "flanders"],
    specialSimpsonArray:["donut", "duff", "itchy", "scratchy"],
    generateSimpson: function(name) {
        var generatedSimpson = new Simpson(name);
        return generatedSimpson;
    },
    generateRandomSimpson: function() {
        var randomNumber = Math.floor(Math.random() * game.simpsonArray.length);
        return game.generateSimpson(game.simpsonArray[randomNumber]);
    },
    gameMap: [[], [], [], [], [], [], [], []],

    objectsToDestroyFromGameMap: [],
    firstSimpsonSelected: null,
    secondSimpsonSelected: null,
    firstSimpsonSelectedPosition: null,
    secondSimpsonOptions: [],
    clickHandler: function() {
        $('#gameGrid').on('click', '.gameSquare', function() {
            game.simpsonSelector(this);
        })
    },
    simpsonSelector: function(simpson) {
        if (game.firstSimpsonSelected === null) {
            game.firstSimpsonSelected = $(simpson);
            game.firstSimpsonSelectedPosition = $(simpson).attr("position");
            game.firstSelection(simpson);
        } else {
            if ($(simpson).hasClass('to_be_selected')) {
                game.secondSimpsonSelected = $(simpson);
                game.secondSelection();
                return
            } else {
                $('div').removeClass('selected to_be_selected');
                game.firstSimpsonSelected = $(simpson);
                game.firstSimpsonSelectedPosition = $(simpson).attr("position");
                game.firstSelection(simpson);
            }
        }
    },
    firstSelection: function(simpson) {
        $(simpson).addClass('selected');
        var tempRow = parseInt(game.firstSimpsonSelectedPosition.substr(0,1));
        var tempColumn = parseInt(game.firstSimpsonSelectedPosition.substr(2,1));
        if (tempRow < 7) {
            $("[position=" + (tempRow + 1) + "x" + tempColumn + "]").addClass('to_be_selected');
            game.secondSimpsonOptions.push([tempRow + 1, tempColumn]);
        }
        if (tempRow > 0) {
            $("[position=" + (tempRow - 1) + "x" + tempColumn + "]").addClass('to_be_selected');
            game.secondSimpsonOptions.push([tempRow - 1, tempColumn]);
        }
        if (tempColumn < 7) {
            $("[position=" + tempRow + "x" + (tempColumn + 1) + "]").addClass('to_be_selected');
            game.secondSimpsonOptions.push([tempRow, tempColumn + 1]);
        }
        if (tempColumn > 0) {
            $("[position=" + tempRow + "x" + (tempColumn - 1) + "]").addClass('to_be_selected');
            game.secondSimpsonOptions.push([tempRow, tempColumn - 1]);
        }
    },


    secondSelection: function() {
        var firstPosition = game.firstSimpsonSelected.attr('position');
        var secondPosition = game.secondSimpsonSelected.attr('position');
        var firstRow = firstPosition.substr(0, 1);
        var firstColumn = firstPosition.substr(2, 1);
        var secondRow = secondPosition.substr(0, 1);
        var secondColumn = secondPosition.substr(2,1);
        var typeofTransition = null;
        if (firstRow === secondRow) {
            if (firstColumn > secondColumn) {
                typeofTransition = ['rightToLeft','leftToRight']
            } else {
                typeofTransition = ['leftToRight','rightToLeft']
            }
        } else {
            if (firstRow > secondRow) {
                typeofTransition = ['topToBottom', 'bottomToTop'];
            } else {
                typeofTransition = ['bottomToTop', 'topToBottom'];
            }
        }
        game.firstSimpsonSelected.find('img').css('animation','none');
        game.secondSimpsonSelected.find('img').css('animation','none');
        var tempDomHolder = ($(game.firstSimpsonSelected).find('img'));
        game.firstSimpsonSelected.empty().append(game.secondSimpsonSelected.find('img').css('animation', typeofTransition[1] + "Swap .4s linear"));
        game.secondSimpsonSelected.empty().append(tempDomHolder).css('animation', typeofTransition[0] + "Swap .4s linear");
        var tempArrayHolder = game.gameMap[firstColumn][firstRow];
        game.gameMap[firstColumn][firstRow] = game.gameMap[secondColumn][secondRow];
        game.gameMap[secondColumn][secondRow] = tempArrayHolder;
        $('div').removeClass('selected to_be_selected');
        $('#iphoneScreen').off('click');
        setTimeout(function () {
            game.firstSimpsonSelected = null;
            game.secondSimpsonSelected = null;
            game.checkForMatches();
        }, 500);
        return true;
    },
    checkForMatches: function() {
        var tempHoldImg = null;
        var tempHoldImg2 = null;
        for (var rowCounter = 7; rowCounter > 1; rowCounter--) {
            for (var columnCounter = 0; columnCounter < 8; columnCounter++) {
                var currentPositionImg = game.gameMap[columnCounter][rowCounter].name;
                if (currentPositionImg === tempHoldImg2) {
                    game.setMatchedToBeDestroyed(rowCounter, columnCounter, currentPositionImg, "horizontal");
                } else if (currentPositionImg === tempHoldImg) {
                    tempHoldImg2 = currentPositionImg;
                } else {
                    tempHoldImg = currentPositionImg;
                    tempHoldImg2 = null;
                }
                var oneBelowImg = game.gameMap[columnCounter][rowCounter - 1].name;
                if (currentPositionImg === oneBelowImg) {
                    var twoBelowImg = game.gameMap[columnCounter][rowCounter - 2].name;
                    if (oneBelowImg === twoBelowImg) {
                        game.setMatchedToBeDestroyed(rowCounter, columnCounter, currentPositionImg, "vertical");
                    }
                }
            }
            tempHoldImg=null;
            tempHoldImg2=null;
        }
        for (rowCounter = 1; rowCounter > -1; rowCounter--) {
            for (columnCounter = 0; columnCounter < 8; columnCounter++) {
                currentPositionImg = game.gameMap[columnCounter][rowCounter].name;
                if (currentPositionImg === tempHoldImg2) {
                    game.setMatchedToBeDestroyed(rowCounter, columnCounter, currentPositionImg, "horizontal");
                } else if (currentPositionImg === tempHoldImg) {
                    tempHoldImg2 = currentPositionImg;
                } else {
                    tempHoldImg = currentPositionImg;
                    tempHoldImg2 = null;
                }
            }
            tempHoldImg=null;
            tempHoldImg2=null;
        }
        if (game.objectsToDestroyFromGameMap.length === 0) {
            game.clickHandler();
            return false;
        } else {
            setTimeout(function () {
                for (var i = 0; i < game.objectsToDestroyFromGameMap.length; i++) {
                    game.gameMap[game.objectsToDestroyFromGameMap[i][0]].splice(game.objectsToDestroyFromGameMap[i][1], 1);
                }
                game.destroySimpsons();
            }, 450);
            return true;
        }
    },
    setMatchedToBeDestroyed: function(startingRow, startingColumn, matchingSimpson, direction) {
        if (direction === 'vertical') {
            if (!($("div[position=" + startingRow + "x" + startingColumn + "]").hasClass('readyToDestroy'))) {
                game.objectsToDestroyFromGameMap.push([startingColumn, startingRow]);
                game.score.tempScore += basicScore;
                $("div[position=" + startingRow + "x" + startingColumn + "]").addClass('readyToDestroy');
            } else {
                game.score.tempScoreMultiplyer += 1;
            }
            if (!($("div[position=" + (startingRow - 1) + "x" + startingColumn + "]").hasClass('readyToDestroy'))) {
                game.objectsToDestroyFromGameMap.push([startingColumn, (startingRow-1)]);
                game.score.tempScore += basicScore;
                $("div[position=" + (startingRow - 1) + "x" + startingColumn + "]").addClass('readyToDestroy');
            }
            var nextImage = matchingSimpson;
            var nextImagePosition = 2;
            while (nextImage === matchingSimpson && startingRow-nextImagePosition > -1) {
                if (!($("div[position=" + (startingRow - nextImagePosition) + "x" + startingColumn + "]").hasClass('readyToDestroy'))) {
                    $("div[position=" + (startingRow - nextImagePosition) + "x" + startingColumn + "]").addClass('readyToDestroy');
                    game.score.tempScore += basicScore;
                    game.objectsToDestroyFromGameMap.push([startingColumn, (startingRow - nextImagePosition)]);
                }
                nextImagePosition++;
                if (startingRow-nextImagePosition > -1) {
                    nextImage = game.gameMap[startingColumn][startingRow - nextImagePosition].name;
                }
            }
        } else {
            if (!($("div[position=" + startingRow + "x" + (startingColumn-2) + "]").hasClass('readyToDestroy'))) {
                $("div[position=" + startingRow + "x" + (startingColumn-2) + "]").addClass('readyToDestroy');
                game.objectsToDestroyFromGameMap.push([(startingColumn-2), (startingRow)]);
                game.score.tempScore += basicScore;
            } else {
                game.score.tempScoreMultiplyer += 1;
            }
            if (!($("div[position=" + startingRow + "x" + (startingColumn-1) + "]").hasClass('readyToDestroy'))) {
                $("div[position=" + startingRow + "x" + (startingColumn-1) + "]").addClass('readyToDestroy');
                game.objectsToDestroyFromGameMap.push([(startingColumn-1), (startingRow)]);
                game.score.tempScore += basicScore;
            }
            nextImage = matchingSimpson;
            nextImagePosition = 0;
            while (nextImage === matchingSimpson && startingColumn+nextImagePosition < 8) {
                if (!($("div[position=" + startingRow + "x" + (startingColumn+nextImagePosition) + "]").hasClass('readyToDestroy'))) {
                    $("div[position=" + startingRow + "x" + (startingColumn + nextImagePosition) + "]").addClass('readyToDestroy');
                    game.objectsToDestroyFromGameMap.push([(startingColumn + nextImagePosition), (startingRow)]);
                    game.score.tempScore += basicScore;
                }
                nextImagePosition++;
                if (startingColumn+nextImagePosition < 8) {
                    nextImage = game.gameMap[startingColumn+nextImagePosition][startingRow].name;
                }
            }
        }
        swoosh.play();
    },
    destroySimpsons: function() {
        $(".readyToDestroy").removeClass('readyToDestroy').empty();
        game.score.updateScore();
        game.objectsToDestroyFromGameMap = [];
        setTimeout(function () {
            game.collapse();
        }, 200);
    },
    collapse: function() {
        for (var column = 0; column < 8; column ++) {
            for (var row = 0; row < 8; row++) {
                if ($('[position=' + row + 'x' + column + ']').is(":empty")) {
                    var findNextImage = row;
                    while (row < 8 && $('[position=' + findNextImage + 'x' + column + ']').is(":empty")) {
                        findNextImage++
                    }
                    $('[position=' + findNextImage + 'x' + column + '] > img').remove().appendTo($('[position=' + row + 'x' + column + ']')).css("animation","dropAnimation" + (findNextImage - row) + " .5s linear");
                }
            }
        }
        setTimeout(function () {
            game.repopulate();
        }, 500);

    },
    startClear: function() {
        for (var column = 0; column < 8; column ++) {
            for (var row = 0; row < 8; row++) {
                if ($('[position=' + row + 'x' + column + ']').is(":empty")) {
                    var findNextImage = row;
                    while (row < 8 && $('[position=' + findNextImage + 'x' + column + ']').is(":empty")) {
                        findNextImage++
                    }
                    $('[position=' + findNextImage + 'x' + column + '] > img').remove().appendTo($('[position=' + row + 'x' + column + ']'));
                }
            }
        }
        setTimeout(function () {
            game.repopulate();
            game.score.clearScore();
        }, 0);

    },
    repopulate: function() {
        for (var column = 0; column < 8; column ++) {
            for (var row = game.gameMap[column].length; row < 8; row++) {
                var newSimpson = game.generateRandomSimpson();
                game.gameMap[column][row] = newSimpson;
                var newDiv = $("<div>").addClass("gameSquare").attr("position", row +"x"+ column);
                var newImg = $("<img>").attr("src", "images/" + newSimpson.name + ".png").addClass("simpsonImg").css("animation", "dropAnimationTop .5s linear");
                $("[position=" + row + "x" + column + "]").append(newImg);
            }
        }
        setTimeout(function () {
            game.checkForMatches();
        }, 500);
    },
    score: {
        tempScore: 0,
        tempScoreMultiplyer: 1,
        currentScore: 0,
        highScore: 0,

        updateScore: function() {

            $('#scoreText').text(game.score.tempScore.toLocaleString());
            if(game.score.tempScore >= need){
                level += 1;
                $('#levelText').text(level);
                scoreLevel();
                $('#needText').text(need.toLocaleString());
            }
        },
        clearScore: function() {

            level = 1;
            need = 1000;
            game.score.currentScore = 0;
            game.score.tempScore = 0;
            $('#scoreText').text(0);
            $('#levelText').text(level.toLocaleString());
            $('#needText').text(need.toLocaleString());
        }
    }
};


function toggleMusic() {
    if (theme.paused === false) {
        theme.pause();
        $('#mute').css('background-image', 'url("images/mute.png")');
    } else {
        theme.play();
        $('#mute').css('background-image', 'url("images/volume.png")');
    }
}

function Simpson(name) {
    this.name = name;
}

function scoreLevel(){
    switch(level){
        case 1:
            need = 1000;
            break;
        case 2:
            need = 2500;
            boring.play();
            break;
        case 3:
            need = 5000;
            bart.play();
            break;
        case 4:
            need = 7500;
            nelson.play();
            break;
        case 5:
            need = 10000;
            krusty.play();
            break;
        case 6:
            need = 15000;
            bart2.play();
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

$(document).ready(function () {
    $('#mute').on('click', toggleMusic);
    $('#play').on('click', function () {
        $('#startScreen').hide();
        theme.volume = .1;
        basicScore = 100;
    });
    $('#btn').on('click', function () {
        game.init();
        setTimeout(function () {
            game.repopulate();
            game.score.clearScore();
            basicScore = 100;
        }, 0);
    });
});