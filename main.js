let search;
let artistArray = [];
const searchContainerEl = $('#search-results-container');
const searchResults = $('#search-results');
const artistEl = $("#artist");
const searchFormEl = $('#search-form');
const searchFieldEl = $("#search-field")


let formSubmitHandler = function (event) {
  console.log("Okay")
  event.preventDefault();
  

  let artist = searchFieldEl.val().trim();

  if (artist) {
    getArtistName(artist);

    searchContainerEl.textContent = '';
    searchFieldEl.value = '';
  } else {
    alert('Please enter an Artist');
  }
};

let getArtistName = function (art) {
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
          console.log(data);
          displayArtists(data.result.songs, art);
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
    searchContainerEl.textContent = 'No songs found.';
    return;
  }

  searchResults.textContent = searchTerm;
  
// need to fix after this
  for (let i = 0; i < songs.length; i++) {
    let artistName = songs[i].name;

    let artistNameEl = $('<div>');
    artistNameEl.class('list-item flex-row justify-space-between align-center');

    let titleEl = document.createElement('span');
    titleEl.textContent = artistName;

    artistNameEl.append(titleEl);

    let statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (songs[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + songs[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    artistNameEl.append(statusEl);

    searchContainerEl.append(artistNameEl);
  }
};

searchFormEl.on('submit', formSubmitHandler);