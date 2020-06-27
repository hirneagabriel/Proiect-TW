var wordsInPage = wordCount(document.getElementsByTagName("body"))

function wordCount(words) {
	var count = 0
	for (var i = 0; i < words.length; i++) {
		count += words[i].textContent.trim().split(/\s+/).length;

	}
	return count
}

var wCount = document.createElement("P")
wCount.className='count'
wCount.innerHTML="Numar cuvinte pagina: "+ wordsInPage
document.getElementsByClassName("footer")[0].appendChild(wCount)
