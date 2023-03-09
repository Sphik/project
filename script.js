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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function showTemperature(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperatureNow");
  let changeCity = document.querySelector("#newCity");
   let descriptionItem = document.querySelector("#description");
   let windSpeed = document.querySelector("#wind");
    let iconItem = document.querySelector("#icon");


changeCity.innerHTML = response.data.name; 
displayTemp.innerHTML = `${temp}°C`;
descriptionItem.innerHTML = response.data.weather[0].description;
windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
iconItem.innerHTML = `<img src='https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png'>`;
 }


function search(city) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function submit(event){
event.preventDefault();
 let city = document.querySelector("#city-input").value;
 search(city);
}

let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", submit);


search("Denver");
displayForecast();