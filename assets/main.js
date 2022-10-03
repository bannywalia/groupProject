let search;
let artistArray = [];
const searchResultsEl = document.querySelector('#search-results');
const searchFormEl = document.querySelector('#search-form');
const searchFieldEl = document.querySelector("#search-field");
const artistImgEl = document.querySelector("#artist_img");
const concertResultsEl = document.querySelector("#concert-results");


let formSubmitHandler = function (event) {
  event.preventDefault();
  console.log("testing1");
  let artist = searchFieldEl.value.trim();

  if (artist) {
    getArtistName(artist);

    searchResultsEl.textContent = '';
    searchFieldEl.value = '';
  } else {
    alert('Please enter an Artist');
  }
};

let getArtistName = function (art) {
  console.log("testing2");
  getConcert(art);
  let apiUrl = 'https://youtube-music1.p.rapidapi.com/v2/search?query=' + art;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0cc9ca8730msh65c66718893a8f3p1fbbe6jsne7b5e98ffee6',
      'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
    }
  };

  fetch(apiUrl, options)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data.result.songs)
          displayArtists(data.result.songs, art)
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to find Artist');
    });
};

let displayArtists = function (songs, searchTerm) {
  if (songs.length === 0) {
    searchResultsEl.textContent = 'No songs found.';
    return;
  }


  for (let i = 0; i < 10; i++) {
    let artistName = songs[i].name;
    const thumbnailUrl = songs[i].thumbnail;

    let artistNameEl = document.createElement('div')
    artistNameEl.classList = 'list-item flex-row justify-space-between align-center';

    const imgEl = document.createElement('img')
    imgEl.src = thumbnailUrl;
    artistNameEl.append(imgEl);

    let titleEl = document.createElement('span');
    titleEl.innerHTML = artistName;
    titleEl.classList = "artistName";


    artistNameEl.append(titleEl);

    searchResultsEl.append(artistNameEl);
  }
};

// TicketMaster API to get concerts based on search
function getConcert(keyword) {
  console.log("testing3");
  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=4&keyword=${keyword}&apikey=RF61BoAcPs2tAvFyC65f6PQ2k157lUEm`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data._embedded.events)
          displayConcerts(data._embedded.events, keyword)
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to find Artist');
    });
};

let displayConcerts = function (events, searchTerm) {
  concertResultsEl.textContent = "";
  if (events.length === 0) {
    concertResultsEl.textContent = 'No events found.';
    return;
  }

  for (let i = 0; i < events.length; i++) {
    let concertName = events[i].name;

    let concertUl = document.createElement("ul")
    concertResultsEl.appendChild(concertUl)


    let concertNameEl = document.createElement('li')
    concertNameEl.classList = 'list-item flex-row justify-space-between align-center';
    // added links to concert results
    let concertTitleEl = document.createElement('span');
    concertTitleEl.innerHTML = concertName;

    let concertLinkEl = document.createElement('a');
    concertLinkEl.innerHTML = " Find Tickets Here";
    concertLinkEl.href = events[i].url


    concertNameEl.append(concertTitleEl);

    concertUl.append(concertName);
    concertResultsEl.append(concertLinkEl);
  }
}


searchFormEl.addEventListener('submit', formSubmitHandler);

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});