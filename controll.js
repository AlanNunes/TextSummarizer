//Summarizer
var originalText;
var amountWords = 0; //The amount words of the original text.
var text;
var words = [];
var wordsRank = [];
var vWords = [];
var sentences = [];
var scores = [];
var scoreSentence = [];

function setText(txt)
{
	text = txt;
}

function setOriginalText(txt)
{
	originalText = txt;
}

function getOriginalText()
{
	return originalText;
}

function getText()
{
	return text;
}

function getSizeText()
{
	return getText().length;
}

function setWord(word){
	words.push(word);
}

function getWord(pos){
	return words[pos];
}

function setArrayWords(array)
{
	words = array;
}

function getArrayWords()
{
	return words;
}

function getAmountWords(){
	return words.length;
}

function setSentence(sentence)
{
	sentences.push(sentence);
}

function getSentence(pos)
{
	return getArraySentences()[pos];
}

function getArraySentences()
{
	return sentences;
}

function getAmountSentences()
{
	return getArraySentences().length;
}

function getScoreSentence(){
	return scoreSentence;
}

function getAmountScoreSentence()
{
	return getScoreSentence().length;
}


function sliceWords(txt)
{
	var word;
	var firstLetter = 0;
	var lastLetter;
	var foundLetter = false;
	var foundSomething = false;

	for ( var i = 0; i <= getSizeText(); i++ )
	{

		if ( (foundLetter == false) && ( txt[i] != ' ' || txt[i] != '.' || txt[i] != ',' || txt[i] != ';' || txt[i] != ':' || txt[i] != '\n' || txt[i] != null ) )
		{
			firstLetter = i;
			foundLetter = true;
		}
		else if ( (foundLetter == true) && ( txt[i] == ' ' || txt[i] == '.' || txt[i] == ',' || txt[i] == ';' || txt[i] == ':' || txt[i] == '\n' || txt[i] == null || txt[i] == '?' || txt[i] == '!' ) )
		{
			lastLetter = i;
			word = txt.substring(firstLetter, lastLetter);
			if ( word != '?' && words != '!' ){
				setWord(word.trim());
				amountWords++;
			}
			foundLetter = false;
		}		
	}
}

function getAmountWordsSentence(pos){
	var words = 0;
	var sentence = getSentence(pos);
	var foundLetter = false;
	// alert(getSentence(pos));
	for ( var i = 0; i <= sentence.length; i++ )
	{
		if ( (foundLetter == false) && ( sentence[i] != ' ' || sentence[i] != '.' || sentence[i] != ',' || sentence[i] != ';' || sentence[i] != ':' || sentence[i] != '\n' || sentence[i] != null ) )
		{
			foundLetter = true;
		}
		else if ( (foundLetter == true) && ( sentence[i] == ' ' || sentence[i] == '.' || sentence[i] == ',' || sentence[i] == ';' || sentence[i] == ':' || sentence[i] == '\n' || sentence[i] == null || sentence[i] == '?' || sentence[i] == '!' ) )
		{
			words++;
			foundLetter = false;
		}	
	}
	return words;
}

function sliceSentences(txt){
	var sentencee;
	var firstLetter = 0;
	var lastLetter;
	var foundLetter = false;

	for ( var i = 0; i <= getSizeText(); i++ )
	{

		if ( (foundLetter == false) && ( txt[i] != ' ' || txt[i] != '.' || txt[i] != ',' || txt[i] != ';' || txt[i] != ':' || txt[i] != '\n' || txt[i] != null ) )
		{
			firstLetter = i;
			foundLetter = true;
		}
		else if ( (foundLetter == true) && ( txt[i] == '.' || txt[i] == '?' || txt[i] == '!' || txt[i] == '...' ||  txt[i] == null ) )
		{
			lastLetter = i;
			sentencee = txt.substring(firstLetter, lastLetter+1); //Plus 1 to catch the dot as well.
			setSentence(sentencee);
			foundLetter = false;
		}	
	}
}

function removeBorderWords() //It's going to select the words that's in the middle of the array, the 40% percent of words. Then remove the border words, the others 60% percent.
{
	var words = getArrayWords();
	var wordsLength = getAmountWords();
	for ( var i = 0; i <= wordsLength*0.30; i++ ) //It removes the first 30% of words of the left border;
	{
		words.shift();
		setArrayWords();
	}
	for ( var i = wordsLength*0.70; i <= wordsLength; i++ ) //It removes the first 30% of words of the right border;
	{
		words.pop();
		setArrayWords(words);
	}
	//Now there's only 40% percent of words.
	//It was removed words from 1% to 30% and after 70% to 100%.
	//The words between this still in the array;
}

function rankWords(words)
{
	var aux;
	var aux2;

	for( var x = 0; x < words.length; x++ )
	{
		vWords[x] = 0;
	}

	for ( var i = 0; i < words.length; i++ )
	{
		for ( var j = 0; j < words.length; j++ )
		{
			if ( words[i] == words[j] )
			{
				vWords[i] = vWords[i] + 1;
				if ( vWords[i] > 1 ) //If the word repeat more than once, remove it.
				{
					words.splice(j, 1);
					vWords.splice(j, 1);
				}
			}
		}	
	}

	for ( var i = 0; i < words.length; i++ )
	{
		for ( var j = i; j < words.length; j++ )
		{
			if ( vWords[i] < vWords[j] )
			{
				aux = vWords[i];
				vWords[i] = vWords[j];
				vWords[j] = aux;

				aux2 = words[i];
				words[i] = words[j];
				words[j] = aux2;

			}
		}	
	}

}

/*function scoreSentences(text)
{
	for ( var i = 0; i <= getAmountSentences(); i++ )
	{
		for ( var j = 0; j <= getAmountWords(); j++ )
		{
			
		}
	}
}
*/


function createGraph(amountSentences, amountWords){
	window.table = [amountSentences];
	var str;
	var check;
	for ( var i = 0; i < amountWords; i++ )
	{
		window.table[i] = [amountSentences];
	}

	for ( var i = 0; i < amountSentences; i++ )
	{
		for ( var j = 0; j < amountWords; j++ )
		{
			str = getSentence(i);
			check = str.indexOf(getWord(j));

			if ( check >= 0 )
			{
				window.table[j][i] = vWords[j];
			}
			else
			{
				window.table[j][i] = 0;
			}
		}
	}
}

function getTable(){
	return window.table;
}

function scoreSentences(){
	scoreSentence = [getAmountSentences()];
	//[0][] -> Scores
	//[1][] -> Sentence's position
	// alert(scoreSentence.length + "teste");
	for ( var i = 0; i < (getAmountSentences())-1; i++ )
	{
		scoreSentence[i] = [getAmountSentences()];
	}
	for ( var i = 0; i < getAmountSentences(); i++ )
	{
		scoreSentence[0][i] = 0;
	}
	for ( var i = 0; i < getAmountSentences(); i++ )
	{
		for ( var j = 0; j < getAmountWords(); j++)
		{
			scoreSentence[0][i] += window.table[j][i];
			scoreSentence[1][i] = i;
			console.log(window.table[j][i]);
		}
	}
	//Order scores
	var aux;
	var aux2;
	for ( var i = 0; i < scoreSentence.length; i++ )
	{
		for ( var j = i; j < scoreSentence.length; j++ )
		{
			if ( scoreSentence[0][i] < scoreSentence[0][j] )
			{
				aux = scoreSentence[0][i];
				scoreSentence[0][i] = scoreSentence[0][j];
				scoreSentence[0][j] = aux;
				aux2 = scoreSentence[1][i];
				scoreSentence[1][i] = scoreSentence[1][j];
				scoreSentence[1][j] = aux2;
			}
		}
	}
	//Conquer the text

}

function selectSentences(percentage){
	var maxWords = amountWords-(( amountWords * percentage ) / 100);
	var amountWordsNow = 0;
	var text = "";
	var sentencesSelected = [];
	var aux;
	// alert('maxWords = ' + maxWords);

	for ( var i = 0; i < getAmountScoreSentence(); i++ )// -1 because it return 1 sentence more.
	{
			if ( (amountWordsNow + getAmountWordsSentence(scoreSentence[1][i])) <= maxWords )
			{
				amountWordsNow += getAmountWordsSentence(scoreSentence[1][i]);
				sentencesSelected.push(scoreSentence[1][i]);
			}
	}
	for ( var i = 0; i < getAmountScoreSentence(); i++ )
	{
		for ( var j = i; j < getAmountSentences(); j++ )
		{
			if ( sentencesSelected[i] > sentencesSelected[j] )
			{
				aux = sentencesSelected[i];
				sentencesSelected[i] = sentencesSelected[j];
				sentencesSelected[j] = aux;
			}
		}
	}
	for ( var i = 0; i < sentencesSelected.length; i++ )
	{
		
		text += sentences[sentencesSelected[i]];
	}

	// for ( var i = 0; i < (getAmountScoreSentence())-1; i++ )// -1 because it return 1 sentence more.
	// {
	// 	// alert("SENTENCE: " + scoreSentence[1][i] + " Words Now: "+ amountWordsNow + ", Max Words: " + maxWords);
	// 	// alert('amountWordsNow + amountWordsSentence = ' + (amountWordsNow + getAmountWordsSentence(scoreSentence[1][i])));
	// 	if ( (amountWordsNow + getAmountWordsSentence(scoreSentence[1][i])) <= maxWords )
	// 	{
	// 		text += sentences[scoreSentence[1][i]];
	// 		amountWordsNow += getAmountWordsSentence(scoreSentence[1][i]);
	// 		// alert("SENTENCE: " + scoreSentence[1][i] + " Words Now: "+ amountWordsNow + ", Max Words: " + maxWords);
	// 		// alert('amountWordsNow + amountWordsSentence = ' + (amountWordsNow + getAmountWordsSentence(scoreSentence[1][i])));
	// 	}
	// }
	return text;
}

function summarize(percentage)
{
	amountWords = 0; //The amount words of the original text.
	words = [];
	wordsRank = [];
	vWords = [];
	sentences = [];
	scores = [];
	scoreSentence = [];
	// alert('Summarize Function');

	sliceWords(getText());
	sliceSentences(getText());
	rankWords(getArrayWords());
	removeBorderWords();
	createGraph(getAmountSentences(),getAmountWords());
	scoreSentences();
	console.log(selectSentences(percentage));

	document.getElementById("summ").value = selectSentences(percentage);
	
	responsiveVoice.speak(selectSentences(percentage), "US English Female", {volume: 10});
	
	// console.log(words);
	// console.log(vWords);

	// for( var i = 0; i < getAmountWords(); i++ )
	// {
	// 	console.log("Pos: " + i + " " + getWord(i));
	// }
}