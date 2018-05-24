// declaring master variable with questions, choices, and answers
var master = {
    question: [{number: 0, text: "What is Tom Cruise's callsign in Top Gun?"},
        {number: 1, text: "According to Forest Gump, life is like a box of what?"},
        {number: 2, text: "Which is the Aerosmith song in the Armageddon soundtrack?"},
        {number: 3, text: "Which character is a lion in Lion King?"},
        {number: 4, text: "What is Buzz Lightyear's catchphrase in Toy Story?"},
        {number: 5, text: "Which of these movies was Tom Hanks NOT in?"},
        {number: 6, text: "What natioality is William Wallace is Braveheart?"},
        {number: 7, text: "Which was the highest grossing film in the 1990s?"},
        {number: 8, text: "Which was the highest grossing film in the 1980s?"},
        {number: 9, text: "Which of these movies did Steven Spielberg not direct?"}],
    choices: [{number: 0, text: "Iceman"},
        {number: 0, text: "Merlin"},
        {number: 0, text: "Maverick"},
        {number: 0, text: "Goose"},
        {number: 1, text: "Rocks"},
        {number: 1, text: "Chocolates"},
        {number: 1, text: "Crayons"},
        {number: 1, text: "Footballs"},
        {number: 2, text: "I Don't Want to Miss a Thing"},
        {number: 2, text: "Dream On"},
        {number: 2, text: "Walk this Way"},
        {number: 2, text: "Janie's Got a Gun"},
        {number: 3, text: "Pumbaa"},
        {number: 3, text: "Timon"},
        {number: 3, text: "Rafiki"},
        {number: 3, text: "Nala"},
        {number: 4, text: "I might be dumb, but I know what love is"},
        {number: 4, text: "To infinity and beyond!"},
        {number: 4, text: "May the force be with you"},
        {number: 4, text: "Houston, we have a problem"},
        {number: 5, text: "Forest Gump"},
        {number: 5, text: "Apollo 13"},
        {number: 5, text: "The Sixth Sense"},
        {number: 5, text: "Toy Story"},
        {number: 6, text: "Scottish"},
        {number: 6, text: "Irish"},
        {number: 6, text: "Welsh"},
        {number: 6, text: "English"},
        {number: 7, text: "Jurassic Park"},
        {number: 7, text: "Men in Black"},
        {number: 7, text: "Titanic"},
        {number: 7, text: "Star Wars: Episode 1 - The Phantom Menace"},
        {number: 8, text: "Return of the Jedi"},
        {number: 8, text: "The Empire Strikes Back"},
        {number: 8, text: "Indiana Jones and the Last Crusade"},
        {number: 8, text: "E.T. the Extra-Terrestrial"},
        {number: 9, text: "Jurassic Park"},
        {number: 9, text: "Schindler's List"},
        {number: 9, text: "Titanic"},
        {number: 9, text: "Saving Private Ryan"}],
    answer: [{number: 0, text: "Maverick"},
        {number: 1, text: "Chocolates"},
        {number: 2, text: "I Don't Want to Miss a Thing"},
        {number: 3, text: "Nala"},
        {number: 4, text: "To infinity and beyond!"},
        {number: 5, text: "The Sixth Sense"},
        {number: 6, text: "Scottish"},
        {number: 7, text: "Titanic"},
        {number: 8, text: "E.T. the Extra-Terrestrial"},
        {number: 9, text: "Titanic"}]
}
// setting image array for answers
var image = [];
for (j = 0; j < master.question.length; j++) {
    image[j] = new Image();
}
image[0].src = 'assets/images/maverick.jpg';
image[1].src = 'assets/images/forestgump.jpg';
image[2].src = 'assets/images/aerosmith.jpg';
image[3].src = 'assets/images/nala.jpg';
image[4].src = 'assets/images/buzz.jpg';
image[5].src = 'assets/images/sixthsense.png';
image[6].src = 'assets/images/braveheart.jpg';
image[7].src = 'assets/images/titanic.jpg';
image[8].src = 'assets/images/et.jpg';
image[9].src = 'assets/images/titanic.jpg';
// declaring variables
var correct = 0;
var wrong = 0;
var blank = 0;
var question;
var choices = $("#choices");
var count = 0;
var intervalId;
var maxTime = 30;
var time = 0;
var currentTime;
var picTime = 3;
// function to generate new questions and choices with a timer
function newQuestion(x) {
    $("#question").empty();
    choices.empty();
    $("#timer").text(maxTime);
    // if statement to decide if there are still questions left
    if (count < master.question.length) {
        intervalId = setInterval(tickUp,1000);
        question = master.question[x].text;
        $("#question").text(question);
        // to generate choices
        for (i = count*4; i < (count*4)+4; i++) {
            var choiceDisplay = $("<button>");
            choiceDisplay.attr("data-question", master.choices[i].number);
            choiceDisplay.attr("data-choices", master.choices[i].text);
            choiceDisplay.addClass("answer-choices list-group-item list-group-item-action card-text");
            choiceDisplay.text(master.choices[i].text);
            choices.append(choiceDisplay);
        }
    }
    // stop game
    else {
        $("#message").text("GAME OVER");
        $("#correct").text("Correct: " + correct);
        $("#wrong").text("Wrong: " + wrong);
        $("#blank").text("Unanswered: " + blank);
    }
}
// timer function for questions
function tickUp() {
    time = time + 1;
    currentTime = maxTime - time;
    $("#timer").text(currentTime);
    // if no answer
    if (currentTime === 0) {
        blank++;
        clearInterval(intervalId);
        time = 0;
        $("#correct").text("Correct: " + correct);
        $("#wrong").text("Wrong: " + wrong);
        $("#blank").text("Unanswered: " + blank);
        //count++;
        //newQuestion(count);
        displayPicture();
    }
}
// initially loading
newQuestion(count);
// function for when answer is clicked, decides if answer is right
choices.on("click",".answer-choices",function() {
    var userPick = ($(this).attr("data-choices"));
    var questionNumber = ($(this).attr("data-question"));
    var answer = master.answer[questionNumber].text;
    if (userPick === answer) {
        correct++;
        clearInterval(intervalId);
        time = 0;
        $("#correct").text("Correct: " + correct);
        $("#wrong").text("Wrong: " + wrong);
        $("#blank").text("Unanswered: " + blank);
    }
    else {
        wrong++;
        clearInterval(intervalId);
        time = 0;
        $("#correct").text("Correct: " + correct);
        $("#wrong").text("Wrong: " + wrong);
        $("#blank").text("Unanswered: " + blank);
    }
    displayPicture();
})
// function to reveal picture when answer is selected or timer runs out
function displayPicture() {
    var picture = $("<img>");
    picture.attr("src", image[count].src);
    picture.css({"height": "16rem", "width": "36rem"});
    picture.addClass("card-img-top");
    $("#picture").append(picture).addClass("card");
    var answer = $("<p>");
    answer.addClass("card-body card-text text-center");
    answer.text(master.answer[count].text);
    $("#picture").append(answer);
    intervalId = setInterval(picTimer,1000)
}
// timer for how long picture stays on the screen
function picTimer() {
    picTime = picTime - 1;
    if (picTime === 0) {
        clearInterval(intervalId);
        picTime = 5;
        count++;
        $("#answer").empty();
        $("#picture").empty().removeClass("card");
        newQuestion(count);
    }
}