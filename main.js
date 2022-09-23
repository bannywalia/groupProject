let search;
let artistArray = [];
const searchContainerEl = $('#search-results-container');
const searchResults = $('#search-results')
const artistEl = $("#artist");
var searchFormEl = $('#search-form');


var formSubmitHandler = function (event) {
  event.preventDefault();

  var artist = artistInputEl.value.trim();

  if (username) {
    getArtist(artist);

    searchContainerEl.textContent = '';
    artistInputEl.value = '';
  } else {
    alert('Please enter an Artist');
  }
};

var getArtist = function (art) {
  var apiUrl = 'https://youtube-music1.p.rapidapi.com/v2/search?query=' + searchTerm;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayartistry(data, searchTerm);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to find Artist');
    });
};

var displayArtists = function (artistry, searchTerm) {
  if (artistry.length === 0) {
    searchContainerEl.textContent = 'No Artists found.';
    return;
  }

  searchResults.textContent = searchTerm;
  
// need to fix after this
  for (var i = 0; i < artistry.length; i++) {
    var artistName = artistry[i].owner.login + '/' + artistry[i].name;

    var artistNameEl = document.createElement('div');
    artistNameEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = artistName;

    artistNameEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (artistry[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + artistry[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    artistNameEl.appendChild(statusEl);

    repoContainerEl.appendChild(artistNameEl);
  }
};

searchFormEl.addEventListener('submit', formSubmitHandler);