const quoteContainer = document.getElementById('quote-container');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

async function getQuote() {
  showLoadingSpinner();
  const quoteText = document.getElementById('quote');
  const author = document.getElementById('author');
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    if (data.quoteAuthor === '') {
      author.innerText = 'Unknown';
    } else {
      author.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    hideLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}

function tweetQuote() {
  const quoteText = document.getElementById('quote');
  const author = document.getElementById('author');
  const twitterUrl = `https://twitter.com/intent/tweet/?text=${quoteText.innerText} - ${author.innerText}`;

  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
