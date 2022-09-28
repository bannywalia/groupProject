let search;
let artistArray = [];
const searchResultsEl = document.querySelector('#search-results');
const searchFormEl = document.querySelector('#search-form');
const searchFieldEl = document.querySelector("#search-field");
const artistImgEl = document.querySelector("#artist_img");
const concertResultsEl = document.querySelector("#concert-results")
//modal// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

let formSubmitHandler = function (event) {
  event.preventDefault();
console.log("testing1");
  let artist = searchFieldEl.value.trim();

  if (artist) {
    getArtistName(artist);

    searchResultsEl.textContent = '';
    searchFieldEl.value = '';
  } else {
    //change to modal alert
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



  // need to fix after this
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
    titleEl.classList="artistName";
  

    artistNameEl.append(titleEl);

    let statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';



    if (songs[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + songs[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    //artistNameEl.append(statusEl);

    searchResultsEl.append(artistNameEl);
  }
};

// TicketMaster API to get concerts based on search
function getConcert (keyword){
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
  
  if (events.length === 0) {
    concertResultsEl.textContent = 'No events found.';
    return;
  }

  for (let i = 0; i < events.length; i++) {
    let concertName = events[i].name;

    let concertNameEl = document.createElement('div')
    concertNameEl.classList = 'list-item flex-row justify-space-between align-center';

    let concertTitleEl = document.createElement('span');
    concertTitleEl.innerHTML = concertName;

    concertNameEl.append(concertTitleEl);

    concertResultsEl.append(concertName);
  }
}
  
    

searchFormEl.addEventListener('submit', formSubmitHandler);