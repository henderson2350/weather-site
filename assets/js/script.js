// DOM VARIABLES
var searchInput = document.getElementById("search-bar")
var inputButton = document.getElementById("submit")
var cityName = document.getElementById("city-name")
var tempEl = document.getElementById("temp")
var humidityEl = document.getElementById("humidity")
var windEl = document.getElementById("wind")
var dateEl = document.getElementById("date")
var uvEl = document.getElementById("uv")
var storedCitiesEl = document.getElementById("stored-cities")
var dayOneEl = document.getElementById("day-one")
var dayTwoEl = document.getElementById("day-two")

// GLOBAL VARIABLES
var currentDay = moment().format("MMM Do, YYYY");
console.log(currentDay)


requestUrl = ""
requestUrlFiveDay = ""
requestUvUrl = ""

searchArray = JSON.parse(localStorage.getItem("searchArray"))

var searchHistory = [""]
if (searchHistory == [""]) {
  searchHistory = searchArray;
}

// ONCLICK FUNCTION
inputButton.onclick = function() {
    dateEl.textContent = currentDay;

    searchHistory.push(searchInput.value)
    console.log(searchHistory)

    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q="+searchInput.value+"&appid=059cad9a010bf3361f9549afe6cf401d&units=imperial"
    getApi(requestUrl);

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    showSearches()

}

// GET MAIN API FUCTION
function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        return response.json(); })

        .then(function (data) {
            console.log(data)
            var temp = data.main.temp
            tempEl.textContent = temp

            var humidity = data.main.humidity
            humidityEl.textContent = humidity

            var wind = data.wind.speed
            windEl.textContent = wind

            var str1 = data.name
            var str2 = ", "
            var str3 = data.sys.country
            var str4 = " "

            concat = str1.concat(str2, str3, str4)
            cityName.textContent = concat

            var requestUvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid=059cad9a010bf3361f9549afe6cf401d"
            getUvApi(requestUvUrl)

            var requestUrlFiveDay = "api.openweathermap.org/data/2.5/forecast/daily?q="+searchInput.value+"&cnt=5&appid=059cad9a010bf3361f9549afe6cf401d"
            getFiveDayForecast(requestUrlFiveDay)
    });
  }

// GET UV INDEX API FUNCTION
  function getUvApi(requestUvUrl) {
    fetch(requestUvUrl)
      .then(function (response) {
        return response.json(); })
            .then (function(data) {
                console.log(data)
                var uvValue = data.value
                uvEl.textContent = uvValue
            })
}

// FIVE DAY FORECAST API FUNCTION
function getFiveDayForecast(requestUrlFiveDay) {
  fetch(requestUrlFiveDay)
    .then(function (response) {
      console.log(response)
      return response.json(); 
    })
      .then (function(data) {
        console.log(data)
      })
}

// SEARCH FUNCTION
// console.log(searchArray)

function showSearches() {
  var searchArray = JSON.parse(localStorage.getItem("searchHistory"))
  storedCitiesEl.remove()
  storedCitiesEl = document.createElement("ul")
  storedCitiesEl.id = "stored-cities"
  document.querySelector("#list").append(storedCitiesEl)
  for (i = 1; i < searchArray.length; i++) {
    listItem = document.createElement("li")
    storedCitiesEl.append(listItem)
    listItem.textContent = searchArray[i]
  }
}

showSearches()

