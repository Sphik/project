let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let displayDate = `${currentDay} ${currentHour}:${currentMinute}`;

  return displayDate;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", searchCity);

function getForecast(coordinates) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperatureNow");
  let changeCity = document.querySelector("#newCity");
   let descriptionItem = document.querySelector("#description");
   let windSpeed = document.querySelector("#wind");


changeCity.innerHTML = response.data.name; 
displayTemp.innerHTML = `${temp}°C`;
descriptionItem.innerHTML = response.data.weather[0].description;
windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);

  }

function searchCity(event) {
  event.preventDefault();
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function currentPosition(position) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
