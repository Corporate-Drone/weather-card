import getWeather from './modules/weather.js'

const weatherCard = document.querySelector('.weather-card');
const searchButton = document.querySelector('.search-btn');
const searchInput = document.querySelector('.city-input');
const toggleTemp = document.querySelector('.toggle-btn');

const displayDate = document.querySelector('.date');
let currentDate = new Date().toLocaleDateString();
displayDate.innerText = currentDate;

//Hide weather display on start
function init() {
    weatherCard.style.visibility = "hidden";
    getWeather("Sacramento");
}

init();


//Search for city then clear value
searchButton.addEventListener('click', () => {
    
    getWeather(searchInput.value);
    searchInput.value = "";
})

//Toggle temperature between Fahrenheit & Celsius
toggleTemp.addEventListener('click', () => {
    let temperatures = document.querySelectorAll('.temperature');
    if (toggleTemp.innerText == "Fahrenheit") {
        //Convert temperatures to Celsius
        toggleTemp.innerText = "Celsius";
        for (let i = 0; i < temperatures.length; i++) {
            temperatures[i].innerText = Math.round((temperatures[i].innerText - 32) * 5 / 9);;
        }
    } else {
        toggleTemp.innerText = "Fahrenheit";
        //Convert temperatures to Fahrenheit
        for (let i = 0; i < temperatures.length; i++) {
            temperatures[i].innerText = Math.round((temperatures[i].innerText * 9 / 5) + 32);
        }
    }
});

