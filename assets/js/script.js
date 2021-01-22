

var getCurrentWeather = function() {
  // find a way to get the city in searchInput to populate-- maybe a click event?
  var cityName = "Detroit" //document.querySelector("#searchInput").value;

  var ApiKey = "178a5ae26caab391ec7b938898f1d4c8";

  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + 
  cityName +
  "&appid=" +
  ApiKey;
 // above API is called properly when city is hardcoded 
  console.log(apiUrl);

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response.data);
      
    })
  
  
};

getCurrentWeather();