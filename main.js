let search;
let artistArray = [];
const searchContainerEl = $('#search-results-container');
const artistEl = $("#artist");

const artistSearch = (searchTerm) => {
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/search.php?s="+searchTerm,
    method: "GET"
}).then(function(response){
    let searchResultEl = $('#search-results');
    mealsArray = response.meals;

    /* display meal options from user search */
    searchResultEl.empty();
    searchContainerEl.css('display', 'block');
    recipeEl.css('display', 'none');