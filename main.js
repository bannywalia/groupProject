let search;
let artistArray = [];
const searchContainerEl = $('#search-results-container');
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

var getArtist = function (searchTerm) {
  var apiUrl = 'https://youtube-music1.p.rapidapi.com/v2/search?query=' + searchTerm;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, searchTerm);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};