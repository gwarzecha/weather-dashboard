
submitCityEl = document.querySelector("#userForm");

var getCurrentWeather = function(event) {
  event.preventDefault()
  
  var cityName = document.querySelector("#searchInput").value;
  console.log(cityName);

  var ApiKey = "178a5ae26caab391ec7b938898f1d4c8";

  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + 
  cityName +
  "&appid=" +
  ApiKey +
  "&units=imperial";
 
  console.log(apiUrl);

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response.data);
      
      $("#city-name").html("<h4>" + response.city.name + "</h4>");
      $("#temp").text("Temp: " + response.list[0].main.temp);
      $("#humidity").text("Humidity: " + response.list[0].main.humidity);
      $("#wind-speed").text("Wind Speed: " + response.list[0].wind.speed);


      var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      response.city.coord.lat +
      "&lon=" +
      response.city.coord.lat +
      "&appid=" +
      ApiKey;
      console.log(uvIndex);

      fetch(uvIndex)
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          console.log(response.data);

          $("#uv-index").text("UV Index: " + response.value);
        })

        
      




      
    })
  
  
};

submitCityEl.addEventListener("submit", getCurrentWeather);

