// Variables - Getting the text to udpate
var questionLabel = document.getElementById('questionLabel');
var questionText = document.getElementById('questionText');
var optionA = document.getElementById('optionA');
var optionB = document.getElementById('optionB');
var optionC = document.getElementById('optionC');
var optionD = document.getElementById('optionD');
var questionImage = document.getElementById('questionImage');

// Game objects
var scoreLabel = document.querySelector('.scoreLabel');

// Game variables
var score = 0;
var selectedPoints = 0;

// Show questions
function showQuestion(e){

    if (e > 0 && e < 10) { // 1 - 9
        // Populate question data
        getQuestionData(e);
        // Open modal
        $('#questionModal').modal();
        disableButton(event.target);
    } else {
        alert("Did not work");
    }
}

// Generate question data
function getQuestionData(e) {
    let q = questions["question" + e];
	// Update question
    questionLabel.innerHTML = q.questionLabel;
	questionText.innerHTML = q.questionText;
	questionImage.src = q.questionImage;
	// Update answers
	optionA.innerHTML = q.optionA.responseText;
	optionB.innerHTML = q.optionB.responseText;
	optionC.innerHTML = q.optionC.responseText;
	optionD.innerHTML = q.optionD.responseText;
	// Update correct
	updateCurrentCorrect(q.optionA.correctResponse, q.optionB.correctResponse, q.optionC.correctResponse, q.optionD.correctResponse);
	// Update current selected points
	selectedPoints = event.target.innerHTML;
}

// Add correct label for question
function updateCurrentCorrect(a, b, c, d) {
    let s = 'correct';
	if (a === true) {
		optionA.classList.add(s);
	} else if(b === true){
		optionB.classList.add(s);
	} else if(c === true){
		optionC.classList.add(s);
	} else if(d === true){
		optionD.classList.add(s);
	}
}

// Disable the button after selected
function disableButton(e){
	e.style.cursor = 'auto';
	e.classList.remove('gamePiece');
	e.classList.add('gamePieceAnswered');
	e.onclick = '';
}

// Check question answer
function submitQuestion(){
	if (event.target.classList.contains('correct')) {
		alert('This is correct');
		updateScore(parseInt(selectedPoints));
		$('#questionModal').modal('hide');

	} else{
		alert('This is not correct');
		$('#questionModal').modal('hide');
	}
}

// Update score
function updateScore(e){
	score = score + e;
	scoreLabel.innerHTML = "SCORE: " + score;
}

// Remove all correct labels
$("#questionModal").on("hidden.bs.modal", function () {
    let s = 'correct';
    optionA.classList.remove(s);
    optionB.classList.remove(s);
    optionC.classList.remove(s);
    optionD.classList.remove(s);
});

// Show leaderboard
function showLeaderBoard(){
	$('#leaderBoard').modal('show');
}