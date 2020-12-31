const weatherCard = document.querySelector('.weather-card');
const img = document.querySelector('#weather-icon');
const displayCity = document.querySelector('.city-name');
const displayTemp = document.querySelector('#display-temp');
const displaySkies = document.querySelector('.skies');
const displayHigh = document.querySelector('#high');
const displayLow = document.querySelector('#low');
const displayWind = document.querySelector('#wind');
const displayHumidity = document.querySelector('#humidity');
const displayVisibility = document.querySelector('#visibility');
const toggleTemp = document.querySelector('.toggle-btn');

const displayDate = document.querySelector('.date');
let currentDate = new Date().toLocaleDateString();
displayDate.innerText = currentDate;

//Get weather data
async function getWeather(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a6a52295826581e25672aefa939db91c&units=imperial`, { mode: 'cors' });
        const weatherData = await response.json();
        console.log(weatherData);
        let weatherDisplay = new Weather(weatherData.name, weatherData.main.temp, weatherData.weather[0].main, weatherData.main.temp_max, weatherData.main.temp_min, weatherData.wind.speed, weatherData.main.humidity, weatherData.visibility);
        display(weatherDisplay);

    } catch (error) {
        console.log(error);
    }
}

//Weather object
class Weather {
    constructor(name, temperature, description, max, low, wind, humidity, visibility) {
        this.name = name;
        this.temperature = temperature;
        this.description = description;
        this.max = max;
        this.low = low;
        this.wind = wind;
        this.humidity = humidity;
        this.visibility = visibility;
    }
}

//Display Celsius
function chooseTemperature() {
    let temperatures = document.querySelectorAll('.temperature');
    if (toggleTemp.innerText !== "Fahrenheit") {
        for (let i = 0; i < temperatures.length; i++) {
            temperatures[i].innerText = Math.round((temperatures[i].innerText - 32) * 5 / 9);;
        }
    }
}

function display(weatherDisplay) {
    weatherCard.style.visibility = "visible";
    //display city name
    let nameDisplay = weatherDisplay.name;
    displayCity.innerText = nameDisplay;

    //display temperature
    let tempDisplay = Math.round(weatherDisplay.temperature);
    displayTemp.innerText = tempDisplay;

    //display weather description
    let skiesDisplay = weatherDisplay.description;
    displaySkies.innerText = skiesDisplay;

    //display high temperature
    let highDisplay = Math.round(weatherDisplay.max);
    displayHigh.innerText = highDisplay;

    //display low temperature
    let lowDisplay = Math.round(weatherDisplay.low);
    displayLow.innerText = lowDisplay;

    //display wind speed
    let windDisplay = weatherDisplay.wind;
    displayWind.innerText = Math.round(windDisplay);
    let mphDisplay = document.createElement('span')
    mphDisplay.innerText = " mph";
    displayWind.appendChild(mphDisplay);

    //display humidity
    let humidityDisplay = weatherDisplay.humidity;
    displayHumidity.innerText = humidityDisplay;
    let percentDisplay = document.createElement('span')
    percentDisplay.innerText = "%";
    displayHumidity.appendChild(percentDisplay);

    //display visbility
    let visibilityDisplay = Math.round((weatherDisplay.visibility / 1000) * 0.6214);
    displayVisibility.innerText = visibilityDisplay;
    let milesDisplay = document.createElement('span')
    milesDisplay.innerText = " miles";
    displayVisibility.appendChild(milesDisplay);

    //Convert temperature to Celsius if Fahrenheit isn't chosen
    chooseTemperature();

    //display icon based on description
    if (displaySkies.innerText.includes("Clear")) {
        weatherCard.style.backgroundColor = "DarkTurquoise";
        img.src = "https://www.flaticon.com/svg/static/icons/svg/2892/2892972.svg"
        document.body.style.backgroundColor = "LavenderBlush";
    } else if (displaySkies.innerText.includes("Snow")) {
        weatherCard.style.backgroundColor = "LightSlateGrey";
        img.src = "https://www.flaticon.com/svg/static/icons/svg/642/642000.svg"
        document.body.style.backgroundColor = "Gainsboro";
    } else if (displaySkies.innerText.includes("Rain")) {
        weatherCard.style.backgroundColor = "LightSlateGrey";
        img.src = "https://www.flaticon.com/svg/static/icons/svg/414/414974.svg"
        document.body.style.backgroundColor = "Gainsboro";
    } else if (displaySkies.innerText.includes("Cloud")) {
        weatherCard.style.backgroundColor = "LightSlateGrey";
        img.src = "https://www.flaticon.com/svg/static/icons/svg/2151/2151266.svg"
        document.body.style.backgroundColor = "Gainsboro";
    } else if (displaySkies.innerText.includes("Storm")) {
        weatherCard.style.backgroundColor = "LightSlateGrey";
        img.src = "https://www.flaticon.com/svg/static/icons/svg/3815/3815424.svg"
        document.body.style.backgroundColor = "Gainsboro";
    } else {
        weatherCard.style.backgroundColor = "LightSlateGrey";
        img.src = "https://www.flaticon.com/svg/static/icons/svg/2151/2151266.svg"
        document.body.style.backgroundColor = "Gainsboro";
    }
}

export default getWeather;