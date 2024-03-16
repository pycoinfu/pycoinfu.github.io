function fetchLocation() {
  fetch("http://ip-api.com/json/")
    .then((res) => res.json())
    .then((data) => fetchWeather(data.city))
    .catch((err) => console.log(err));
}

function kelvinToC(val) {
  return Math.round(val - 273.15);
}
function hPaTommHg(val) {
  return Math.round(val / 1.333);
}
function parseVerbalData(data) {
  const translations = {
    "thunderstorm with light rain": "гроза с небольшим дождем",
    "thunderstorm with rain": "гроза с дождем",
    "thunderstorm with heavy rain": "гроза с сильным дождем",
    "light thunderstorm": "легкая гроза",
    "thunderstorm": "гроза",
    "heavy thunderstorm": "сильная гроза",
    "ragged thunderstorm": "неровная гроза",
    "thunderstorm with light drizzle": "гроза с небольшой моросью",
    "thunderstorm with drizzle": "гроза с моросью",
    "thunderstorm with heavy drizzle": "гроза с сильным моросящим дождем",
    "light intensity drizzle": "слабый дождь",
    "drizzle": "морось",
    "heavy intensity drizzle": "сильный моросящий дождь",
    "light intensity drizzle rain": "небольшой моросящий дождь",
    "drizzle rain": "моросящий дождь",
    "heavy intensity drizzle rain": "сильный моросящий дождь",
    "shower rain and drizzle": "дождь с моросью",
    "heavy shower rain and drizzle": "сильный ливень и морось",
    "shower drizzle": "моросящий ливень",
    "light rain": "легкий дождь",
    "moderate rain": "умеренный дождь",
    "heavy intensity rain": "сильный дождь",
    "very heavy rain": "очень сильный дождь",
    "extreme rain": "сильный дождь",
    "freezing rain": "ледяной дождь",
    "light intensity shower rain": "легкий дождь, ливень",
    "shower rain": "ливень",
    "heavy intensity shower rain": "сильный ливень",
    "ragged shower rain": "неровный дождь",
    "light snow": "легкий снег",
    "snow": "снег",
    "heavy snow": "сильный снег",
    "sleet": "мокрый снег",
    "light shower sleet": "легкий дождь с мокрым снегом",
    "shower sleet": "мокрый дождь",
    "light rain and snow": "небольшой дождь и снег",
    "rain and snow": "дождь и снег",
    "light shower snow": "легкий ливневый снег",
    "shower snow": "ливневый снег",
    "heavy shower snow": "сильный снегопад",
    "mist": "туман",
    "smoke": "дым",
    "haze": "туман",
    "sand/dust whirls": "песчано-пылевые вихри",
    "fog": "туман",
    "sand": "песок",
    "dust": "пыль",
    "volcanic ash": "вулканический пепел",
    "squalls": "шквалы",
    "tornado": "торнадо",
    "clear sky": "ясно",
    "few clouds": "малооблачно",
    "scattered clouds": "рассеянные облака",
    "broken clouds": "разорванные облака",
    "overcast clouds": "пасмурно",
  };
  return translations[data.description];
}
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function displayWeather(info) {
  const weather = document.querySelector(".weather");
  weather.style.visibility = "visible"

  const cityName = document.querySelector("#cityName");
  const degrees = document.querySelector("#degrees");
  const feelsLike = document.querySelector("#feelsLike");
  const humidity = document.querySelector("#humidity");
  const windSpeed = document.querySelector("#windSpeed");
  const pressure = document.querySelector("#pressure");
  const icon = document.querySelector("#icon")
  const verbalData = document.querySelector("#verbalData");
  cityName.textContent = info.name;
  degrees.textContent = `${kelvinToC(info.main.temp)}°`;
  feelsLike.innerHTML = `Ощущается как <b>${kelvinToC(info.main.feels_like)}°</b>`;
  humidity.innerHTML = `Влажность: <b>${info.main.humidity}%</b>`;
  windSpeed.innerHTML = `Скорость ветра: <b>${info.wind.speed} м/с</b>`;
  pressure.innerHTML = `Атмосферное давление: <b>${hPaTommHg(
    info.main.pressure
  )} мм. рт. ст.</b>`;
  icon.src = `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`
  verbalData.textContent = capitalize(parseVerbalData(info.weather[0]));
}
function fetchWeather(city) {
  if (city !== "") {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          data.name = capitalize(city);
          displayWeather(data);
        }
      })
      .catch((err) => console.log(err));
  }
}

const search = document.getElementById("search");
search.addEventListener("click", () => {
  const input = document.querySelector("#cityInput");
  const city = input.value;
  input.value = "";
  fetchWeather(city)
})

const key = prompt("Введите ключ API: ")
