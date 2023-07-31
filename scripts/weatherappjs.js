let now = new Date();

let currentInfo = document.querySelector(".currentInfo");

let currentHours = now.getHours();
let currentMinutes = now.getMinutes().toString().padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];

currentInfo.innerHTML = `${currentDay}<br/>
${currentHours}:${currentMinutes}`;

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=aff03d99372f0019f772a8a20b2d1350&&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", citySearch);

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let temperatureElementC = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city-name");
  let nameChange = response.data.name;
  cityName.innerHTML = `${nameChange}`;
  temperature.innerHTML = `${temperatureElementC}`;
}

function getPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let locationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=aff03d99372f0019f772a8a20b2d1350`;

  axios.get(locationApiUrl).then(showTemperature);
}
let currentButton = document.querySelector("#current-location");

currentButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(getPosition);
});

navigator.geolocation.getCurrentPosition(getPosition);
