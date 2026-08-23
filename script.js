const apiKey = "31ee67501a90dc4081ca5c72994c52d6";
const searchBtn = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const temp = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("error-message");
const body = document.getElementById("body");

function displayWeatherData(data) {
    cityName.innerText = data.name;
    const temperature = data.main.temp;
    temp.innerText = `Temperature: ${temperature}°C`;
    condition.innerText = `Condition: ${data.weather[0].description}`;
    humidity.innerText = `Humidity: ${data.main.humidity}%`;
    wind.innerText = `Wind Speed: ${data.wind.speed} km/h`;

    const weatherMain = data.weather[0].main.toLowerCase();
let iconUrl;

if (weatherMain === "clear") {
    iconUrl = "icons/sun.png";
}
else if (weatherMain === "cloud") {
    iconUrl = "icons/cloud.png"; 
}
else if (weatherMain === "rain" || weatherMain === "drizzle" || weatherMain === "thunderstorm") {
    iconUrl = "icons/rain.png"; 
}
else if (weatherMain === "snow") {
    iconUrl = "icons/snow.png";
}
else {
    iconUrl = "icons/cloud.png"; 
}

weatherIcon.src = iconUrl;

    weatherIcon.classList.remove("hidden");

    if (temperature > 25) {
        body.className = "hot";
    } else {
        body.className = "cold";
    }
}

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (city === "") return;

    errorMsg.innerText = "";
    loader.classList.remove("hidden");
    weatherIcon.classList.add("hidden");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        const data = await response.json();
        loader.classList.add("hidden");
        displayWeatherData(data);

    } catch (error) {
        loader.classList.add("hidden");
        errorMsg.innerText = "Invalid city name! Please try again.";
        cityName.innerText = "--";
        temp.innerText = "Temperature: --°C";
        condition.innerText = "Condition: --";
        humidity.innerText = "Humidity: --%";
        wind.innerText = "Wind Speed: -- km/h";
        weatherIcon.classList.add("hidden");
        body.className = "";
    }
});
