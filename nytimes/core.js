var lock = "e6958c82078e6aa51601f9c63d003551:4:59850174";

//generate random time frame
var randomYear = Math.floor(Math.random() * 100 + 1850);
var yearString = randomYear.toString()
var randomMonth = Math.floor(Math.random() * 12 + 1);
if(randomMonth < 10)
	var randomMonth = "0" + randomMonth.toString();
var day = "01";
var randomDate = yearString + randomMonth + day;

//ping nytimes api for random article
var link = "http://api.nytimes.com/svc/search/v2/articlesearch.json?end_date=" + randomDate + "&api-key=" + lock;
$.get(link, function(data,status){
	var i = 0;
	var newsSnippet = null;
	while(i<10 && newsSnippet == null)
	{
		newsSnippet = (data.response.docs[i].lead_paragraph);
		i++;
	}
	if(newsSnippet == null)
	{
		console.log("No Articles Found");
	}
    document.getElementById("snippetDiv").innerHTML = newsSnippet;
  });

//construct date choices for user to pick
var index = Math.floor(Math.random()*4);
var dateChoices = ["","","",""];
dateChoices[index] = randomYear;
for(var i=0; i<index; i++)
{
	dateChoices[i] = randomYear - (10 * (index - i));
}
for(var i=index+1; i<4; i++)
{
	dateChoices[i] = randomYear + (10 * (i - index));
}

document.getElementById("choice1").innerHTML = dateChoices[0];
document.getElementById("choice2").innerHTML = dateChoices[1];
document.getElementById("choice3").innerHTML = dateChoices[2];
document.getElementById("choice4").innerHTML = dateChoices[3];

//multiple choice game
if($("#choice1").click(function(){
  evaluateClick(1);
}));

if($("#choice2").click(function(){
  evaluateClick(2);
}));

if($("#choice3").click(function(){
  evaluateClick(3);
}));

if($("#choice4").click(function(){
  evaluateClick(4);
}));


function evaluateClick(i)
{
	if(i-1 == index)
		winFunction(i);
	else
		loseFunction(i);
}

function winFunction(i)
{
	document.getElementById("result").innerHTML = "CORRECT!";
	for(var i=1; i<=4; i++)
	{
		if(i-1 != index)
			$("#choice" + i).attr("disabled","disabled");
	}
	$("#again").show();
}

function loseFunction(i)
{
	document.getElementById("result").innerHTML = "WRONG!";
	$("#choice" + i).attr("disabled","disabled");
}

$("#again").hide();

if($("#again").click(function(){
	location.reload();
}));
