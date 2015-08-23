// Generate a random year and month string
var BASE_YEAR = 1850;
var YEAR_RANGE = 100;
var randomYear = Math.floor(Math.random() * YEAR_RANGE + BASE_YEAR);
var yearString = randomYear.toString()

var NUM_MONTHS = 12;
var randomMonth = Math.floor(Math.random() * NUM_MONTHS + 1);
if(randomMonth < 10) {
	var randomMonth = "0" + randomMonth.toString();
}

var DEFAULT_DAY = "01";
var day = DEFAULT_DAY;

var randomDate = yearString + randomMonth + day;


// Perform GET request to NYTimes API to obtain random article
var API_KEY = "e6958c82078e6aa51601f9c63d003551:4:59850174"; // API key exposed for fast deployment at hackathon
var link = "http://api.nytimes.com/svc/search/v2/articlesearch.json?end_date=" + randomDate + "&api-key=" + API_KEY;

$.get(link, function(data,status) {
	var i = 0;
	var newsSnippet = null;
	var LENGTH = 10;

	while (i < LENGTH && newsSnippet === null) {
		newsSnippet = data.response.docs[i].lead_paragraph;
		i++;
	}

	if (newsSnippet === null) {
		console.log("No Articles Found");
	}

    document.getElementById("snippetDiv").innerHTML = newsSnippet;
});


// Construct date choices for the user to pick
var NUM_CHOICES = 4;
var index = Math.floor(Math.random() * NUM_CHOICES);
var dateChoices = ["", "", "", ""];
dateChoices[index] = randomYear;

var CHOICE_OFFSET = 10;

for (var i = 0; i < index; i++) {
	dateChoices[i] = randomYear - (CHOICE_OFFSET * (index - i));
}

for (var i = index + 1; i < NUM_CHOICES; i++) {
	dateChoices[i] = randomYear + (CHOICE_OFFSET * (i - index));
}

document.getElementById("choice1").innerHTML = dateChoices[0];
document.getElementById("choice2").innerHTML = dateChoices[1];
document.getElementById("choice3").innerHTML = dateChoices[2];
document.getElementById("choice4").innerHTML = dateChoices[3];


// Button logic
if ($("#choice1").click(function() {
	evaluateClick(1);
}));

if ($("#choice2").click(function() {
	evaluateClick(2);
}));

if ($("#choice3").click(function() {
	evaluateClick(3);
}));

if ($("#choice4").click(function() {
	evaluateClick(4);
}));


/**
 * Evaluates the choice selected and determines if it is
 * a win or a lose.
 */
function evaluateClick(i) {
	if (i - 1 === index) {
		winFunction(i);
	} else {
		loseFunction(i);
	}
}


/**
 * Display a win message, disable all other buttons, and display
 * play again button.
 */
function winFunction(i) {
	document.getElementById("result").innerHTML = "CORRECT!";

	for (var i = 1; i <= NUM_CHOICES; i++) {
		if (i - 1 !== index) {
			$("#choice" + i).attr("disabled","disabled");
		}
	}
	$("#again").show();
}

/**
 * Display a lose message and disable button selected.
 */
function loseFunction(i) {
	document.getElementById("result").innerHTML = "WRONG!";
	$("#choice" + i).attr("disabled","disabled");
}


// Reload to play again.
if ($("#again").click(function() {
	location.reload();
}));
