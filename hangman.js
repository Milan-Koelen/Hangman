let word = 'emancipatieleer';
let answer = word.toUpperCase();
let i = 0;
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function lettersOnly(input) {
	let regex = /[^a-z]/gi;
	input.value = input.value.replace(regex, '');
}
function startGame() {
	// Word
	let word = document.getElementById('secretWord').value;
	console.log('the secret word is:');
	console.log(word);
	// Length of word
	let long = word.length;
	console.log(i);
	window.location = 'play.html';
}
function generateButtons() {
	let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		.split('')
		.map(
			(letter) =>
				`
            <button 
                class="btn btn-lrg btn-primary m-2" 
                id='` +
				letter +
				`'
                onClick="handleGuess ('` +
				letter +
				`')"
            >
                ` +
				letter +
				`
                </button>
		`
		)
		.join('');
	document.getElementById('keyboard').innerHTML = buttonsHTML;
}
function handleGuess(chosenLetter) {
	guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;

	if (answer.indexOf(chosenLetter) >= 0) {
		document.getElementById(chosenLetter).setAttribute('disabled', true);
		guessedWord();
		checkIfGameWon();
	} else if (answer.indexOf(chosenLetter) === -1) {
		mistakes++;
		document.getElementById(chosenLetter).classList.add('wrong');
		updateMistakes();
		checkIfGameLost();
	}
}
function checkIfGameWon() {
	if (wordStatus === answer) {
		document.getElementById('keyboard').innerHTML = 'You Won!';
		console.log('winner');
	}
}
function checkIfGameLost() {
	if (mistakes === maxWrong) {
		document.getElementById('keyboard').innerHTML = 'You Lost!';
		console.log('you lost');
		document.getElementById('wordSpotlight').innerHTML = 'The answer was: <br>' + answer;
	}
}

function guessedWord() {
	wordStatus = answer.split('').map((letter) => (guessed.indexOf(letter) >= 0 ? letter : '_')).join(' ');

	document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
	document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
	document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
	mistakes = 0;
	guessed = [];
	wordStatus = null;
	document.getElementById('hangmanPic').src = './images/0.jpg';
	document.getElementById('wordSpotlight').innerHTML = wordStatus;
	generateButtons();
	updateMistakes();
}

// maxWrong = document.getElementById('maxWrong').value;
document.getElementById('maxWrong').innerHTML = maxWrong;
generateButtons();
guessedWord();
console.log('hello from js');
