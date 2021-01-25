
submitCityEl = document.querySelector("#userForm");
searchedCities = document.querySelector("#previous");



// need to work on this function to retrieve last searched city from ls and populate on page on load
window.onload = function () {
  priorSearch = localStorage.getItem("city");

  fetchCity(priorSearch);
};

// runs upon initial page load to gather weather info on last searched city in ls
var fetchCity = function (cityName) {
  localStorage.setItem("city", cityName);

  var ApiKey = "178a5ae26caab391ec7b938898f1d4c8";

  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    ApiKey +
    "&units=imperial";

  //console.log(apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      //console.log(response.data);

      $("#city-name").html("<h4>" + response.city.name + "</h4>");
      $("#weather-icon").html("<img src=http://openweathermap.org/img/wn/04n.png />");
      $("#temp").text("Temp: " + response.list[0].main.temp + " °F");
      $("#humidity").text("Humidity: " + response.list[0].main.humidity + "%");
      $("#wind-speed").text("Wind Speed: " + response.list[0].wind.speed + " mph");


      var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        response.city.coord.lat +
        "&lon=" +
        response.city.coord.lat +
        "&appid=" +
        ApiKey;
      //console.log(uvIndex);

      fetch(uvIndex)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          //console.log(response.data);

          //$("#uv-index").attr("class", "");
          $("#uv-index").text("UV Index: " + response.value);
          if (response.value < 3) {
            $("#uv-index").addClass("text-white bg-success p-1")
          } else if (response.value > 3 && response.value < 6) {
            $("#uv-index").addClass("text-white bg-warning p-1");
          } else if (response.value > 6) {
            $("#uv-index").addClass("text-white bg-danger p-1")
          }
        })

      // dynamically created 5-day forecast cards
      fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          //console.log(response);
        })

      var list = response.list;
      //console.log(list);

      $("#forecastCards").html("");

      // loops through the list, grabbing every 8th item from the list
      for (var i = 7; i < list.length; i++) {
        if ((i + 1) % 8 === 0) {

          var fiveDayDate = list[i].dt_txt.split(" ")[0];

          // dynamically created forecast cards
          var forecastCard =
            `<div class="singleCard d-flex flex-column align-items-center">
                 <h4 class="cardTitle">${fiveDayDate}<h4>
                 <p>${list[i].main.temp} °F</p>
                 <img alt="weather icon" src=http://openweathermap.org/img/wn/${list[i].weather[0].icon}@2x.png />
                 <p>${list[i].main.humidity} %</p>
                 </div>` ;
          //console.log(forecastCard);

          // appends each card to the container in index.html
          $("#forecastCards").append(forecastCard);
        }
      };
    })
};


// runs when search criteria is entered and search button clicked after page initially loads
var getCurrentWeather = function (event) {
  event.preventDefault();

  var cityName = document.querySelector("#searchInput").value;
  if (cityName === "") {
    alert("Please enter a city");
    return;
  }

  fetchCity(cityName);

  // adds previously searched city to a clickable button below search box
  var pastList = $("<button>");
  pastList.addClass("savedCity");
  pastList.text(cityName).val();
  $("#previous").append(pastList);


  $(document).on("click", ".savedCity", function () {
    $("#forecastCards").empty();
    var searchAgain = $(this).text();
    fetchCity(searchAgain);
  })

  // clears search field once 'search' is clicked
  $("#searchInput").val("");

};


submitCityEl.addEventListener("submit", getCurrentWeather);

