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

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperatureNow");
  displayTemp.innerHTML = `${temp}°C`;
  let changeCity = document.querySelector("#newCity");
  changeCity.innerHTML = response.data.name;
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
