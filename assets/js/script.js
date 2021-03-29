// DOM VARIABLES
var searchInput = document.getElementById("search-bar")
var inputButton = document.getElementById("submit")
var cityName = document.getElementById("city-name")
var tempEl = document.getElementById("temp")
var humidityEl = document.getElementById("humidity")
var windEl = document.getElementById("wind")
var dateEl = document.getElementById("date")

// GLOBAL VARIABLES
// var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=059cad9a010bf3361f9549afe6cf401d&units=imperial"
var currentDay = moment().format("MMM Do, YYYY");
console.log(currentDay)


requestUrl = "" 

inputButton.onclick = function() {
    cityName.textContent = searchInput.value + " ";
    dateEl.textContent = currentDay;


    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q="+searchInput.value+"&appid=059cad9a010bf3361f9549afe6cf401d&units=imperial"
    getApi(requestUrl);

}

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        console.log(response);
        return response.json(); })

        .then(function (data) {
            // Make sure to look at the response in the console and read how 404 response is structured.
            console.log(data);
            // console.log(data.main.temp)
            var temp = data.main.temp
            tempEl.textContent = temp

            var humidity = data.main.humidity
            humidityEl.textContent = humidity

            var wind = data.wind.speed
            windEl.textContent = wind


    });
  }
  

