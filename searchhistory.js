const searchEl = document.getElementById("search-button")
const searchArtistEl = document.getElementById("search-field")
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const clearEl = document.getElementById("clear-history");
const historyEl = document.getElementById("history");

searchEl.addEventListener("click", function () {
  console.log("testing4");
  const searchTerm = searchArtistEl.value;
  searchHistory.push(searchTerm);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
  console.log(searchHistory)
})

clearEl.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  renderSearchHistory();
})

function renderSearchHistory() {
  historyEl.innerHTML = "";
  for (let i = 0; i < searchHistory.length; i++) {
    const historyItem = document.createElement("input");
    historyItem.setAttribute("type", "text");
    historyItem.setAttribute("readonly", true);
    historyItem.setAttribute("class", "form-control d-block bg-white");
    historyItem.setAttribute("value", searchHistory[i]);
    historyItem.addEventListener("click", function () {
      getArtistName(historyItem.value);
    })
    historyEl.append(historyItem);
  }
}



