//game levels
var levels = [
    [
        ["#","#","#","#","#","#"],
        ["#",".","f","o",".","#"],
        ["#","f","o","f","@","#"],
        ["#","f","f","f","#","#"],
        ["#","#","#","#","#","#"]
    ],
    [
        ["#","#","#","#","#","#","#"],
        ["#","#","f","f","f",".","#"],
        ["#","f","o","f","o","@","#"],
        ["#","f","f","f","f",".","#"],
        ["#","#","#","#","#","#","#"]
    ],
    [
        ["#","#","#","#","#","#","#"],
        ["#","f","f","f","f",".","#"],
        ["#","@","o","o","o",".","#"],
        ["#","#","f","f","f",".","#"],
        ["#","#","#","#","#","#","#"]
    ]

]

//coordinates of goal points of all three levels
var goals = [
    [[1,1],[1,4]], //goal point first level
    [[1,5],[3,5]], //goal points second level
    [[1,5],[2,5],[3,5]] //goal points final level
]

//coordinates of the player in level 1
var xPlayer = 2;
var yPlayer = 4;

//other global variables
var stepCount = 0;
var pushCount = 0;
var timeCount = 0;
var playerOverAGoalPoint = false;
var timeClear = false;
var currentLevel = 0;


//update the screen with images based on the array
function updateScreen(theBoard){
    let myBoard =  document.getElementById("board");
    myBoard.innerHTML= "";
    for (let i = 0; i < theBoard.length; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < theBoard[i].length; j++) {
            let cell = document.createElement("td");
            if (theBoard[i][j] === "#"){
                let img = document.createElement("img");
                img.src = "images/wallBlack.png";
                cell.appendChild(img);
            }
            if (theBoard[i][j] === "f"){
                let img = document.createElement("img");
                img.src = "images/Ground_Grass.png";
                cell.appendChild(img);
            }
            if (theBoard[i][j] === "@"){
                let img = document.createElement("img");
                img.src = "images/Character4.png";
                cell.appendChild(img);
            }
            if (theBoard[i][j] === "o") {
                let img = document.createElement("img");
                img.src = "images/Crate_Yellow.png";
                cell.appendChild(img);
            }
            if (theBoard[i][j] === "."){
                let img = document.createElement("img");
                img.src = "images/EndPoint_Beige.png";
                cell.appendChild(img);
            }
            if (theBoard[i][j] === "*"){
                let img = document.createElement("img");
                img.src = "images/Character9.png";
                cell.appendChild(img);
            }
            if (theBoard[i][j] === "$"){
                let img = document.createElement("img");
                img.src = "images/EndPoint_Yellow.png";
                cell.appendChild(img);
            }
            row.appendChild(cell);
        }
        myBoard.appendChild(row);
    }
}

//start the game
function init() {
    updateScreen(levels[currentLevel])
}

//in case the user press not an arrow key
function errorHandling() {
    alert("You may press an arrow key only");
}

//count the time the player has spent
function timer() {
    timeCount ++
    if (timeCount < 60) {
        document.getElementById("time").innerText = "Time Count" + ":" + " " + timeCount + "s";
    }
    if ( timeCount >= 60 ) {
        let min = Math.floor(timeCount / 60);
        let sec = timeCount - (60*min);
        min = Number(min);
        sec = Number(sec);
        document.getElementById("time").innerText = "Time Count" + ":" + " " + min + "m" + " " + sec + "s";
    }
}
var time = setInterval(timer, 1000);

//restart the level or the whole game
function refreshLevel() {
    if (currentLevel == 0) {
        levels[0] =
            [
                ["#","#","#","#","#","#"],
                ["#",".","f","o",".","#"],
                ["#","f","o","f","@","#"],
                ["#","f","f","f","#","#"],
                ["#","#","#","#","#","#"]
            ]
        xPlayer = 2;
        yPlayer = 4;
    } else if (currentLevel == 1) {
        levels[1] =
            [
                ["#","#","#","#","#","#","#"],
                ["#","#","f","f","f",".","#"],
                ["#","f","o","f","o","@","#"],
                ["#","f","f","f","f",".","#"],
                ["#","#","#","#","#","#","#"]
            ]
        xPlayer = 2;
        yPlayer = 5;

    } else if (currentLevel == 2) {
        levels[2] =
            [
                ["#","#","#","#","#","#","#"],
                ["#","f","f","f","f",".","#"],
                ["#","@","o","o","o",".","#"],
                ["#","#","f","f","f",".","#"],
                ["#","#","#","#","#","#","#"]
            ]
        xPlayer = 2;
        yPlayer = 1;
    } else if (currentLevel == 3) {
        location.reload();
    }
    timeCount = 0;
    stepCount = 0;
    pushCount = 0;
    document.getElementById("stepCount").innerText = "Step Count:" + " " + stepCount;
    document.getElementById("pushCount").innerText = "Push Count:" + " " + pushCount;
    document.getElementById("time").innerText = "Time Count" + ":" + " " + timeCount + "s";
    document.getElementById("results").innerHTML = "<p id=\"result_message\"></p>Press the Arrow Key to Move the Player and Push the Box <p id=\"time_spent\"></p>";
    updateScreen(levels[currentLevel]);
    if (timeClear) {
        time = setInterval(timer, 1000);
        timeClear = false;
    }

}
function refreshPage () {
    location.reload();
}

// /********************************************************************************************
//  *                         Check Floor/Box/Player Positions Functions
//  ********************************************************************************************

//check if there is floor ahead
function checkFloor(x, y, theBoard){
    if(theBoard[x][y] == "f"){
        return true;
    } else {
        return false;
    }
}

//check if there is box ahead
function checkBox (x, y, theBoard) {
    if(theBoard[x][y] == "o" || theBoard[x][y] == "$"){
        return true;
    } else {
        return false;
    }
}

//check if there is a goal ahead
function checkGoalPoint(x, y, theBoard){
    if(theBoard[x][y] == "."){
        return true;
    } else {
        return false;
    }
}

//check if the player or the box is over a goal point
function overGoalPoint(arrayGoals, posI, posJ){
    for(let i = 0; i < arrayGoals.length; i++){
        if(arrayGoals[i][0]== posI && arrayGoals[i][1] == posJ) {
            return true;
        }
    }
    return false;
}

// /********************************************************************************************
//  *                              Display Results Functions
//  ********************************************************************************************

//button for clicking to initiate next level
function nextLevelButton () {
    currentLevel ++;
    timeCount = 0;
    stepCount = 0;
    pushCount = 0;
    document.getElementById("stepCount").innerText = "Step Count:" + " " + stepCount;
    document.getElementById("pushCount").innerText = "Push Count:" + " " + pushCount;
    document.getElementById("time").innerText = "Time Count" + ":" + " " + timeCount + "s";
    document.getElementById("results").innerHTML = "<p id=\"result_message\"></p>Press the Arrow Key to Move the Player and Push the Box<p id=\"time_spent\"></p>";
    time = setInterval(timer, 1000);
    timeClear = false;
    console.log ("time clear false");
    if (currentLevel == 1) {
        xPlayer = 2;
        yPlayer = 5;
        init();
    } else if (currentLevel == 2) {
        xPlayer = 2;
        yPlayer = 1;
        init();
    }
}

//display the results to the player if he wins the level
function displayResults() {

    if (currentLevel == 0 || currentLevel == 1) {
        //display the message
        document.getElementById("results").innerHTML = "<p id=\"result_message\"></p>Congrats, you've won the level :)<p id=\"time_spent\"></p>";

        //create a button for going to next level
        let button = document.createElement("button");
        button.innerHTML = "Click here for next level";
        let container = document.getElementById("results")
        container.appendChild(button);
        button.id = "resultButton";
        button.addEventListener ("click", nextLevelButton);
    } else {
        //display the message
        document.getElementById("results").innerHTML = "<p id=\"result_message\"></p>Congrats, you've finished All THREE levels!!!<p id=\"time_spent\"></p>";

        //create a button for completing the game
        let button = document.createElement("button");
        button.innerHTML = "Click here to re-play from level 1";
        let container = document.getElementById("results")
        container.appendChild(button);
        button.id = "resultButton";
        button.addEventListener ("click", refreshPage);
    }
    //display the time spent for the level
    if (timeCount < 60) {
        document.getElementById("time_spent").innerText = "You've spent" + " " + timeCount + "s" + " " + " to win this level";
    }
    if ( timeCount >= 60 ) {
        let min = Math.floor(timeCount / 60);
        let sec = timeCount - (60*min);
        min = Number(min);
        sec = Number(sec);
        document.getElementById("time_spent").innerText = "You've spent" + " " + min + "m" + " " + sec + "s" + " " + " to win this level";
    }
    clearInterval(time);
    timeClear = true;
    console.log("time clear true");
}

//detect whether boxes are on goal points
function checkResults (theBoard, arrayGoals) {
    for (let i = 0; i < arrayGoals.length; i ++ ) {
        if (theBoard[arrayGoals[i][0]][arrayGoals[i][1]] !== "$") {
            return false
        }
    }
    displayResults();
    return true;
}

// /********************************************************************************************
//  *                                Detect Key Press
//  ********************************************************************************************

document.onkeydown = function (e) {
    let keyCode = window.event ? e.keyCode : e.which;
    if (keyCode == 37 ) {
        moveLeft(levels[currentLevel]);
        document.getElementById("stepCount").innerText = "Step Count:" + " " + stepCount;
        document.getElementById("pushCount").innerText = "Push Count:" + " " + pushCount;
    } else if (keyCode == 38){
        moveUp(levels[currentLevel]);
        document.getElementById("stepCount").innerText = "Step Count:" + " " + stepCount;
        document.getElementById("pushCount").innerText = "Push Count:" + " " + pushCount;
    } else if (keyCode == 39){
        moveRight(levels[currentLevel]);
        document.getElementById("stepCount").innerText = "Step Count:" + " " + stepCount;
        document.getElementById("pushCount").innerText = "Push Count:" + " " + pushCount;
    } else if (keyCode == 40){
        moveDown(levels[currentLevel]);
        document.getElementById("stepCount").innerText = "Step Count:" + " " + stepCount;
        document.getElementById("pushCount").innerText = "Push Count:" + " " + pushCount;
    } else {
        errorHandling();
    }
}

// /********************************************************************************************
//  *                              Push boxes Functions
//  ********************************************************************************************

function pushBoxToLeft(x, y, theBoard) {

    //if there is a floor to the left of the box
    if(checkFloor(xPlayer, yPlayer - 2, theBoard)){

        //Player is over floor and box is over floor
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer, yPlayer-1)){
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer][yPlayer-1] = "@";
            playerOverAGoalPoint = false
        }
        //Player is over goal and box is over floor
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer, yPlayer-1)){
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer][yPlayer-1] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over floor and box is over goal
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer, yPlayer-1)){
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer][yPlayer-1] = "*";
            playerOverAGoalPoint = true;
        }
        //Player is over goal and box is over goal
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer, yPlayer-1)){
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer][yPlayer-1] = "*";
            playerOverAGoalPoint = true;
        }
        theBoard[xPlayer][yPlayer-2] = "o";
        yPlayer = yPlayer - 1;


        //if there is goal point to the left of the box
    } else if(checkGoalPoint(xPlayer, yPlayer - 2, theBoard)){

        //Player is over floor and box is over floor
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer, yPlayer-1)){
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer][yPlayer-1] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over goal and box is over floor
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer, yPlayer-1)){
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer][yPlayer-1] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over floor and box is over goal
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer, yPlayer-1)){
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer][yPlayer-1] = "*";
            playerOverAGoalPoint = true;
        }
        //Player is over goal and box is over goal
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer, yPlayer-1)){
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer][yPlayer-1] = "*";
            playerOverAGoalPoint = true;
        }
        theBoard[xPlayer][yPlayer-2] = "$";
        yPlayer = yPlayer - 1;

        //if there is a box to the left of the box
    } else if (checkBox(xPlayer, yPlayer-2, theBoard)){
        alert ("You cannot push two boxes at the same time");

        //if there is no floor, goal point, or box to the left of the box, then there is a wall
    } else {
        alert ("You cannot push a box to a wall");
    }
}

function pushBoxToUp(x, y, theBoard) {

    //if there is a floor to the top of the box
    if(checkFloor(xPlayer-2, yPlayer, theBoard)){

        //Player is over floor and box is over floor
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer-1, yPlayer)){
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer-1][yPlayer] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over goal and box is over floor
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer-1, yPlayer)){
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer-1][yPlayer] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over floor and box is over goal
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer-1, yPlayer)){
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer-1][yPlayer] = "*";
            playerOverAGoalPoint = true;
        }
        //Player is over goal and box is over goal
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer-1, yPlayer)){
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer-1][yPlayer] = "*";
            playerOverAGoalPoint = true;
        }
        theBoard[xPlayer-2][yPlayer] = "o";
        document.getElementById("board").rows[xPlayer-2].cells[yPlayer].innerHTML = "mg src=\"images/Crate_Yellow.png\" alt=\"box\">";
        xPlayer = xPlayer - 1;
    }

    //if there is goal point to the top of box
    else if(checkGoalPoint(xPlayer-2, yPlayer, theBoard)){

        //Player is over floor and box is over floor
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer-1, yPlayer)){
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer-1][yPlayer] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over goal and box is over floor
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer-1, yPlayer)){
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer-1][yPlayer] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over floor and box is over goal
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer-1, yPlayer)){
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer-1][yPlayer] = "*";
            playerOverAGoalPoint = true;
        }
        //Player is over goal and box is over goal
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer-1, yPlayer)){
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer-1][yPlayer] = "*";
            playerOverAGoalPoint = true;
        }
        theBoard[xPlayer-2][yPlayer] = "$";
        xPlayer = xPlayer - 1;

        //if there is box to the top of a box
    } else if (checkBox(xPlayer-2, yPlayer, theBoard)) {
        alert ("You cannot push two boxes at the same time");

        //if there is no floor, goal point, or box to the left of the box, then there is a wall
    } else {
        alert ("You cannot push a box to a wall");
    }

}

function pushBoxToRight (x, y, theBoard) {

    //if there is a floor to the right of the box
    if (checkFloor(xPlayer, yPlayer + 2, theBoard)) {

        //Player is currently over floor and box is over floor
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer, yPlayer + 1)) {
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer][yPlayer + 1] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is currently over goal and box is over floor
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer, yPlayer + 1)) {
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer][yPlayer + 1] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is currently over floor and box is over goal
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer, yPlayer + 1)) {
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer][yPlayer + 1] = "*";
            playerOverAGoalPoint = true;
        }
        //Player is currently over goal and box is over goal
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer, yPlayer + 1)) {
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer][yPlayer + 1] = "*";
            playerOverAGoalPoint = true;
        }
        theBoard[xPlayer][yPlayer + 2] = "o";
        yPlayer = yPlayer + 1;

        //if there is a goal point to the right of the box
    } else if (checkGoalPoint(xPlayer, yPlayer + 2, theBoard)) {
        //Player is over floor and box is over floor
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer, yPlayer + 1)) {
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer][yPlayer + 1] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over goal and box is over floor
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer, yPlayer + 1)) {
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer][yPlayer + 1] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over floor and box is over goal
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer, yPlayer + 1)) {
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer][yPlayer + 1] = "*";
            playerOverAGoalPoint = true;
        }
        //Player is over goal and box is over goal
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer, yPlayer + 1)) {
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer][yPlayer + 1] = "*";
            playerOverAGoalPoint = true;
        }
        theBoard[xPlayer][yPlayer + 2] = "$";
        yPlayer = yPlayer + 1;

        //if there is box to the top of a box
    } else if (checkBox(xPlayer, yPlayer+2, theBoard)) {
        alert ("You cannot push two boxes at the same time");

        //if there is no floor, goal point, or box to the left of the box, then there is a wall
    } else {
        alert ("You cannot push a box to a wall");
    }
}

function pushBoxToDown (x, y, theBoard) {

    //if there is floor below the box
    if(checkFloor(xPlayer+2, yPlayer, theBoard)) {
        //Player is over floor and box is over floor
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer+1, yPlayer)) {
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer+1][yPlayer] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over goal and box is over floor
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer+1, yPlayer)) {
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer+1][yPlayer] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is over floor and box is over goal
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer+1, yPlayer)) {
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer+1][yPlayer] = "*";
            playerOverAGoalPoint = true;
        }
        //Player is over goal and box is over goal
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer+1, yPlayer)) {
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer+1][yPlayer] = "*";
            playerOverAGoalPoint = true;
        }
        theBoard[xPlayer+2][yPlayer] = "o";
        xPlayer = xPlayer + 1;

        //if there is a goal point below the box
    } else if(checkGoalPoint(xPlayer+2, yPlayer, theBoard)){
        //Player is currently over floor and box is over floor
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer+1, yPlayer)) {
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer+1][yPlayer] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is currently over goal and box is over floor
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && !overGoalPoint(goals[currentLevel], xPlayer+1, yPlayer)) {
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer+1][yPlayer] = "@";
            playerOverAGoalPoint = false;
        }
        //Player is currently over floor and box is over goal
        if (!overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer+1, yPlayer)) {
            theBoard[xPlayer][yPlayer] = "f";
            theBoard[xPlayer+1][yPlayer] = "*";
            playerOverAGoalPoint = true;
        }
        //Player is currently over goal and box is over goal
        if (overGoalPoint(goals[currentLevel], xPlayer, yPlayer) && overGoalPoint(goals[currentLevel], xPlayer+1, yPlayer)) {
            theBoard[xPlayer][yPlayer] = ".";
            theBoard[xPlayer+1][yPlayer] = "*";
            playerOverAGoalPoint = true;
        }
        theBoard[xPlayer+2][yPlayer] = "$";
        xPlayer = xPlayer + 1;

        //if there is box below the box
    } else if(checkBox(xPlayer+2, yPlayer, theBoard)){
        alert ("You cannot push two boxes at the same time");

        //if there is no floor, goal point, or box to the left of the box, then there is a wall
    } else {
        alert ("You cannot push a box to a wall");
    }
}

// ********************************************************************************************
//  *                              Move Player functions
//  *******************************************************************************************

function moveLeft(theBoard) {

    //if there is a floor to the left
    if(checkFloor(xPlayer, yPlayer - 1, theBoard)){
        if(playerOverAGoalPoint){
            theBoard[xPlayer][yPlayer] = ".";
        } else {
            theBoard[xPlayer][yPlayer] = "f";
        }
        yPlayer = yPlayer - 1;
        theBoard[xPlayer][yPlayer] = "@" ;
        playerOverAGoalPoint = false;
        stepCount ++;
    }

    //if there is a goal point to the left
    else if(checkGoalPoint(xPlayer, yPlayer - 1, theBoard)){
        if(playerOverAGoalPoint){
            theBoard[xPlayer][yPlayer] = ".";
        } else {
            theBoard[xPlayer][yPlayer] = "f";
        }
        yPlayer = yPlayer - 1;
        theBoard[xPlayer][yPlayer] = "*" ;
        playerOverAGoalPoint = true;
        stepCount ++

        //if there is a box to the left
    } else if(checkBox(xPlayer, yPlayer - 1, theBoard)){
        pushBoxToLeft(xPlayer, yPlayer, theBoard);
        pushCount ++;

        //if there is no floor, goal point, or box to the left, then there is a wall
    } else {
        alert ("You cannot move to a wall");
    }
    updateScreen(theBoard);
    checkResults(levels[currentLevel], goals[currentLevel]);
}

function moveUp(theBoard){
    //if there is a floor to the top
    if(checkFloor(xPlayer-1, yPlayer, theBoard)){
        if(playerOverAGoalPoint){
            theBoard[xPlayer][yPlayer] = ".";
        } else {
            theBoard[xPlayer][yPlayer] = "f";
        }
        xPlayer = xPlayer - 1;
        theBoard[xPlayer][yPlayer] = "@" ;
        playerOverAGoalPoint = false;
        stepCount ++;

        //if there is a goal point to the top
    } else if(checkGoalPoint(xPlayer-1 , yPlayer, theBoard)){
        if(playerOverAGoalPoint){
            theBoard[xPlayer][yPlayer] = ".";
        } else {
            theBoard[xPlayer][yPlayer] = "f";
        }
        xPlayer = xPlayer - 1;
        theBoard[xPlayer][yPlayer] = "*" ;
        playerOverAGoalPoint = true;
        stepCount ++;

        //if there is a box to the top
    } else if(checkBox(xPlayer-1, yPlayer, theBoard)){
        pushBoxToUp(xPlayer, yPlayer, theBoard);
        pushCount ++;

        //if there is no floor, goal point, or box to the left, then there is a wall
    } else {
        alert ("You cannot move to a wall");
    }
    updateScreen(theBoard);
    checkResults(levels[currentLevel], goals[currentLevel]);
}

function moveRight(theBoard) {

    //if there is a floor to the right
    if (checkFloor(xPlayer, yPlayer + 1, theBoard)) {
        if (playerOverAGoalPoint) {
            theBoard[xPlayer][yPlayer] = ".";
        } else {
            theBoard[xPlayer][yPlayer] = "f";
        }
        yPlayer = yPlayer + 1;
        theBoard[xPlayer][yPlayer] = "@";
        playerOverAGoalPoint = false;
        stepCount ++;

        //if there is a goal point to the right
    } else if (checkGoalPoint(xPlayer, yPlayer + 1, theBoard)) {
        if (playerOverAGoalPoint) {
            theBoard[xPlayer][yPlayer] = ".";
        } else {
            theBoard[xPlayer][yPlayer] = "f";
        }
        yPlayer = yPlayer + 1;
        theBoard[xPlayer][yPlayer] = "*";
        playerOverAGoalPoint = true;
        stepCount ++;

        //if there is a box to the right
    } else if (checkBox(xPlayer, yPlayer + 1, theBoard)) {
        pushBoxToRight(xPlayer, yPlayer, theBoard);
        pushCount ++;

        //if there is no floor, goal point, or box to the left, then there is a wall
    } else {
        alert ("You cannot move to a wall");
    }
    updateScreen(theBoard);
    checkResults(levels[currentLevel], goals[currentLevel]);
}

function moveDown(theBoard) {

    //if there is floor to the bottom
    if(checkFloor(xPlayer+1, yPlayer, theBoard)) {
        if(playerOverAGoalPoint) {
            theBoard[xPlayer][yPlayer] = "."
        } else {
            theBoard[xPlayer][yPlayer] = "f";
        }
        xPlayer = xPlayer + 1;
        theBoard[xPlayer][yPlayer] = "@";
        playerOverAGoalPoint = false;
        stepCount ++;

        //if there is goal point to the bottom
    } else if (checkGoalPoint(xPlayer+1, yPlayer, theBoard)) {
        if(playerOverAGoalPoint) {
            theBoard[xPlayer][yPlayer] = "."
        } else {
            theBoard[xPlayer][yPlayer] = "f";
        }
        xPlayer = xPlayer + 1;
        theBoard [xPlayer][yPlayer] = "*";
        playerOverAGoalPoint = true;
        stepCount ++;

        //if there is box to the bottom
    } else if(checkBox(xPlayer+1, yPlayer, theBoard)) {
        pushBoxToDown(xPlayer, yPlayer, theBoard);
        pushCount ++;

        //if there is no floor, goal point, or box to the left, then there is a wall
    } else {
        alert ("You cannot move to a wall");
    }
    updateScreen(theBoard);
    checkResults(levels[currentLevel], goals[currentLevel]);
}

//start the game
init();

